import "./App.css";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Projects from "./pages/Projects";
import LeetCode from "./pages/LeetCode";
import Experience from "./pages/Experience";
import SnowParticles from "./components/SnowParticles";
import SideMountains from "./components/SideMountains";

function App() {
  return (
    <div id="top" className="bg-blue-50 min-h-screen relative">
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
      </main>
    </div>
  );
}

export default App;
