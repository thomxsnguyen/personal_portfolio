import { useState, useEffect } from "react";

interface TypeWriterProps {
  texts: string[];
  speeds?: number[];
  delays?: number[];
  className?: string;
  cursor?: boolean;
  onComplete?: () => void;
}

function TypeWriter({
  texts,
  speeds = [100],
  delays = [0],
  className = "",
  cursor = true,
  onComplete,
}: TypeWriterProps) {
  const [displayTexts, setDisplayTexts] = useState<string[]>(
    new Array(texts.length).fill("")
  );
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= texts.length) {
      setIsComplete(true);
      if (onComplete) onComplete();
      return;
    }

    const currentText = texts[currentLineIndex];
    const speed = speeds[currentLineIndex] || speeds[0] || 100;
    const delay = delays[currentLineIndex] || delays[0] || 0;

    let timeout: number;

    if (currentCharIndex === 0) {
      // Initial delay before starting to type
      timeout = setTimeout(() => {
        setDisplayTexts((prev) => {
          const newTexts = [...prev];
          newTexts[currentLineIndex] = currentText.slice(0, 1);
          return newTexts;
        });
        setCurrentCharIndex(1);
      }, delay);
    } else if (currentCharIndex < currentText.length) {
      // Continue typing
      timeout = setTimeout(() => {
        setDisplayTexts((prev) => {
          const newTexts = [...prev];
          newTexts[currentLineIndex] = currentText.slice(
            0,
            currentCharIndex + 1
          );
          return newTexts;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, speed);
    } else {
      // Move to next line
      timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentCharIndex, texts, speeds, delays, onComplete]);

  // Cursor blinking effect
  useEffect(() => {
    if (!cursor) return;

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [cursor]);

  return (
    <div className={className}>
      {/* Reserve space for the first line */}
      <div className="relative">
        {/* Invisible placeholder to maintain layout */}
        <h1 className="text-6xl font-bold text-gray-800 invisible">
          {texts[0] || ""}
        </h1>
        {/* Actual typed text positioned absolutely */}
        <h1 className="text-6xl font-bold text-gray-800 absolute top-0 left-0">
          {displayTexts[0]}
          {cursor && !isComplete && currentLineIndex === 0 && (
            <span
              className={`inline-block w-1 h-16 bg-gray-800 ml-1 ${
                showCursor ? "opacity-100" : "opacity-0"
              } transition-opacity duration-100`}
            />
          )}
        </h1>
      </div>

      {/* Reserve space for the second line */}
      <div className="relative mt-2">
        {/* Invisible placeholder to maintain layout */}
        <h2 className="text-2xl text-gray-600 invisible">{texts[1] || ""}</h2>
        {/* Actual typed text positioned absolutely */}
        <h2 className="text-2xl text-gray-600 absolute top-0 left-0">
          {displayTexts[1]}
          {cursor && !isComplete && currentLineIndex === 1 && (
            <span
              className={`inline-block w-0.5 h-7 bg-gray-600 ml-1 ${
                showCursor ? "opacity-100" : "opacity-0"
              } transition-opacity duration-100`}
            />
          )}
        </h2>
      </div>
    </div>
  );
}

export default TypeWriter;
