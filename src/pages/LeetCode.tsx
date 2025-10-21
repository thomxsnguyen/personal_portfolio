import { useEffect, useState, useRef } from "react";

interface LeetCodeProps {
  username?: string;
}

type RecentProblem = {
  id: number | string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard" | string;
  difficultyColor: string;
  bgColor: string;
  date?: string;
  link: string;
  // internal sort key
  _ts?: number;
};

function LeetCode({ username = "your-username" }: LeetCodeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const fallbackProblems: RecentProblem[] = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      difficultyColor: "text-green-600",
      bgColor: "bg-green-50",
      date: "2 days ago",
      link: "https://leetcode.com/problems/two-sum/",
    },
    {
      id: 2,
      title: "Add Two Numbers",
      difficulty: "Medium",
      difficultyColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      date: "3 days ago",
      link: "https://leetcode.com/problems/add-two-numbers/",
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      difficultyColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      date: "5 days ago",
      link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    },
    {
      id: 4,
      title: "Valid Parentheses",
      difficulty: "Easy",
      difficultyColor: "text-green-600",
      bgColor: "bg-green-50",
      date: "1 week ago",
      link: "https://leetcode.com/problems/valid-parentheses/",
    },
    {
      id: 5,
      title: "Merge k Sorted Lists",
      difficulty: "Hard",
      difficultyColor: "text-red-600",
      bgColor: "bg-red-50",
      date: "1 week ago",
      link: "https://leetcode.com/problems/merge-k-sorted-lists/",
    },
  ];

  const [easySolved, setEasySolved] = useState<number | null>(null);
  const [mediumSolved, setMediumSolved] = useState<number | null>(null);
  const [hardSolved, setHardSolved] = useState<number | null>(null);
  const [recentProblems, setRecentProblems] =
    useState<RecentProblem[]>(fallbackProblems);
  const [easyRecent, setEasyRecent] = useState<RecentProblem[]>([]);
  const [mediumRecent, setMediumRecent] = useState<RecentProblem[]>([]);
  const [hardRecent, setHardRecent] = useState<RecentProblem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username || username === "your-username") return;

    let isMounted = true;
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use alfa-leetcode-api with a timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const res = await fetch(
          `https://alfa-leetcode-api.onrender.com/${encodeURIComponent(
            username
          )}`,
          { signal: controller.signal }
        );

        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`Failed to load LeetCode data (${res.status})`);
        }

        const data = await res.json();

        if (!isMounted) return;

        console.log("LeetCode API Response:", data);

        // Parse problem counts from leetcode-stats-api
        const easy = data?.easySolved ?? 0;
        const medium = data?.mediumSolved ?? 0;
        const hard = data?.hardSolved ?? 0;

        console.log(
          "Problem counts - Easy:",
          easy,
          "Medium:",
          medium,
          "Hard:",
          hard,
          "Total:",
          data?.totalSolved
        );

        if (!isMounted) return;

        setEasySolved(easy);
        setMediumSolved(medium);
        setHardSolved(hard);

        // Recent submissions - use fallback problems if no recent submissions
        const submissions = (data?.recentSubmissions ||
          data?.recentAcSubmissionList ||
          fallbackProblems) as Array<{
          title?: string;
          titleSlug?: string;
          timestamp?: number | string;
          statusDisplay?: string;
          lang?: string;
          difficulty?: string;
          difficultyColor?: string;
          bgColor?: string;
          link?: string;
          date?: string;
        }>;

        if (Array.isArray(submissions) && submissions.length > 0) {
          // Debug: Log first submission to see structure
          console.log("First submission:", submissions[0]);

          const mapped: RecentProblem[] = submissions
            .slice(0, 200)
            .map((s: any, idx) => {
              // If already in RecentProblem format (from fallback), return as is
              if (s.difficultyColor && s.bgColor && s.link) {
                return s;
              }

              // Parse difficulty from string
              let difficulty: "Easy" | "Medium" | "Hard" = "Medium";

              if (s.difficulty) {
                const difficultyStr = s.difficulty.toString();
                if (difficultyStr === "Easy") {
                  difficulty = "Easy";
                } else if (difficultyStr === "Hard") {
                  difficulty = "Hard";
                } else {
                  difficulty = "Medium";
                }
              }

              // Parse timestamp
              const ts = Number(s.timestamp) || 0;
              return {
                id: s.titleSlug || s.id || idx,
                title: s.title || s.titleSlug || "LeetCode Problem",
                difficulty: difficulty,
                difficultyColor:
                  difficulty === "Easy"
                    ? "text-green-600"
                    : difficulty === "Hard"
                    ? "text-red-600"
                    : "text-yellow-600",
                bgColor:
                  difficulty === "Easy"
                    ? "bg-green-50"
                    : difficulty === "Hard"
                    ? "bg-red-50"
                    : "bg-yellow-50",
                date: Number.isFinite(ts)
                  ? new Date(ts * 1000).toLocaleDateString()
                  : s.date,
                link:
                  s.link ||
                  (s.titleSlug
                    ? `https://leetcode.com/problems/${s.titleSlug}/`
                    : "https://leetcode.com/problemset/"),
                _ts: Number.isFinite(ts) ? ts : 0,
              };
            })
            .sort((a, b) => (b._ts ?? 0) - (a._ts ?? 0));

          // Deduplicate problems by titleSlug, keeping only the most recent submission
          const uniqueProblemsMap = new Map<string, RecentProblem>();
          mapped.forEach((problem) => {
            const key = problem.id.toString();
            if (!uniqueProblemsMap.has(key)) {
              uniqueProblemsMap.set(key, problem);
            }
          });
          const uniqueProblems = Array.from(uniqueProblemsMap.values());

          if (!isMounted) return;

          setRecentProblems(uniqueProblems);

          // Group and take the top 3 by difficulty from unique problems
          const easyTop = uniqueProblems
            .filter((p) => p.difficulty === "Easy")
            .slice(0, 3);
          const mediumTop = uniqueProblems
            .filter((p) => p.difficulty === "Medium")
            .slice(0, 3);
          const hardTop = uniqueProblems
            .filter((p) => p.difficulty === "Hard")
            .slice(0, 3);

          setEasyRecent(easyTop);
          setMediumRecent(mediumTop);
          setHardRecent(hardTop);
        } else if (isMounted) {
          setEasyRecent([]);
          setMediumRecent([]);
          setHardRecent([]);
        }
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
      className={`w-full max-w-6xl mx-auto px-6 pt-48 pb-32 transition-opacity duration-[2000ms] ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center mb-12 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">LeetCode</h2>
        <p className="text-xl text-gray-600">
          My coding problem solutions and progress
        </p>
        <div className="mt-4">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            View LeetCode Profile
          </a>
          <p className="text-xs text-gray-500 mt-2">Username: {username}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Easy Section */}
        <div className="bg-blue-50 rounded-lg shadow-lg p-6 border-t-4 border-green-500">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-green-600 mb-2">Easy</h3>
            <div className="text-3xl font-bold text-gray-800">
              {easySolved ?? 0}
            </div>
            <p className="text-gray-600">Problems Solved</p>
          </div>
          <div className="space-y-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-green-800">
                Recent Solutions
              </p>
              <p className="text-xs text-green-600">
                {easyRecent.map((p) => p.title).join(", ") || "—"}
              </p>
            </div>
          </div>
        </div>
        {/* Medium Section */}
        <div className="bg-blue-50 rounded-lg shadow-lg p-6 border-t-4 border-yellow-500">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-yellow-600 mb-2">Medium</h3>
            <div className="text-3xl font-bold text-gray-800">
              {mediumSolved ?? 0}
            </div>
            <p className="text-gray-600">Problems Solved</p>
          </div>
          <div className="space-y-3">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">
                Recent Solutions
              </p>
              <p className="text-xs text-yellow-600">
                {mediumRecent.map((p) => p.title).join(", ") || "—"}
              </p>
            </div>
          </div>
        </div>
        {/* Hard Section */}
        <div className="bg-blue-50 rounded-lg shadow-lg p-6 border-t-4 border-red-500">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-red-600 mb-2">Hard</h3>
            <div className="text-3xl font-bold text-gray-800">
              {hardSolved ?? 0}
            </div>
            <p className="text-gray-600">Problems Solved</p>
          </div>
          <div className="space-y-3">
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-red-800">
                Recent Solutions
              </p>
              <p className="text-xs text-red-600">
                {hardRecent.map((p) => p.title).join(", ") || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Problems Section */}
      <div className="mt-16 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">
          Recent Problems Solved
        </h3>
        <div className="bg-blue-50 rounded-lg shadow-lg p-6">
          {loading && (
            <div className="text-center text-sm text-gray-500">
              Loading recent problems…
            </div>
          )}
          {error && (
            <div className="text-center text-sm text-red-600 mb-4">{error}</div>
          )}
          <div className="space-y-4">
            {recentProblems.map((problem) => (
              <div
                key={problem.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-1">
                  <a
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-gray-800 hover:text-blue-400 transition-colors duration-300"
                  >
                    {problem.title}
                  </a>
                  <div className="flex items-center space-x-3 mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${problem.bgColor} ${problem.difficultyColor}`}
                    >
                      {problem.difficulty}
                    </span>
                    {problem.date && (
                      <span className="text-sm text-gray-500">
                        {problem.date}
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeetCode;
