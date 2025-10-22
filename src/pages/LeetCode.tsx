import { useEffect, useState, useRef } from "react";

interface LeetCodeProps {
  username?: string;
}

function LeetCode({ username = "your-username" }: LeetCodeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [easySolved, setEasySolved] = useState<number | null>(null);
  const [mediumSolved, setMediumSolved] = useState<number | null>(null);
  const [hardSolved, setHardSolved] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username || username === "your-username") {
      return;
    }

    let isMounted = true;
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        let res;
        let data;

        // Try the primary API first
        try {
          res = await fetch(
            `https://leetcode-stats-api.herokuapp.com/${encodeURIComponent(
              username
            )}`,
            { signal: controller.signal }
          );

          if (res.ok) {
            data = await res.json();
          }
        } catch (e) {
          console.log("Primary API failed, trying backup...");
        }

        // If primary fails, try backup API
        if (!data || !res?.ok) {
          res = await fetch(
            `https://alfa-leetcode-api.onrender.com/userProfile/${encodeURIComponent(
              username
            )}`,
            { signal: controller.signal }
          );

          if (res.ok) {
            data = await res.json();
          }
        }

        clearTimeout(timeoutId);

        if (!res || !res.ok) {
          throw new Error(
            `Failed to load LeetCode data (${res?.status || "unknown"})`
          );
        }

        if (!isMounted) return;

        // Parse problem counts - handles multiple API response formats
        const easy =
          data?.easySolved ??
          data?.totalEasy ??
          data?.submitStatsGlobal?.acSubmissionNum?.[1]?.count ??
          0;
        const medium =
          data?.mediumSolved ??
          data?.totalMedium ??
          data?.submitStatsGlobal?.acSubmissionNum?.[2]?.count ??
          0;
        const hard =
          data?.hardSolved ??
          data?.totalHard ??
          data?.submitStatsGlobal?.acSubmissionNum?.[3]?.count ??
          0;

        if (!isMounted) return;

        setEasySolved(easy);
        setMediumSolved(medium);
        setHardSolved(hard);
      } catch (e: unknown) {
        if (isMounted) {
          setError(
            e instanceof Error ? e.message : "Failed to load LeetCode data"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, [username]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "-100px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const profileUrl = `https://leetcode.com/${username}/`;

  return (
    <section
      ref={sectionRef}
      id="leetcode"
      className={`w-full max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-48 pb-16 md:pb-32 transition-opacity duration-[2000ms] ease-out overflow-x-hidden ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center mb-8 md:mb-12">
        <h2
          className="text-4xl md:text-5xl text-blue-400 mb-4 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          LeetCode
        </h2>
        <p
          className="text-lg md:text-xl text-blue-300 drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
        >
          My coding problem solutions and progress
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {/* Easy Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 border-2 border-blue-200">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-green-600 mb-2">
              Easy
            </h3>
            <div className="text-2xl md:text-3xl font-bold text-gray-500">
              {easySolved ?? 0}
            </div>
            <p className="text-gray-500">Problems Solved</p>
          </div>
        </div>
        {/* Medium Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 border-2 border-blue-200">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-yellow-600 mb-2">
              Medium
            </h3>
            <div className="text-2xl md:text-3xl font-bold text-gray-500">
              {mediumSolved ?? 0}
            </div>
            <p className="text-gray-500">Problems Solved</p>
          </div>
        </div>
        {/* Hard Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 border-2 border-blue-200">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-2">
              Hard
            </h3>
            <div className="text-2xl md:text-3xl font-bold text-gray-500">
              {hardSolved ?? 0}
            </div>
            <p className="text-gray-500">Problems Solved</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 flex flex-col items-center">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-md bg-gray-500 text-white text-sm font-medium hover:bg-gray-600 transition-colors duration-200"
        >
          View LeetCode Profile
        </a>
        <p className="text-xs text-gray-500 mt-2">Username: {username}</p>
      </div>

      {loading && (
        <div className="text-center text-sm text-gray-500 mt-8">
          Loading LeetCode stats…
        </div>
      )}
      {error && (
        <div className="text-center text-sm text-red-600 mt-8">{error}</div>
      )}
    </section>
  );
}

export default LeetCode;
