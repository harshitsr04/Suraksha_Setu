import { useEffect, useState } from "react";

export const useLoudnessDetection = (micStream) => {
  const [loudness, setLoudness] = useState(0);
  const [isAboveThreshold, setIsAboveThreshold] = useState(false);

  useEffect(() => {
    if (!micStream) return;

    const interval = setInterval(() => {
      const randomValue = Math.random() * 100; // placeholder for real audio loudness
      setLoudness(randomValue);
      setIsAboveThreshold(randomValue > 75);
    }, 500);

    return () => clearInterval(interval);
  }, [micStream]);

  return { loudness: 0, isAboveThreshold: false };
};