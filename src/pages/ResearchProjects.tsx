import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
  imageUrl?: string;
}

function ResearchProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
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

  const researchProjects: ProjectItem[] = [
    {
      title: "Human Decision Simulation Platform (In Progress)",
      description:
        "End-to-end ML pipeline converting experimental logs into replayable decision transcripts. Integrates LLM-based policy engine with leak-free preprocessing and deterministic action validation.",
      technologies: ["Python", "Jupyter", "Transformers", "Data Pipelines"],
      githubLink: "https://github.com/thomxsnguyen/centaur",
      imageUrl: "/centaur.png",
    },
    {
      title: "Context Bandit Dashboard",
      description:
        "Interactive dashboard for real-time visualization of bandit experiment data. Enables automated data quality assessment and participant behavior analysis.",
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Plotly.js",
        "Papa Parse",
      ],
      githubLink: "https://github.com/thomxsnguyen/ContextBanditDashboard",
      imageUrl: "/contextbandit.png",
    },
    {
      title: "FEM Prediction Model",
      description:
        "Deep learning models (GRU, LSTM, RBF-RNN) for thermal simulation prediction. Achieved ~600x speedup over traditional FEM with sub-second inference.",
      technologies: ["Python", "PyTorch", "GRU", "LSTM", "RNN", "RBF-RNN"],
      githubLink: "https://github.com/thomxsnguyen/R199",
      imageUrl: "/R199.png",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen w-full max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-24 md:pb-48 overflow-x-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-100 transition-colors mb-8"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        back
      </Link>

      {/* Section Header */}
      <div className="text-left mb-12 md:mb-16">
        <h2
          className="text-4xl md:text-5xl font-light text-neutral-100 mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          research projects
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {researchProjects.map((project, index) => (
          <div
            key={index}
            className="group relative backdrop-blur-md bg-neutral-900/60 rounded-xl shadow-md border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-all duration-300"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Project Image */}
            {project.imageUrl && (
              <div className="relative w-full h-48 md:h-56 bg-neutral-800 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-transparent to-transparent"></div>
              </div>
            )}

            {/* Project Content */}
            <div className="p-5 md:p-6">
              <h3
                className="text-lg md:text-xl font-light text-neutral-100 mb-3 transition-colors duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {project.title}
              </h3>

              <p
                className="text-sm md:text-base text-neutral-400 mb-4 leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {project.description}
              </p>

              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2.5 py-1 bg-neutral-800 text-neutral-400 text-xs font-medium rounded-md border border-neutral-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-100 text-neutral-900 text-sm font-medium rounded-lg hover:bg-white transition-all duration-300"
                  >
                    <svg
                      className="w-4 h-4"
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
                    Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      project.demoLink ? "" : "flex-1"
                    } inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-neutral-700 text-neutral-300 text-sm font-medium rounded-lg hover:bg-neutral-800 hover:text-neutral-100 transition-all duration-300`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ResearchProjects;
