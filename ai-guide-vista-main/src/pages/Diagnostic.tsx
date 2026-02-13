import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import { generateNextQuestion } from "../lib/gemini";
import type { AdaptiveQuestion, StudentAnswer, GeminiAdaptiveResponse } from "../types/adaptive";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_QUESTIONS = 7;

export default function Diagnostic() {
  const { user, markDiagnosticComplete, details } = useUser();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [question, setQuestion] = useState<AdaptiveQuestion | null>(null);
  const [history, setHistory] = useState<StudentAnswer[]>([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<Pick<GeminiAdaptiveResponse, "student_progress" | "recommended_path">>({});

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    if (!question && history.length === 0) {
      setLoading(true);
      generateNextQuestion([], { details })
        .then((res) => {
          setQuestion(res.next_question);
          setSummary({ student_progress: res.student_progress, recommended_path: res.recommended_path });
        })
        .finally(() => setLoading(false));
    }
  }, [question, history.length]);

  const handleSubmit = async (answer: string) => {
    if (!question) return;
    const entry: StudentAnswer = { question, response: answer };
    const nextHistory = [...history, entry];
    setHistory(nextHistory);
    const nextIndex = current + 1;

    if (nextIndex >= TOTAL_QUESTIONS) {
      // finalize and go to results with summary
      markDiagnosticComplete();
      navigate("/results", {
        state: {
          history: nextHistory,
          summary,
        },
      });
      return;
    }

    setLoading(true);
    try {
      const res = await generateNextQuestion(nextHistory, { details });
      setQuestion(res.next_question);
      setSummary({ student_progress: res.student_progress, recommended_path: res.recommended_path });
      setCurrent(nextIndex);
    } finally {
      setLoading(false);
    }
  };

  const greeting = useMemo(() => (user ? `Welcome, ${user.name}` : "Diagnostic Test"), [user]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{greeting}</h2>
        <ProgressBar current={current} total={TOTAL_QUESTIONS} />
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-panel p-6 text-muted-foreground"
          >
            Generating your next question...
          </motion.div>
        ) : question ? (
          <motion.div key={current} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
            <QuestionCard question={question} onSubmit={handleSubmit} />
          </motion.div>
        ) : (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-panel p-6">
            Click start to begin the diagnostic.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


