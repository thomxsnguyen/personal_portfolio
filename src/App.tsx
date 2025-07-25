import "./App.css";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import Projects from "./Projects";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <main className="flex flex-col items-center justify-center">
        <div className="py-10">
          <HomePage name="Thomas Nguyen" />
        </div>
        <Projects />
      </main>
    </div>
  );
}

export default App;
