import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login({ name, email });
    navigate("/onboarding");
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-foreground">Welcome back</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-muted-foreground">Name</label>
            <input
              className="w-full p-3 rounded-md bg-background/70 border border-border text-foreground"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-muted-foreground">Email (optional)</label>
            <input
              type="email"
              className="w-full p-3 rounded-md bg-background/70 border border-border text-foreground"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="neuro-button w-full mt-2" type="submit">
            Login
          </button>
        </div>
      </motion.form>
    </div>
  );
}


