import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FINAL = ["m", "a", "i", "u", "a", "n"];

export default function MaiuanLogo() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(() => setPhase(2), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const letters =
    phase === 0
      ? [{ key: 3, char: "u" }, { key: 2, char: "i" }]
      : phase === 1
      ? [{ key: 2, char: "i" }, { key: 3, char: "u" }]
      : FINAL.map((char, key) => ({ key, char }));

  return (
    <a
      href="/"
      className="font-['Syne'] text-lg font-800 tracking-[0.05em] text-[#e8ff00] uppercase cursor-pointer inline-flex"
      style={{ textShadow: "0 0 10px rgba(232,255,0,0.4)" }}
    >
      <AnimatePresence>
        {letters.map(({ key, char }) => (
          <motion.span
            key={key}
            layout
            initial={{
              opacity: 0,
              x: key < 2 ? -10 : key > 3 ? 10 : 0,
            }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        ))}
      </AnimatePresence>
    </a>
  );
}
