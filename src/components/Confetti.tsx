import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  duration?: number;
}

export function Confetti({ duration = 3000 }: ConfettiProps) {
  useEffect(() => {
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#553c9a', '#7c3aed', '#a78bfa']
      });
      
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#553c9a', '#7c3aed', '#a78bfa']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, [duration]);

  return null;
}