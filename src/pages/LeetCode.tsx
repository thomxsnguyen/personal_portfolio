import { useEffect, useState } from "react";

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
};

function LeetCode({ username = "your-username" }: LeetCodeProps) {
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username || username === "your-username") return;

    const controller = new AbortController();
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        // Public LeetCode stats API (community, CORS enabled)
        // Example: https://leetcode-api-faisalshohag.vercel.app/thomxsnguyen
        const res = await fetch(
          `https://leetcode-api-faisalshohag.vercel.app/${encodeURIComponent(
            username
          )}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error(`Failed to load LeetCode data (${res.status})`);
        const data = await res.json();

        // Counts
        const easy = data?.easySolved ?? data?.totalEasy ?? null;
        const medium = data?.mediumSolved ?? data?.totalMedium ?? null;
        const hard = data?.hardSolved ?? data?.totalHard ?? null;
        setEasySolved(typeof easy === "number" ? easy : null);
        setMediumSolved(typeof medium === "number" ? medium : null);
        setHardSolved(typeof hard === "number" ? hard : null);

        // Recent submissions
        const submissions = (data?.recentSubmissions || []) as Array<{
          title?: string;
          titleSlug?: string;
          timestamp?: number | string;
          statusDisplay?: string;
          lang?: string;
          difficulty?: string;
        }>;

        if (Array.isArray(submissions) && submissions.length > 0) {
          const mapped: RecentProblem[] = submissions
            .slice(0, 10)
            .map((s, idx) => {
              const difficulty = (s.difficulty || "").toString();
              const isEasy = /easy/i.test(difficulty);
              const isMedium = /medium/i.test(difficulty);
              const isHard = /hard/i.test(difficulty);
              return {
                id: s.titleSlug || idx,
                title: s.title || s.titleSlug || "LeetCode Problem",
                difficulty: isEasy
                  ? "Easy"
                  : isMedium
                  ? "Medium"
                  : isHard
                  ? "Hard"
                  : difficulty || "",
                difficultyColor: isEasy
                  ? "text-green-600"
                  : isMedium
                  ? "text-yellow-600"
                  : isHard
                  ? "text-red-600"
                  : "text-gray-600",
                bgColor: isEasy
                  ? "bg-green-50"
                  : isMedium
                  ? "bg-yellow-50"
                  : isHard
                  ? "bg-red-50"
                  : "bg-gray-50",
                date: s.timestamp
                  ? new Date(Number(s.timestamp) * 1000).toLocaleDateString()
                  : undefined,
                link: s.titleSlug
                  ? `https://leetcode.com/problems/${s.titleSlug}/`
                  : "https://leetcode.com/problemset/",
              };
            });
          setRecentProblems(mapped);
        }
      } catch (e: unknown) {
        setError(
          e instanceof Error ? e.message : "Failed to load LeetCode data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    return () => controller.abort();
  }, [username]);

  const profileUrl = `https://leetcode.com/${username}/`;

  return (
    <section id="leetcode" className="w-full max-w-6xl mx-auto px-6 py-32">
      <div className="text-center mb-12">
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
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
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
                {recentProblems
                  .filter((p) => p.difficulty === "Easy")
                  .slice(0, 3)
                  .map((p) => p.title)
                  .join(", ") || "—"}
              </p>
            </div>
          </div>
        </div>
        {/* Medium Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-yellow-500">
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
                {recentProblems
                  .filter((p) => p.difficulty === "Medium")
                  .slice(0, 3)
                  .map((p) => p.title)
                  .join(", ") || "—"}
              </p>
            </div>
          </div>
        </div>
        {/* Hard Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-500">
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
                {recentProblems
                  .filter((p) => p.difficulty === "Hard")
                  .slice(0, 3)
                  .map((p) => p.title)
                  .join(", ") || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Problems Section */}
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Recent Problems Solved
        </h3>
        <div className="bg-white rounded-lg shadow-lg p-6">
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
                    className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors duration-300"
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
