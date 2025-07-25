import React from "react";

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
}

interface ExperienceProps {
  experiences?: ExperienceItem[];
}

const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  // Default experience data - replace with your actual experience
  const defaultExperiences: ExperienceItem[] = [
    {
      company: "Tech Company Inc.",
      position: "Software Engineer Intern",
      duration: "June 2023 - August 2023",
      location: "San Francisco, CA",
      description: [
        "Developed and maintained web applications using React and Node.js",
        "Collaborated with cross-functional teams to deliver high-quality software solutions",
        "Participated in code reviews and improved application performance by 25%",
      ],
    },
    {
      company: "University Research Lab",
      position: "Research Assistant",
      duration: "September 2022 - Present",
      location: "Irvine, CA",
      description: [
        "Conducted research on machine learning algorithms for data analysis",
        "Published findings in peer-reviewed conferences",
        "Mentored undergraduate students in research methodologies",
      ],
    },
  ];

  const experienceData = experiences || defaultExperiences;

  return (
    <section id="experience" className="w-full max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Experience</h2>
        <p className="text-xl text-gray-600">
          My professional journey and achievements
        </p>
      </div>

      <div className="space-y-8">
        {experienceData.map((exp, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div className="mb-2 md:mb-0">
                <h3 className="text-xl font-bold text-gray-800">
                  {exp.position}
                </h3>
                <h4 className="text-lg font-semibold text-blue-600">
                  {exp.company}
                </h4>
              </div>
              <div className="text-sm text-gray-500 md:text-right">
                <p className="font-medium">{exp.duration}</p>
                <p>{exp.location}</p>
              </div>
            </div>

            <ul className="space-y-2">
              {exp.description.map((desc, descIndex) => (
                <li key={descIndex} className="text-gray-700 flex items-start">
                  <span className="text-blue-500 mr-2 mt-1.5">•</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
