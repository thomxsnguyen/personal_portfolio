import { useState, useEffect } from "react";

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);

      // Determine active section
      const sections = ["contact", "leetcode", "projects", "top"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
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
      const offset = 100;
      window.scrollTo({
        top: offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { href: "#top", label: "Home", id: "top" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#leetcode", label: "LeetCode", id: "leetcode" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  return (
    <nav className="w-full flex justify-center pt-3 md:pt-4 fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
      <div className="w-full max-w-4xl mx-auto px-3 md:px-4">
        <div
          className={`backdrop-blur-xl rounded-2xl px-4 md:px-6 py-2 md:py-3 transition-all duration-500 border
            ${
              isScrolled
                ? "bg-neutral-900/90 shadow-lg shadow-black/20 border-neutral-800"
                : "bg-neutral-900/50 shadow-none border-neutral-800/50"
            }
          `}
        >
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <a
              href="#top"
              onClick={(e) => handleSmoothScroll(e, "#top")}
              className="flex items-center gap-2 group"
            >
              <span className="font-bold text-sm md:text-base tracking-tight text-neutral-100" style={{ fontFamily: "'Inter', sans-serif" }}>
                TN
              </span>
            </a>

            {/* Navigation Links */}
            <div className="flex items-center gap-1 md:gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={`relative px-2.5 md:px-4 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 
                    ${
                      activeSection === item.id
                        ? "text-white bg-neutral-800"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                    }
                  `}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-neutral-400 rounded-full"></span>
                  )}
                </a>
              ))}
            </div>

            {/* Year Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-400 border border-neutral-700">
              <span>2025</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
