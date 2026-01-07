import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
  imageUrl?: string;
  videoUrl?: string;
  fullDescription?: string;
  howItWorks?: string[];
  howToRun?: string[];
}

function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [videoModal, setVideoModal] = useState<string | null>(null);

  // Close video modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVideoModal(null);
      }
    };
    if (videoModal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [videoModal]);

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
      fullDescription:
        "Understanding how humans make decisions under uncertainty is a core challenge in cognitive science. Traditional approaches analyze participant data post-hoc, but cannot directly test whether a computational model would behave similarly in real-time. This platform bridges that gap by creating a 'Centaur-style' simulation environment where LLM-based agents face the exact same experimental conditions as human participants. The system converts raw experimental logs into structured decision transcripts, ensuring agents only observe information that was actually visible to participants (leak-free preprocessing). By comparing human choices against model predictions trial-by-trial, researchers can rigorously evaluate whether AI systems capture the nuances of human decision-making—or where they systematically diverge.",
      howItWorks: [
        "Converts experimental logs into structured, replayable decision transcripts",
        "Implements leak-free preprocessing ensuring agents only see participant-visible data",
        "Integrates Centaur-style LLM policy as drop-in decision engine",
        "Enforces strict output parsing for deterministic model-environment interfaces",
        "Compares human vs simulated behavior using distributional metrics",
      ],
      howToRun: [
        "Project currently in development - setup instructions coming soon",
      ],
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
      fullDescription:
        "Contextual bandit tasks are widely used in behavioral research to study how people learn and make decisions under uncertainty—participants repeatedly choose among options with probabilistic rewards that may change over time. Previously, experiments included built-in visualizations that let researchers immediately inspect participant behavior after data collection, identifying issues like disengagement, random responding, or single-option perseveration. When the experimental pipeline transitioned to Python, this visualization layer was lost. The Context Bandit Dashboard was built to restore and enhance this capability, providing an interactive browser-based interface that auto-updates as new data arrives. Researchers can now visually assess data quality in real-time, making informed decisions about which participants to include in formal analyses.",
      howItWorks: [
        "Processes and visualizes trial-by-trial choice data automatically",
        "Displays choice patterns, response times, and reward outcomes per participant",
        "Identifies disengaged or random-responding participants",
        "Real-time updates as new experimental data arrives",
        "Supports informed decisions on participant inclusion",
      ],
      howToRun: [
        "Clone the repository: git clone https://github.com/thomxsnguyen/ContextBanditDashboard",
        "Install dependencies: npm install",
        "Start development server: npm run dev",
        "Access the dashboard at http://localhost:5173",
      ],
    },
    {
      title: "FEM Prediction Model",
      description:
        "Deep learning models (GRU, LSTM, RBF-RNN) for thermal simulation prediction. Achieved ~600x speedup over traditional FEM with sub-second inference.",
      technologies: ["Python", "PyTorch", "GRU", "LSTM", "RNN", "RBF-RNN"],
      githubLink: "https://github.com/thomxsnguyen/R199",
      imageUrl: "/R199.png",
      fullDescription:
        "Finite Element Method (FEM) simulations are essential for designing thermal energy storage systems, but a single simulation can take hours to complete—making iterative design exploration impractical. This project applies deep learning to create surrogate models that approximate FEM outputs in sub-second time. By training recurrent neural networks (GRU, LSTM, RBF-RNN) on historical simulation data, the system learns to predict temperature distributions and energy transfer dynamics with high accuracy. The result is a ~600x speedup over traditional methods, enabling engineers to rapidly explore design variations and optimize system performance without waiting for computationally expensive simulations.",
      howItWorks: [
        "Custom preprocessing pipeline normalizes and sequences FEM outputs",
        "Multiple RNN architectures trained on historical simulation data",
        "Teacher forcing improves training stability for long sequences",
        "Predicts temperature distributions and energy transfer rates",
        "Ensemble methods combine architectures for improved accuracy",
      ],
      howToRun: [
        "Clone the repository: git clone https://github.com/thomxsnguyen/R199",
        "Create virtual environment: python -m venv venv && source venv/bin/activate",
        "Install dependencies: pip install -r requirements.txt",
        "Prepare data: python scripts/preprocess_data.py",
        "Train model: python train.py --model gru --epochs 100",
        "Run inference: python predict.py --input data/test.csv",
      ],
    },
  ];

  const personalProjects: ProjectItem[] = [
    {
      title: "Mock Sports Betting Platform",
      description:
        "Mobile app prototype for sports betting built with React Native and Expo. Features NativeWind styling, React Context state management, and real-time odds display mockups.",
      technologies: ["React Native", "Expo", "TypeScript", "NativeWind", "Tailwind CSS"],
      demoLink: "https://sportstake.vercel.app",
      githubLink: "https://github.com/thomxsnguyen/sportstake",
      imageUrl: "/sportsstakeproject.png",
      videoUrl: "/mockuprecording (2).mov",
    },
    {
      title: "Emergency Signal Platform (In Progress)",
      description:
        "Full-stack emergency communication platform with real-time signal broadcasting. Features TypeScript client-server architecture for rapid emergency response coordination.",
      technologies: ["TypeScript", "React", "Node.js", "WebSockets"],
      githubLink: "https://github.com/thomxsnguyen/emergency_signal_platform",
      imageUrl: "/emergency_signal_platform.png",
      fullDescription:
        "A real-time emergency signal platform designed to facilitate rapid communication during critical situations. The system enables users to broadcast emergency signals and coordinate responses through a modern web interface. Built with a TypeScript-first approach across both client and server, the platform prioritizes reliability and low-latency communication essential for emergency scenarios.",
      howItWorks: [
        "Real-time signal broadcasting between users",
        "TypeScript client-server architecture for type safety",
        "WebSocket connections for low-latency communication",
        "Responsive interface for mobile and desktop access",
      ],
      howToRun: [
        "Project currently in development - setup instructions coming soon",
      ],
    },
    {
      title: "ArtistShuffler",
      description:
        "Full-stack Spotify playlist generator with Flask backend, React/TypeScript frontend, OAuth 2.0 auth, and real-time artist search via Spotipy API.",
      technologies: [
        "React",
        "TypeScript",
        "Flask",
        "Tailwind CSS",
        "Vite",
        "Spotify API",
      ],
      githubLink: "https://github.com/thomxsnguyen/ArtistBlender",
      imageUrl: "/artistblender.png",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`w-full max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-24 md:pb-48 overflow-x-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Section Header */}
      <div className="text-left mb-12 md:mb-16">
        <h2
          className="text-4xl md:text-5xl font-light text-neutral-100 mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          projects
        </h2>
      </div>

      {/* Research Projects Section */}
      <div className="mb-12 md:mb-16">
        <h3
          className="text-xl md:text-2xl font-light text-neutral-400 mb-6 md:mb-8 text-left"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          research
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {researchProjects.map((project, index) => (
            <div
              key={index}
              className={`group relative backdrop-blur-md bg-neutral-900/60 rounded-xl shadow-md border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-all duration-300 cursor-pointer ${
                expandedProject === project.title ? "lg:col-span-2" : ""
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() =>
                setExpandedProject(
                  expandedProject === project.title ? null : project.title
                )
              }
            >
              {/* Expand/Collapse Icon */}
              <div className="absolute top-3 right-3 z-10">
                <div className="p-1.5 bg-neutral-800/80 rounded-full backdrop-blur-sm">
                  <svg
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                      expandedProject === project.title ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

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
                {/* Title */}
                <h3
                  className="text-lg md:text-xl font-light text-neutral-100 mb-3 transition-colors duration-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-sm md:text-base text-neutral-400 mb-4 leading-relaxed ${
                    expandedProject === project.title ? "" : "line-clamp-3"
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {expandedProject === project.title && project.fullDescription
                    ? project.fullDescription
                    : project.description}
                </p>

                {/* Expanded Content */}
                {expandedProject === project.title && (
                  <div className="mt-4 space-y-4 animate-fadeIn">
                    {/* How It Works */}
                    {project.howItWorks && project.howItWorks.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-neutral-200 mb-2">
                          How It Works
                        </h4>
                        <ul className="space-y-1.5">
                          {project.howItWorks.map((item, i) => (
                            <li
                              key={i}
                              className="text-sm text-neutral-400 flex items-start gap-2"
                            >
                              <span className="text-neutral-500 mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* How To Run */}
                    {project.howToRun && project.howToRun.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-neutral-200 mb-2">
                          How To Run
                        </h4>
                        <div className="bg-neutral-800/50 rounded-lg p-3 font-mono text-xs text-neutral-300 space-y-1">
                          {project.howToRun.map((step, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="text-neutral-500">{i + 1}.</span>
                              <code>{step}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Technologies */}
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5 mt-4">
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

                {/* Action Buttons */}
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
        {/* More Research Projects Button */}
        <div className="flex justify-start mt-6">
          <Link
            to="/research-projects"
            className="inline-flex items-center gap-2 px-4 py-2 text-neutral-400 hover:text-neutral-100 transition-colors text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            more research projects
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Personal Projects Section */}
      <div className="mb-12 md:mb-16">
        <h3
          className="text-xl md:text-2xl font-light text-neutral-400 mb-6 md:mb-8 text-left"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          personal
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {personalProjects.map((project, index) => (
            <div
              key={index}
              className="group relative backdrop-blur-md bg-neutral-900/60 rounded-xl shadow-md border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-all duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Project Image or Video */}
              {project.videoUrl ? (
                <div className="relative w-full h-48 md:h-56 bg-neutral-800 overflow-hidden">
                  <video
                    src={project.videoUrl}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-transparent to-transparent pointer-events-none"></div>
                </div>
              ) : project.imageUrl ? (
                <div className="relative w-full h-48 md:h-56 bg-neutral-800 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-transparent to-transparent"></div>
                </div>
              ) : null}

              {/* Project Content */}
              <div className="p-5 md:p-6">
                {/* Title */}
                <h3
                  className="text-lg md:text-xl font-light text-neutral-100 mb-3 transition-colors duration-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm md:text-base text-neutral-400 mb-4 leading-relaxed line-clamp-3"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {project.description}
                </p>

                {/* Technologies */}
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

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  {project.videoUrl ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setVideoModal(project.videoUrl!);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-100 text-neutral-900 text-sm font-medium rounded-lg hover:bg-white transition-all duration-300"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Watch Demo
                    </button>
                  ) : project.demoLink ? (
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
                  ) : null}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        project.demoLink || project.videoUrl ? "" : "flex-1"
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
        {/* More Personal Projects Button */}
        <div className="flex justify-start mt-6">
          <Link
            to="/personal-projects"
            className="inline-flex items-center gap-2 px-4 py-2 text-neutral-400 hover:text-neutral-100 transition-colors text-sm"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            more personal projects
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setVideoModal(null)}
        >
          <div className="relative w-full max-w-5xl mx-4">
            {/* Close Button */}
            <button
              onClick={() => setVideoModal(null)}
              className="absolute -top-12 right-0 p-2 text-neutral-400 hover:text-white transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Video */}
            <video
              src={videoModal}
              className="w-full rounded-lg shadow-2xl"
              controls
              autoPlay
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
