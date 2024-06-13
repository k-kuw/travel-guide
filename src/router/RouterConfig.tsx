import Header from "@/reactComponents/Header";
import Home from "@/reactComponents/Home";
import TravelGuideResiter from "@/reactComponents/TravelGuideResiter";
import TravelGuideList from "@/reactComponents/TravelGuideList";
import TravelGuideMap from "@/reactComponents/TravelGuideMap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function RouterConfig() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/travel-guide-register"
            element={<TravelGuideResiter />}
          />
          <Route path="/travel-guide-list" element={<TravelGuideList />} />
          <Route path="/travel-guide-map" element={<TravelGuideMap />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouterConfig;
