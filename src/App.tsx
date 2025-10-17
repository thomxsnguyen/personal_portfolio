import "./App.css";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Projects from "./pages/Projects";
import LeetCode from "./pages/LeetCode";
import SnowParticles from "./components/SnowParticles";
import SideMountains from "./components/SideMountains";

function App() {
  return (
    <div id="top" className="bg-blue-50 min-h-screen relative">
      <SideMountains />
      <SnowParticles
        className="fixed inset-0 pointer-events-none z-50"
        count={150}
      />
      <NavBar />
      <main className="flex flex-col items-center justify-center">
        <div className="py-10">
          <HomePage name="Thomas Nguyen" />
        </div>
        <Projects />
        <LeetCode username="thomasn8255" />
      </main>
    </div>
  );
}

export default App;
