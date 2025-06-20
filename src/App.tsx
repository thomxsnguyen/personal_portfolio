import "./App.css";
import HomePage from "./HomePage";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="flex items-center justify-center flex-col">
      <NavBar />
      <HomePage name="Thomas Nguyen" />
    </div>
  );
}

export default App;
