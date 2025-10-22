import { useState, useEffect, useLayoutEffect, useRef } from "react";

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
  const [line1WidthPx, setLine1WidthPx] = useState<number | null>(null);
  const [line2WidthPx, setLine2WidthPx] = useState<number | null>(null);

  // Measure placeholder widths to lock container widths and prevent any shift
  useLayoutEffect(() => {
    const w1 = line1PlaceholderRef.current?.offsetWidth ?? null;
    const w2 = line2PlaceholderRef.current?.offsetWidth ?? null;
    if (w1 !== null) setLine1WidthPx(w1);
    if (w2 !== null) setLine2WidthPx(w2);
  }, [texts]);

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
      <div
        className="relative"
        style={
          line1WidthPx !== null ? { width: `${line1WidthPx}px` } : undefined
        }
      >
        {/* Invisible placeholder to maintain layout */}
        <h1
          ref={line1PlaceholderRef}
          className="text-6xl md:text-7xl text-blue-400 invisible whitespace-nowrap drop-shadow-[0_3px_6px_rgba(255,255,255,0.9)]"
          style={{
            fontFamily: "'Dancing Script', cursive",
            letterSpacing: "0.05em",
          }}
        >
          {texts[0] || ""}
        </h1>
        {/* Actual typed text positioned absolutely */}
        <h1
          className="text-6xl md:text-7xl text-blue-400 absolute top-0 left-0 whitespace-nowrap drop-shadow-[0_3px_6px_rgba(255,255,255,0.9)]"
          style={{
            fontFamily: "'Dancing Script', cursive",
            letterSpacing: "0.05em",
          }}
        >
          {displayTexts[0]}
          {cursor && (
            <span
              className={`inline-block w-1 h-20 bg-blue-400 ml-1 transition-opacity duration-100 ${
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
      <div
        className="relative mt-6"
        style={
          line2WidthPx !== null ? { width: `${line2WidthPx}px` } : undefined
        }
      >
        {/* Invisible placeholder to maintain layout */}
        <h2
          ref={line2PlaceholderRef}
          className="text-xl md:text-2xl text-blue-300 invisible whitespace-nowrap drop-shadow-[0_2px_3px_rgba(255,255,255,0.7)]"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
        >
          {texts[1] || ""}
        </h2>
        {/* Actual typed text positioned absolutely */}
        <h2
          className="text-xl md:text-2xl text-blue-300 absolute top-0 left-0 whitespace-nowrap drop-shadow-[0_2px_3px_rgba(255,255,255,0.7)]"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
        >
          {displayTexts[1]}
          {cursor && (
            <span
              className={`inline-block w-0.5 h-8 bg-blue-300 ml-1 transition-opacity duration-100 ${
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
