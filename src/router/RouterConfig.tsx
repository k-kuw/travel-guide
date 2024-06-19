import Header from "@/reactComponents/Header";
import Login from "@/reactComponents/Login";
import TravelGuideList from "@/reactComponents/TravelGuideList";
import TravelGuideMap from "@/reactComponents/TravelGuideMap";
import TravelGuideResiter from "@/reactComponents/TravelGuideResiter";
import UserRegister from "@/reactComponents/UserRegister";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
function RouterConfig() {
  // ログイン状況
  const [loginContext, setLoginContext] = useState<boolean>(false);

  return (
    <>
      <BrowserRouter>
        <Header loginContext={loginContext} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route
            path="/travel-guide-register"
            element={<TravelGuideResiter />}
          />
          <Route path="/travel-guide-list" element={<TravelGuideList />} />
          <Route path="/travel-guide">
            <Route path=":guideId" element={<TravelGuideMap />} />
          </Route>
          <Route path="/travel-guide-map" element={<TravelGuideMap />} />
          <Route
            path="/login"
            element={<Login setLoginContext={setLoginContext} />}
          />
          <Route path="/user-register" element={<UserRegister />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouterConfig;
