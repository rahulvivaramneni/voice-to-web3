import React from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';

interface VoiceButtonProps {
  isListening: boolean;
  onClick: () => void;
}

export function VoiceButton({ isListening, onClick }: VoiceButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative p-8 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors"
      whileTap={{ scale: 0.95 }}
    >
      <Mic size={32} />
      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-purple-300"
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  );
}