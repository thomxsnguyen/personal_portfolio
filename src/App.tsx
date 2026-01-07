import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Projects from "./pages/Projects";
import LeetCode from "./pages/LeetCode";
import Contact from "./pages/Contact";
import SnowParticles from "./components/SnowParticles";
import SideMountains from "./components/SideMountains";
import ResearchProjects from "./pages/ResearchProjects";
import PersonalProjects from "./pages/PersonalProjects";

function MainPage({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <NavBar />
      <div id="top" className="relative">
        <SideMountains />
        <SnowParticles
          className="fixed inset-0 pointer-events-none z-[2]"
          count={isMobile ? 40 : 100}
        />
        <main className="relative z-[1] flex flex-col items-center justify-center w-full overflow-x-hidden pt-16 bg-transparent">
          <div className="py-10 bg-transparent">
            <HomePage name="thomas nguyen" />
          </div>
          <Projects />
          <LeetCode username="thomasn8255" />
          <Contact />
        </main>
      </div>
    </>
  );
}

function ProjectPage({
  isMobile,
  children,
}: {
  isMobile: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <SnowParticles
        className="fixed inset-0 pointer-events-none z-[2]"
        count={isMobile ? 40 : 100}
      />
      <main className="relative z-[1] flex flex-col items-center justify-center w-full overflow-x-hidden bg-transparent">
        {children}
      </main>
    </>
  );
}

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Router>
      <div
        className="min-h-screen relative overflow-x-hidden"
        style={{
          background:
            "linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0d0d0d 100%)",
        }}
      >
        {/* Subtle gradient overlay for depth */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(30, 30, 30, 0.5) 0%, transparent 60%)",
          }}
        />

        <Routes>
          <Route path="/" element={<MainPage isMobile={isMobile} />} />
          <Route
            path="/research-projects"
            element={
              <ProjectPage isMobile={isMobile}>
                <ResearchProjects />
              </ProjectPage>
            }
          />
          <Route
            path="/personal-projects"
            element={
              <ProjectPage isMobile={isMobile}>
                <PersonalProjects />
              </ProjectPage>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
