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

  const contactMethods = [
    {
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      label: "Email",
      value: "thomaswn@uci.edu",
      href: "mailto:thomaswn@uci.edu",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
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
      ),
      label: "Phone",
      value: "(737) 245-4267",
      href: "tel:7372454267",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`w-full max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col justify-center transition-all duration-1000 overflow-x-hidden ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16">
        <h2
          className="text-4xl md:text-5xl font-light text-neutral-100 mb-3"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          contact me
        </h2>
        <p
          className="text-neutral-400 text-base"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          let's connect
        </p>
      </div>

      <div className="max-w-3xl mx-auto w-full">
        {/* Main Contact Card */}
        <div className="backdrop-blur-md bg-neutral-900/60 rounded-3xl shadow-xl border border-neutral-800 p-6 md:p-10">
          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-neutral-800/50 border border-neutral-700 hover:border-neutral-600 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400 transition-colors duration-300 group-hover:text-neutral-200">
                  {method.icon}
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium">
                    {method.label}
                  </p>
                  <p
                    className="text-neutral-300 font-semibold transition-colors duration-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {method.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
