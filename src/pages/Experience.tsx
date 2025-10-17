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

function Experience({ experiences }: ExperienceProps) {
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
      duration: "September 2022 - May 2023",
      location: "Irvine, CA",
      description: [
        "Conducted research on machine learning algorithms for data analysis",
        "Published findings in academic journals and presented at conferences",
        "Collaborated with graduate students and faculty on multiple research projects",
      ],
    },
  ];

  const experienceData = experiences || defaultExperiences;

  return (
    <section id="experience" className="w-full max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Experience</h2>
        <p className="text-xl text-gray-600">
          My professional journey and accomplishments
        </p>
      </div>
      <div className="space-y-8">
        {experienceData.map((experience, index) => (
          <div
            key={index}
            className="bg-blue-50 rounded-lg shadow-lg p-6 border-l-4 border-blue-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {experience.position}
                </h3>
                <p className="text-lg font-medium text-blue-400">
                  {experience.company}
                </p>
              </div>
              <div className="text-right mt-2 md:mt-0">
                <p className="text-gray-600 font-medium">
                  {experience.duration}
                </p>
                <p className="text-gray-500">{experience.location}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {experience.description.map((item, itemIndex) => (
                <li key={itemIndex} className="text-gray-700 flex items-start">
                  <span className="text-blue-300 mr-2 mt-1.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
