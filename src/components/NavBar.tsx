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

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offset = 100; // Adjust this value to scroll more or less
      window.scrollTo({
        top: offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="w-full flex justify-center pt-2 md:pt-3 sticky top-0 z-50 transition-all duration-300">
      <div className="w-full max-w-4xl mx-auto px-2 md:px-4">
        <div
          className={`backdrop-blur-md rounded-full px-3 md:px-5 py-1.5 md:py-2 transition-all duration-300
            ${
              isScrolled
                ? "bg-blue-50/95 shadow-lg"
                : "bg-transparent shadow-none"
            }
          `}
        >
          <div className="flex items-center justify-between h-8 md:h-10">
            <div className="flex items-center space-x-2 md:space-x-4">
              <a
                href="#top"
                onClick={(e) => handleSmoothScroll(e, "#top")}
                className={`px-2 md:px-3 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:underline hover:underline-offset-2 ${
                  isScrolled ? "text-blue-400" : "text-blue-300"
                }`}
                style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500 }}
              >
                Home
              </a>
              <a
                href="#experience"
                onClick={(e) => handleSmoothScroll(e, "#experience")}
                className={`px-2 md:px-3 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:underline hover:underline-offset-2 ${
                  isScrolled ? "text-blue-400" : "text-blue-300"
                }`}
                style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500 }}
              >
                Experience
              </a>
              <a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, "#projects")}
                className={`px-2 md:px-3 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:underline hover:underline-offset-2 ${
                  isScrolled ? "text-blue-400" : "text-blue-300"
                }`}
                style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500 }}
              >
                Projects
              </a>
              <a
                href="#leetcode"
                onClick={(e) => handleSmoothScroll(e, "#leetcode")}
                className={`px-2 md:px-3 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:underline hover:underline-offset-2 ${
                  isScrolled ? "text-blue-400" : "text-blue-300"
                }`}
                style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500 }}
              >
                LeetCode
              </a>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "#contact")}
                className={`px-2 md:px-3 py-1 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:underline hover:underline-offset-2 ${
                  isScrolled ? "text-blue-400" : "text-blue-300"
                }`}
                style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500 }}
              >
                Contact
              </a>
            </div>
            <span
              className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
                isScrolled ? "text-blue-400" : "text-blue-300"
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
