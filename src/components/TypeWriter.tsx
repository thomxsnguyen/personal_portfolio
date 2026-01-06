import { useState, useEffect, useRef } from "react";

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
  const line1PlaceholderRef = useRef<HTMLHeadingElement | null>(null);
  const line2PlaceholderRef = useRef<HTMLHeadingElement | null>(null);

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
    <div
      className={`${className} max-w-full overflow-hidden flex flex-col items-center`}
    >
      {/* Reserve space for the first line */}
      <div className="relative flex justify-center">
        {/* Invisible placeholder to maintain layout */}
        <h1
          ref={line1PlaceholderRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-neutral-100 invisible whitespace-nowrap font-semibold"
          style={{
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          {texts[0] || ""}
        </h1>
        {/* Actual typed text positioned absolutely */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-neutral-100 absolute top-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-semibold"
          style={{
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          {displayTexts[0]}
          {cursor && (
            <span
              className={`inline-block w-0.5 md:w-1 h-14 sm:h-16 md:h-20 lg:h-24 bg-neutral-100 ml-1 transition-opacity duration-100 ${
                !isComplete && currentLineIndex === 0
                  ? showCursor
                    ? "opacity-100"
                    : "opacity-0"
                  : "opacity-0 invisible"
              }`}
            />
          )}
        </h1>
      </div>

      {/* Reserve space for the second line */}
      <div className="relative mt-12 w-full flex justify-center px-4">
        {/* Invisible placeholder to maintain layout */}
        <h2
          ref={line2PlaceholderRef}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-400 invisible text-center"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
        >
          {texts[1] || ""}
        </h2>
        {/* Actual typed text positioned absolutely */}
        <h2
          className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-400 absolute top-0 left-1/2 -translate-x-1/2 text-center w-full px-4"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
        >
          {displayTexts[1]}
          {cursor && (
            <span
              className={`inline-block w-0.5 h-4 sm:h-5 md:h-6 lg:h-7 bg-neutral-400 ml-1 transition-opacity duration-100 ${
                !isComplete && currentLineIndex === 1
                  ? showCursor
                    ? "opacity-100"
                    : "opacity-0"
                  : "opacity-0 invisible"
              }`}
            />
          )}
        </h2>
      </div>
    </div>
  );
}

export default TypeWriter;
