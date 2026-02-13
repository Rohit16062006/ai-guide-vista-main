import { useLocation, useNavigate } from "react-router-dom";
import type { StudentAnswer, StudentProgress } from "../types/adaptive";
import { motion } from "framer-motion";

type LocationState = {
  history: StudentAnswer[];
  summary?: {
    student_progress?: StudentProgress;
    recommended_path?: string[];
  };
};

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const progressEntries = Object.entries(state.summary?.student_progress || {});
  const recommendations = state.summary?.recommended_path || [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-foreground mb-4">Your Diagnostic Summary</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-3 text-foreground">Performance Areas</h3>
          {progressEntries.length === 0 ? (
            <div className="text-muted-foreground">No skill areas detected.</div>
          ) : (
            <div className="space-y-2">
              {progressEntries.map(([area, level]) => (
                <div key={area} className="flex items-center justify-between bg-background/60 border border-border p-3 rounded-md">
                  <span className="text-foreground font-medium">{area}</span>
                  <span className={`text-sm ${level === 'strong' ? 'text-green-600' : level === 'weak' ? 'text-red-600' : 'text-amber-600'}`}>{level}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-3 text-foreground">Recommended Path</h3>
          {recommendations.length === 0 ? (
            <div className="text-muted-foreground">No recommendations available.</div>
          ) : (
            <ul className="space-y-2">
              {recommendations.map((step, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <input type="checkbox" className="accent-primary" />
                  <span className="text-foreground">{step}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>

      <div className="mt-8 flex gap-3">
        <button className="neuro-button" onClick={() => navigate('/diagnostic')}>Restart Diagnostic</button>
        <button className="neuro-button" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    </div>
  );
}


