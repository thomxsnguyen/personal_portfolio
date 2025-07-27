import "./App.css";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import Projects from "./pages/Projects";
import LeetCode from "./pages/LeetCode";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <main className="flex flex-col items-center justify-center">
        <div className="py-10">
          <HomePage name="Thomas Nguyen" />
        </div>
        <Projects />
        <LeetCode />
      </main>
    </div>
  );
}

export default App;
