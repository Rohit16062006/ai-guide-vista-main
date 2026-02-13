import { useState } from "react";
import type { AdaptiveQuestion } from "../types/adaptive";
import { motion } from "framer-motion";

type Props = {
  question: AdaptiveQuestion;
  onSubmit: (answer: string) => void;
  disabled?: boolean;
};

export default function QuestionCard({ question, onSubmit, disabled }: Props) {
  const [value, setValue] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <h3 className="text-xl font-semibold mb-4 text-foreground">{question.question}</h3>
      {question.type === "multiple_choice" ? (
        <div className="space-y-3">
          {(question.options || []).map((opt) => (
            <label key={opt} className="flex items-center gap-3">
              <input
                type="radio"
                name="mcq"
                value={opt}
                disabled={disabled}
                onChange={() => setValue(opt)}
                className="accent-primary"
              />
              <span className="text-foreground">{opt}</span>
            </label>
          ))}
        </div>
      ) : (
        <textarea
          className="w-full min-h-[120px] p-3 rounded-md bg-background/70 border border-border text-foreground"
          placeholder="Type your answer..."
          disabled={disabled}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      <div className="mt-6">
        <button
          className="neuro-button"
          disabled={disabled || !value}
          onClick={() => onSubmit(value)}
        >
          Submit
        </button>
      </div>
    </motion.div>
  );
}


