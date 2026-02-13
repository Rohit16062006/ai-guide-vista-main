import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";

export default function Onboarding() {
  const navigate = useNavigate();
  const { setDetails, markOnboardingComplete } = useUser();
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [place, setPlace] = useState("");
  const [classGrade, setClassGrade] = useState("");
  const [subjects, setSubjects] = useState("");
  const [interests, setInterests] = useState("");
  const [learningStyle, setLearningStyle] = useState("");
  const [goal, setGoal] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDetails({
      age: typeof age === 'number' ? age : undefined,
      place: place || undefined,
      classGrade: classGrade || undefined,
      subjects: subjects ? subjects.split(",").map(s => s.trim()).filter(Boolean) : undefined,
      interests: interests ? interests.split(",").map(s => s.trim()).filter(Boolean) : undefined,
      learningStyle: learningStyle || undefined,
      goal: goal || undefined,
    });
    markOnboardingComplete();
    navigate("/diagnostic");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-foreground">Tell us about you</h2>
        <p className="text-muted-foreground mb-6">This helps personalize your learning experience.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2 text-muted-foreground">Age</label>
            <input className="w-full p-3 rounded-md bg-background/70 border border-border text-foreground" value={age} onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")} type="number" min={5} max={100} placeholder="14" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-muted-foreground">Place</label>
            <input className="w-full p-3 rounded-md bg-background/70 border border-border text-foreground" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="City/State" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-muted-foreground">Class/Grade</label>
            <input className="w-full p-3 rounded-md bg-background/70 border border-border text-foreground" value={classGrade} onChange={(e) => setClassGrade(e.target.value)} placeholder="Grade 8" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-muted-foreground">Subjects</label>
            <input className="w-full p-3 rounded-md bg-background/70 border border-border text-foreground" value={subjects} onChange={(e) => setSubjects(e.target.value)} placeholder="Math, Science" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-muted-foreground">Interests</label>
            <input className="w-full p-3 rounded-md bg-background/70 border border-border text-foreground" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="Robotics, Coding" />
          </div>
          <div>
            <label className="block text-sm mb-2 text-muted-foreground">Learning Style</label>
            <input className="w-full p-3 rounded-md bg-background/70 border border-border text-foreground" value={learningStyle} onChange={(e) => setLearningStyle(e.target.value)} placeholder="diagrams, explanations, practice, interactive" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm mb-2 text-muted-foreground">Goal</label>
            <input className="w-full p-3 rounded-md bg-background/70 border border-border text-foreground" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="exams, projects, fun" />
          </div>
        </div>
        <div className="mt-6">
          <button className="neuro-button" type="submit">Continue</button>
        </div>
      </motion.form>
    </div>
  );
}


