import React from "react";
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
  const defaultProjects: ProjectItem[] = [
    {
      title: "Portfolio Website",
      description:
        "A responsive personal portfolio website built with React and TypeScript. Features smooth scrolling, modern design, and mobile-first approach.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      demoLink: "https://example.com",
      githubLink: "https://github.com/username/portfolio",
    },
    {
      title: "Task Management App",
      description:
        "A full-stack task management application with user authentication, real-time updates, and collaborative features.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      demoLink: "https://example.com",
      githubLink: "https://github.com/username/task-app",
    },
    {
      title: "Machine Learning Model",
      description:
        "Developed a machine learning model for predicting stock prices using historical data and various technical indicators.",
      technologies: ["Python", "TensorFlow", "Pandas", "Scikit-learn"],
      githubLink: "https://github.com/username/ml-stock-prediction",
    },
    {
      title: "Mobile Weather App",
      description:
        "Cross-platform mobile application that provides weather forecasts with beautiful animations and location-based services.",
      technologies: ["React Native", "TypeScript", "Weather API", "Expo"],
      demoLink: "https://example.com",
      githubLink: "https://github.com/username/weather-app",
    },
  ];

  const projectData = projects || defaultProjects;

  return (
    <section
      id="projects"
      className="w-full max-w-6xl mx-auto px-6 pt-32 pb-96"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Projects</h2>
        <p className="text-xl text-gray-600">
          A showcase of my work and technical skills
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectData.map((project, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
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
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:scale-110 transition-transform duration-300"
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
