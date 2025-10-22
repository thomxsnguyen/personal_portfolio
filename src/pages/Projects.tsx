import { useRef } from "react";
import MoreProjectsButton from "../components/MoreProjectsButton";

interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
  imageUrl?: string;
}

interface ProjectsProps {
  projects?: ProjectItem[];
}

function Projects({ projects }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const defaultProjects: ProjectItem[] = [
    {
      title: "ArtistShuffler",
      description:
        "Full-stack web app enabling Spotify users to blend and play playlists from multiple artists. Features Flask backend with Spotipy API integration, React TypeScript frontend, OAuth 2.0 authentication, real-time artist search, and dynamic playlist generation. Utilizes Axios for REST API communication and Tailwind CSS with Headless UI for a responsive, accessible interface.",
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
    {
      title: "FEM Prediction Model",
      description:
        "Developed GRU, LSTM, RNN, and RBF-RNN models using PyTorch to forecast thermal energy storage dynamics. Achieved sub-second inference times, outperforming traditional simulations by ~600x. Engineered custom dataset preprocessing and implemented teacher forcing for improved accuracy.",
      technologies: ["Python", "PyTorch", "GRU", "LSTM", "RNN", "RBF-RNN"],
      githubLink: "https://github.com/thomxsnguyen/R199",
      imageUrl: "/R199.png",
    },
    {
      title: "Context Bandit Dashboard",
      description: "Currently Under Development.",
      technologies: [],
      githubLink: "https://github.com/thomxsnguyen/ContextBanditDashboard",
      imageUrl: "/contextbandit.png",
    },
    {
      title: "RouteCrafter",
      description: "Currently Under Development.",
      technologies: [
        "React",
        "Node.js",
        "PostgreSQL",
        "Docker",
        "AWS",
        "Redis",
      ],
      githubLink: "https://github.com/thomxsnguyen/RouteCrafter",
    },
  ];

  const projectData = projects || defaultProjects;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full max-w-6xl mx-auto px-4 md:px-6 pt-8 md:pt-32 pb-32 md:pb-96 overflow-x-hidden"
    >
      <div className="text-center mb-8 md:mb-12 flex flex-col items-center">
        <h2
          className="text-4xl md:text-5xl text-blue-400 mb-4 drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Projects
        </h2>
        <p
          className="text-lg md:text-xl text-blue-300 drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
        >
          A showcase of my work and technical skills
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {projectData.map((project, index) => (
          <div
            key={index}
            className="bg-white border-2 border-blue-200 rounded-lg shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            {project.imageUrl && (
              <div className="w-full h-48 md:h-64 bg-gray-100 flex items-center justify-center p-3 md:p-4">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-500 mb-3">
                {project.title}
              </h3>
              <p className="text-sm md:text-base text-gray-500 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-50 text-blue-400 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-300 text-white rounded-md hover:scale-110 transition-transform duration-300"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
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
                    className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded-md hover:scale-110 transition-transform duration-300"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <MoreProjectsButton />
    </section>
  );
}

export default Projects;
