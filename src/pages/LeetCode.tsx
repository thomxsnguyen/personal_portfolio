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
  const totalSolved = (easySolved ?? 0) + (mediumSolved ?? 0) + (hardSolved ?? 0);

  const difficultyLevels = [
    { name: "Easy", count: easySolved ?? 0, color: "text-emerald-400", bgColor: "bg-emerald-900/30", textColor: "text-emerald-400", borderColor: "border-emerald-800" },
    { name: "Medium", count: mediumSolved ?? 0, color: "text-amber-400", bgColor: "bg-amber-900/30", textColor: "text-amber-400", borderColor: "border-amber-800" },
    { name: "Hard", count: hardSolved ?? 0, color: "text-rose-400", bgColor: "bg-rose-900/30", textColor: "text-rose-400", borderColor: "border-rose-800" },
  ];

  return (
    <section
      ref={sectionRef}
      id="leetcode"
      className={`w-full max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 md:pb-24 transition-all duration-1000 overflow-x-hidden ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16">
        <h2
          className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          LeetCode
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="max-w-3xl mx-auto">
        {/* Total Problems Card */}
        <div className="backdrop-blur-md bg-neutral-900/60 rounded-3xl shadow-xl border border-neutral-800 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-neutral-500 uppercase tracking-wider font-medium mb-1">Total Problems Solved</p>
              <p className="text-5xl md:text-6xl font-bold text-neutral-100">
                {totalSolved}
              </p>
            </div>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {difficultyLevels.map((level, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-neutral-900/60 rounded-2xl shadow-lg border border-neutral-800 p-5 hover:border-neutral-700 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 ${level.bgColor} ${level.textColor} text-xs font-semibold rounded-full border ${level.borderColor}`}>
                  {level.name}
                </span>
              </div>
              <p className={`text-4xl font-bold ${level.color}`}>
                {level.count}
              </p>
              <p className="text-sm text-neutral-500 mt-1">problems solved</p>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="backdrop-blur-md bg-neutral-900/60 rounded-2xl shadow-lg border border-neutral-800 p-5 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center">
              <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-100" style={{ fontFamily: "'Inter', sans-serif" }}>
                Solution Explanations
              </h3>
              <p className="text-sm text-neutral-500">Detailed breakdowns coming soon</p>
            </div>
          </div>
        </div>

        {/* Profile Link */}
        <div className="text-center">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-neutral-800 text-neutral-300 rounded-xl font-semibold hover:bg-neutral-700 hover:text-white transition-all duration-300 border border-neutral-700"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
            View Full Profile
          </a>
          <p className="text-xs text-neutral-500 mt-3">@{username}</p>
        </div>

        {loading && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-neutral-500">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading stats...
            </div>
          </div>
        )}
        {error && (
          <div className="text-center mt-8 p-4 bg-red-900/30 rounded-xl border border-red-800">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default LeetCode;
