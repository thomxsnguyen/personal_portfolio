interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  image?: string;
}

interface ExperienceProps {
  experiences?: ExperienceItem[];
}

function Experience({ experiences }: ExperienceProps) {
  // Default experience data
  const defaultExperiences: ExperienceItem[] = [
    {
      company: "dapLab",
      position: "Software Developer Research Assistant",
      duration: "September 2025 - Present",
      location: "Irvine, CA",
      description: [
        "Researching software development methodologies and building tools to enhance laboratory workflows and data analysis capabilities.",
      ],
      image: "/daplab.png",
    },
    {
      company: "UCI Computational Cognitive Neuroscience Lab",
      position: "Undergraduate Research Assistant",
      duration: "April 2025 - Present",
      location: "Irvine, CA",
      description: [
        "Applying machine learning and computational models to understand cognitive processes and neural mechanisms.",
      ],
      image: "/uciccnl.png",
    },
    {
      company: "Calit2",
      position: "Machine Learning Research Assistant",
      duration: "October 2024 - Present",
      location: "Irvine, CA",
      description: [
        "Developed Python data pipelines for FEM simulation datasets and optimized PyTorch models for thermal prediction, achieving 3x improvement in stability and reducing inference latency from minutes to seconds.",
      ],
      image: "/calit2.png",
    },
    {
      company: "SportsStake",
      position: "Software Engineer Intern",
      duration: "June 2024 - September 2024",
      location: "Los Angeles, CA",
      description: [
        "Built fantasy-sports features in Flutter/Dart and deployed Node.js backend on AWS with Docker and CI/CD, reducing deployment overhead by 70% and response latency by 40% with Redis caching.",
      ],
      image: "/sportsakecopy.png",
    },
    {
      company: "Boundary Remote Sensing Systems",
      position: "Software Developer Intern",
      duration: "June 2024 - September 2024",
      location: "Los Angeles, CA",
      description: [
        "Developed React/TypeScript frontend framework for geospatial visualization and built Express.js REST API for NetCDF4 data processing, improving retrieval speed by 35%.",
      ],
      image: "/brsscopy.png",
    },
  ];

  const experienceData = experiences || defaultExperiences;

  return (
    <section
      id="experience"
      className="w-full max-w-6xl mx-auto px-6 pt-8 pb-16"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Experience</h2>
        <p className="text-xl text-gray-600">
          My professional journey and accomplishments
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto py-8">
        {/* Timeline Items */}
        {experienceData.map((experience, index) => (
          <div key={index} className="relative mb-16">
            {/* Timeline Line Segment (except for last item) */}
            {index < experienceData.length - 1 && (
              <div className="absolute left-1/2 top-4 transform -translate-x-1/2 w-0.5 h-full bg-blue-400 z-0"></div>
            )}

            <div className="flex items-start relative">
              {/* Left Side Content (for even indices) */}
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : ""}`}>
                {index % 2 === 0 && (
                  <div className="bg-white border-2 border-blue-200 rounded-lg shadow-xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                    {/* Image Placeholder */}
                    {experience.image ? (
                      <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={experience.image}
                          alt={experience.company}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                          {experience.company}
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {experience.position}
                    </h3>
                    <p className="text-lg font-medium text-blue-400 mb-3">
                      @ {experience.company}
                    </p>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {experience.duration}
                    </div>
                    <ul className="space-y-2">
                      {experience.description.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-gray-700 text-sm flex items-start"
                        >
                          <span className="text-blue-400 mr-2 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 top-20 transform -translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full border-4 border-white shadow-lg z-10"></div>

              {/* Right Side Content (for odd indices) */}
              <div className={`w-1/2 ${index % 2 === 1 ? "pl-8" : ""}`}>
                {index % 2 === 1 && (
                  <div className="bg-white border-2 border-blue-200 rounded-lg shadow-xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                    {/* Image Placeholder */}
                    {experience.image ? (
                      <div className="w-full h-40 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={experience.image}
                          alt={experience.company}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">
                          {experience.company}
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {experience.position}
                    </h3>
                    <p className="text-lg font-medium text-blue-400 mb-3">
                      @ {experience.company}
                    </p>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {experience.duration}
                    </div>
                    <ul className="space-y-2">
                      {experience.description.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-gray-700 text-sm flex items-start"
                        >
                          <span className="text-blue-400 mr-2 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
