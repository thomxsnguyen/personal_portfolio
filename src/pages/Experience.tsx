import { useState, useEffect, useRef } from "react";

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  image?: string;
  type: "work" | "research";
}

interface ExperienceProps {
  experiences?: ExperienceItem[];
}

function Experience({ experiences }: ExperienceProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
      type: "research",
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
      type: "research",
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
      type: "research",
    },
    {
      company: "SportsStake",
      position: "Software Engineer Intern",
      duration: "June 2025 - September 2025",
      location: "Los Angeles, CA",
      description: [
        "Built fantasy-sports features in Flutter/Dart and deployed Node.js backend on AWS with Docker and CI/CD, reducing deployment overhead by 70% and response latency by 40% with Redis caching.",
      ],
      image: "/sportsakecopy.png",
      type: "work",
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
      type: "work",
    },
  ];

  const experienceData = experiences || defaultExperiences;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`w-full max-w-6xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16 overflow-x-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16">
        <p className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Career Journey</p>
        <h2
          className="text-3xl md:text-4xl font-bold text-neutral-100 mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Experience
        </h2>
        <p
          className="text-base md:text-lg text-neutral-400 max-w-2xl mx-auto"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          My professional journey through research and industry
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-700 transform -translate-x-1/2"></div>

        {experienceData.map((experience, index) => (
          <div
            key={`experience-${index}`}
            className={`relative mb-8 md:mb-12 ${
              index % 2 === 0 ? "md:pr-[50%]" : "md:pl-[50%]"
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Timeline Dot */}
            <div className="hidden md:flex absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
              <div className="w-3 h-3 rounded-full border-2 border-neutral-900 shadow-md bg-neutral-500"></div>
            </div>

            {/* Card */}
            <div className={`group backdrop-blur-md bg-neutral-900/60 rounded-2xl shadow-lg border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-all duration-500 ${
              index % 2 === 0 ? "md:mr-8" : "md:ml-8"
            }`}>
              {/* Company Image */}
              {experience.image && (
                <div className="relative h-32 md:h-40 bg-neutral-800 overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.company}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-transparent to-transparent"></div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-900/80 text-neutral-400 border border-neutral-700">
                    {experience.type === "research" ? "Research" : "Industry"}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-5 md:p-6">
                {/* Position */}
                <h3 className="text-lg md:text-xl font-semibold text-neutral-100 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {experience.position}
                </h3>

                {/* Company */}
                <p className="text-base md:text-lg font-medium text-neutral-400 mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {experience.company}
                </p>

                {/* Duration & Location */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 mb-4">
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {experience.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {experience.location}
                  </span>
                </div>

                {/* Description */}
                <ul className="space-y-2">
                  {experience.description.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-neutral-400 text-sm leading-relaxed flex items-start"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <span className="text-neutral-600 mr-2 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
