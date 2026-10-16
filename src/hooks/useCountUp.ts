import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  /** The final value the counter settles on. */
  end: number;
  /** Animation length in milliseconds. Defaults to 2000. */
  duration?: number;
  /**
   * When true, the counter waits until the attached element is at least 30%
   * visible in the viewport before animating. Set to false to start
   * immediately on mount.
   */
  startOnView?: boolean;
}

/**
 * Animates a number from 0 to `end` with an ease-out curve.
 *
 * Returns the current `count` to render and a `ref` to attach to the element
 * that should trigger the animation when scrolled into view. The animation
 * runs once per mount and cleans up its IntersectionObserver on unmount.
 */
export function useCountUp({ end, duration = 2000, startOnView = true }: UseCountUpOptions) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!startOnView) {
      animate();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          animate();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  function animate() {
    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return { count, ref };
}
