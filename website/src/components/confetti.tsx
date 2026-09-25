import confetti from "canvas-confetti";
import { useCallback, useRef } from "react";

type ConfettiOptions = {
  particleCount?: number;
  origin?: { x?: number; y?: number };
};

const DEFAULT_PARTICLE_COUNT = 50;
const DEFAULT_ORIGIN = { y: 0.7 };

/**
 * Hook to trigger confetti animations
 * @returns A function to trigger the confetti effect
 */
export function useConfetti() {
  const isAnimatingRef = useRef(false);

  const triggerConfetti = useCallback((options?: ConfettiOptions) => {
    // Prevent multiple simultaneous animations
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const count = options?.particleCount ?? DEFAULT_PARTICLE_COUNT;
    const defaults = {
      origin: options?.origin ?? DEFAULT_ORIGIN,
    };

    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    };

    // Fire multiple bursts with different settings for a better effect
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Reset animation flag after animation completes
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 500);
  }, []);

  return triggerConfetti;
}
