import { useEffect, useState, useRef } from "react";

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`w-full max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-32 min-h-screen flex flex-col justify-center transition-opacity duration-[2000ms] ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center mb-8 md:mb-12">
        <h2
          className="text-4xl md:text-5xl text-blue-400 mb-4 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Contact Me
        </h2>
        <p
          className="text-lg md:text-xl text-blue-300 drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
        >
          Let's connect and discuss opportunities
        </p>
      </div>

      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 border-2 border-blue-200">
          {/* Contact Info */}
          <div className="space-y-4 md:space-y-6">
            {/* Email */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a
                  href="mailto:thomaswn@uci.edu"
                  className="text-lg font-medium text-gray-500 hover:text-blue-400 transition-colors"
                >
                  thomaswn@uci.edu
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <a
                  href="tel:7372454267"
                  className="text-lg font-medium text-gray-500 hover:text-blue-400 transition-colors"
                >
                  (737) 245-4267
                </a>
              </div>
            </div>
          </div>

          {/* Download Resume Button */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <a
              href="/Nguyen,Thomas.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-400 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
