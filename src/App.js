import "./App.css";
import "./carousel.css";
import Footer from "./components/Footer";
import TopNav from "./components/TopNav";
import Body from "./components/Body";
import { Routes, Route, Link } from "react-router-dom";
import Pstaffing from "./components/Pstaffing";
import Aboutus from "./components/Aboutus";
import CareerPage from "./components/CareerPage";
function App() {
  return (
    <>
      <TopNav />
      <Routes>
        <Route exact path="/" element={<Body />} />
        <Route path="/home" element={<Body />} />
        <Route path="permanentstaffing" element={<Pstaffing />} />
        <Route path="about" element={<Aboutus />} />
        <Route path="career" element={<CareerPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
