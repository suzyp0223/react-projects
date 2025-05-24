import { useEffect, useState } from "react";

export default function useIntersectionObserver(ref) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const IO = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.5 }
    );

    IO.observe(ref.current);

    return () => {
      IO.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}
