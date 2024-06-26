import Header from "@/reactComponents/Header";
import Login from "@/reactComponents/Login";
import NeedLogin from "@/reactComponents/NeedLogin";
import NotFound from "@/reactComponents/NotFound";
import TravelGuideMap from "@/reactComponents/TravelGuideDetail";
import TravelGuideList from "@/reactComponents/TravelGuideList";
import TravelGuideResiter from "@/reactComponents/TravelGuideResiter";
import UserRegister from "@/reactComponents/UserRegister";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
function RouterConfig() {
  // ログイン状況
  const [loginContext, setLoginContext] = useState<boolean>(false);
  // localStrage状況
  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Header loginContext={loginContext} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          {loginContext || token ? (
            // ログイン中
            <>
              <Route
                path="/travel-guide-register"
                element={<TravelGuideResiter />}
              />
              <Route path="/travel-guide-list" element={<TravelGuideList />} />
              <Route path="/travel-guide">
                <Route path=":guideId" element={<TravelGuideMap />} />
              </Route>
              <Route path="/travel-guide-map" element={<TravelGuideMap />} />
            </>
          ) : (
            // 未ログイン
            <>
              <Route path="/travel-guide-register" element={<NeedLogin />} />
              <Route path="/travel-guide-list" element={<NeedLogin />} />
              <Route path="/travel-guide">
                <Route path=":guideId" element={<NeedLogin />} />
              </Route>
              <Route path="/travel-guide-map" element={<NeedLogin />} />
            </>
          )}
          <Route
            path="/login"
            element={<Login setLoginContext={setLoginContext} />}
          />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouterConfig;
