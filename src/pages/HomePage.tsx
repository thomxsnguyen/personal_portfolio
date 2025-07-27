import React from "react";
import profilePic from "../assets/profilepic.jpg";
import TypeWriter from "../components/TypeWriter";

interface HomePageProps {
  name: string;
}

function HomePage({ name }: HomePageProps) {
  return (
    <section
      id="home"
      className="flex flex-row items-start gap-x-18 py-80 p-40"
    >
      <div className="flex flex-col gap-y-.5 h-72 justify-start">
        <TypeWriter
          texts={[name, "Computer Science Student at UCI"]}
          speeds={[50, 40]}
          delays={[500, 300]}
          cursor={true}
        />
        <div className="flex items-center space-x-4 mt-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-gray-600 hover:scale-125 transition-transform duration-300 p-1"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="text-gray-600 hover:scale-125 transition-transform duration-300 p-1"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="mailto:thomasn8255@gmail.com"
            aria-label="Email"
            className="text-gray-600 hover:scale-125 transition-transform duration-300 p-1"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
          <a
            href="#CV"
            aria-label="CV"
            className="text-gray-600 hover:scale-110 transition-transform duration-300 p-1 text-lg font-bold"
          >
            CV
          </a>
        </div>

        {/* Currently Working Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Currently Working
          </h3>
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Software Engineer Intern</span> @{" "}
              <span className="text-blue-600">Sportstake</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">
                Software Developer Research Assistant
              </span>{" "}
              @ <span className="text-blue-600">dapLab</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Machine Research Assistant</span> @{" "}
              <span className="text-blue-600">Calit2</span>
            </div>
          </div>
        </div>
      </div>
      <img
        src={profilePic}
        alt="profilepic"
        className="w-54 h-54 rounded-full object-cover shadow-lg -mt-24"
      />
    </section>
  );
}

export default HomePage;
