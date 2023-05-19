import "./App.css";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Header from "./components/Header";
import {
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  const hasToken = localStorage.getItem("userToken");
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <main className="banner">
          <section className="inner">
            <Routes>
              <Route path="/" element={<Login></Login>} />
              {hasToken && (
                <>
                  <Route path="/home" element={<Home></Home>} />
                  <Route path="/about" element={<About></About>} />
                </>
              )}
            </Routes>
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;
