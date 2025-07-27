import React from "react";

function LeetCode() {
  const recentProblems = [
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

  return (
    <section id="leetcode" className="w-full max-w-6xl mx-auto px-6 py-32">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">LeetCode</h2>
        <p className="text-xl text-gray-600">
          My coding problem solutions and progress
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Easy Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-500">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-green-600 mb-2">Easy</h3>
            <div className="text-3xl font-bold text-gray-800">0</div>
            <p className="text-gray-600">Problems Solved</p>
          </div>
          <div className="space-y-3">
            <p className="text-gray-500 text-center italic">
              Problems will be showcased here
            </p>
          </div>
        </div>
        {/* Medium Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-yellow-500">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-yellow-600 mb-2">Medium</h3>
            <div className="text-3xl font-bold text-gray-800">0</div>
            <p className="text-gray-600">Problems Solved</p>
          </div>
          <div className="space-y-3">
            <p className="text-gray-500 text-center italic">
              Problems will be showcased here
            </p>
          </div>
        </div>
        {/* Hard Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-500">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-red-600 mb-2">Hard</h3>
            <div className="text-3xl font-bold text-gray-800">0</div>
            <p className="text-gray-600">Problems Solved</p>
          </div>
          <div className="space-y-3">
            <p className="text-gray-500 text-center italic">
              Problems will be showcased here
            </p>
          </div>
        </div>
      </div>

      {/* Recent Problems Section */}
      <div className="mt-16">
        <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Recent Problems Solved
        </h3>
        <div className="bg-white rounded-lg shadow-lg p-6">
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
                    <span className="text-sm text-gray-500">
                      {problem.date}
                    </span>
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
