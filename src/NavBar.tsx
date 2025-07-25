import React, { useState, useEffect } from "react";

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full flex justify-center pt-3 sticky top-0 z-50 transition-all duration-300">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div
          className={`backdrop-blur-md shadow-md rounded-full px-5 py-2 transition-all duration-300 ${
            isScrolled ? "bg-white/95 shadow-lg" : "bg-white/60 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-4">
              <a
                href="#home"
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:underline hover:underline-offset-2 ${
                  isScrolled ? "text-gray-700" : "text-gray-600"
                }`}
              >
                Home
              </a>
              <a
                href="#projects"
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:underline hover:underline-offset-2 ${
                  isScrolled ? "text-gray-700" : "text-gray-600"
                }`}
              >
                Projects
              </a>
              <a
                href="#leetcode"
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:underline hover:underline-offset-2 ${
                  isScrolled ? "text-gray-700" : "text-gray-600"
                }`}
              >
                LeetCode
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className={`transition-all duration-300 p-1 ${
                    isScrolled
                      ? "text-gray-600 hover:text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className={`transition-all duration-300 p-1 ${
                    isScrolled
                      ? "text-gray-600 hover:text-blue-700"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="#CV"
                  className={`px-3 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:underline hover:underline-offset-2 ${
                    isScrolled ? "text-gray-700" : "text-gray-600"
                  }`}
                >
                  CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
