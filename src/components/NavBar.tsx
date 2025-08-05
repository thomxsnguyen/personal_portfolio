import { useState, useEffect } from "react";

function NavBar() {
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
          className={`backdrop-blur-md rounded-full px-5 py-2 transition-all duration-300
            ${
              isScrolled
                ? "bg-white/95 shadow-lg"
                : "bg-transparent shadow-none"
            }
          `}
        >
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-4">
              <a
                href="#top"
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:underline hover:underline-offset-2 ${
                  isScrolled ? "text-gray-700" : "text-gray-700"
                }`}
              >
                Home
              </a>
              <a
                href="#projects"
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:underline hover:underline-offset-2 ${
                  isScrolled ? "text-gray-700" : "text-gray-700"
                }`}
              >
                Projects
              </a>
              <a
                href="#leetcode"
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:underline hover:underline-offset-2 ${
                  isScrolled ? "text-gray-700" : "text-gray-700"
                }`}
              >
                LeetCode
              </a>
            </div>
            <span
              className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                isScrolled ? "text-gray-700" : "text-gray-700"
              }`}
            >
              2025
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
