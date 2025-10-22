import "./App.css";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Projects from "./pages/Projects";
import LeetCode from "./pages/LeetCode";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import SnowParticles from "./components/SnowParticles";
import SideMountains from "./components/SideMountains";

function App() {
  return (
    <div
      id="top"
      className="min-h-screen relative"
      style={{
        background:
          "linear-gradient(to bottom, rgba(147, 197, 253, 0.15) 0%, rgba(191, 219, 254, 0.1) 40%, rgba(219, 234, 254, 0.08) 70%, rgba(240, 249, 255, 0.05) 100%)",
      }}
    >
      <SideMountains />
      <SnowParticles
        className="fixed inset-0 pointer-events-none z-5"
        count={150}
      />
      <NavBar />
      <main className="relative z-10 flex flex-col items-center justify-center">
        <div className="py-10">
          <HomePage name="Thomas Nguyen" />
        </div>
        <Experience />
        <Projects />
        <LeetCode username="thomasn8255" />
        <Contact />
      </main>
    </div>
  );
}

export default App;
