import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

interface SplashLoaderProps {
  onLoadComplete: () => void;
}

const SplashLoader = ({ onLoadComplete }: SplashLoaderProps) => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const completeTimer = setTimeout(() => {
      setShow(false);
      setTimeout(onLoadComplete, 500);
    }, 2500);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onLoadComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* Animated background stars */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gold rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Radial glow */}
          <div className="absolute inset-0 bg-gradient-radial from-gold/10 via-transparent to-transparent" />

          {/* Main content */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: -30 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border-2 border-gold/30"
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
            </motion.div>

            {/* Inner counter-rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-gold/20"
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-gold/60 rounded-full" />
            </motion.div>

            {/* Logo container */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 30px rgba(212,175,55,0.4)",
                  "0 0 60px rgba(212,175,55,0.6)",
                  "0 0 30px rgba(212,175,55,0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full glass-gold flex items-center justify-center"
            >
              <motion.img
                src={logo}
                alt="Astro With Hrishi"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <motion.h1
              className="font-display text-2xl sm:text-3xl text-gradient-gold font-bold"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Astro With Hrishi
            </motion.h1>
            <p className="text-xs tracking-[0.3em] text-cosmic-silver/60 uppercase mt-1">
              Vedic · Cosmic · Premium
            </p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "200px" }}
            transition={{ delay: 0.5 }}
            className="mt-8 h-1 bg-gold/20 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-gold rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-3 text-xs text-cosmic-silver/50"
          >
            Loading cosmic wisdom...
          </motion.p>

          {/* Zodiac symbols */}
          <div className="absolute bottom-10 flex gap-4 text-2xl text-gold/30">
            {["♈", "♉", "♊", "♋", "♌", "♍"].map((symbol, i) => (
              <motion.span
                key={symbol}
                animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {symbol}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLoader;
