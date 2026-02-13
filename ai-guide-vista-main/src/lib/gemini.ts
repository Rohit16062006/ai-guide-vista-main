import type { GeminiAdaptiveResponse, StudentAnswer } from "../types/adaptive";
import { useUser } from "../context/UserContext";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const GEMINI_MODEL = (import.meta.env.VITE_GEMINI_MODEL as string | undefined) || "gemini-2.5-flash";

const SYSTEM_INSTRUCTIONS = `You are an adaptive AI teacher. Based on the student's past answers, generate the next diagnostic question. Adjust difficulty according to performance. Always return a valid, strict JSON response that the frontend can parse. Use this JSON schema shape:
{
  "next_question": {
    "type": "multiple_choice" | "written",
    "question": string,
    // If multiple_choice
    "options"?: string[],
    "answer"?: string,
    // If written
    "expected_keywords"?: string[]
  },
  "student_progress"?: Record<string, "strong" | "average" | "weak">,
  "recommended_path"?: string[]
}
Return only JSON, no markdown fences.`;

function buildPrompt(history: StudentAnswer[], context?: {
  detailsJson?: string;
}) {
  const summary = history.map((h, i) => ({
    index: i + 1,
    question_type: h.question.type,
    question: h.question.question,
    options: h.question.type === "multiple_choice" ? (h.question as any).options : undefined,
    response: h.response,
    correct: h.correct ?? null,
  }));
  const detailsPart = context?.detailsJson ? `\nStudent Profile (JSON):\n${context?.detailsJson}\n` : "";
  return `System Instructions:\n${SYSTEM_INSTRUCTIONS}${detailsPart}\nStudent History (JSON):\n${JSON.stringify(summary, null, 2)}\n\nGenerate the next question JSON now.`;
}

export async function generateNextQuestion(history: StudentAnswer[], options?: { details?: any }): Promise<GeminiAdaptiveResponse> {
  if (!GEMINI_API_KEY) {
    // Fallback: deterministic mock for local dev without key
    return {
      next_question: {
        type: "multiple_choice",
        question: "What is the derivative of x^2?",
        options: ["2x", "x^2", "1", "None of the above"],
        answer: "2x",
      },
      student_progress: { calculus: "weak", algebra: "average" },
      recommended_path: [
        "Review derivatives basics",
        "Solve 10 practice problems",
        "Watch video lesson on chain rule",
      ],
    };
  }

  async function callModel(modelName: string): Promise<Response> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }
  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: buildPrompt(history, { detailsJson: options?.details ? JSON.stringify(options.details, null, 2) : undefined }) }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      responseMimeType: "application/json",
    },
    safetySettings: [
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
    ],
  } as const;

  // Transient retry (e.g., 503) with exponential backoff, keep model as provided
  const maxAttempts = 3;
  let attempt = 0;
  let res: Response | null = null;
  while (attempt < maxAttempts) {
    attempt++;
    res = await callModel(GEMINI_MODEL);
    if (res.ok) break;
    if (res.status === 404 && !GEMINI_MODEL.endsWith("-latest")) {
      // only for 404, try "-latest" once, then continue retries if still failing
      const retryModel = `${GEMINI_MODEL}-latest`;
      console.warn(`[Gemini] 404 for model ${GEMINI_MODEL}. Retrying once with ${retryModel}...`);
      res = await callModel(retryModel);
      if (res.ok) break;
    }
    if (res.status >= 500) {
      const backoffMs = 300 * Math.pow(2, attempt - 1);
      await new Promise(r => setTimeout(r, backoffMs));
      continue;
    } else {
      break;
    }
  }
  if (!res || !res.ok) {
    console.warn(`[Gemini] Request failed with status ${res?.status}. Falling back to local mock.`);
    return {
      next_question: {
        type: "multiple_choice",
        question: "What is the derivative of x^2?",
        options: ["2x", "x^2", "1", "None of the above"],
        answer: "2x",
      },
      student_progress: { calculus: "weak", algebra: "average" },
      recommended_path: [
        "Review derivatives basics",
        "Solve 10 practice problems",
        "Watch video lesson on chain rule",
      ],
    };
  }
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  try {
    const parsed: GeminiAdaptiveResponse = JSON.parse(text);
    return parsed;
  } catch (e) {
    // attempt to salvage JSON by trimming code fences if present
    const trimmed = String(text).replace(/^```json|```/g, "");
    return JSON.parse(trimmed);
  }
}


