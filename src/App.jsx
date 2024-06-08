import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Admin from "./pages/Admin.jsx";
import LandingPage from "./pages/LandingPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
