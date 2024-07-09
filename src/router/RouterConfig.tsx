import Header from "@/reactComponents/Header";
import Login from "@/reactComponents/Login";
import NeedLogin from "@/reactComponents/NeedLogin";
import NotFound from "@/reactComponents/NotFound";
import TravelGuideDetail from "@/reactComponents/TravelGuideDetail";
import TravelGuideList from "@/reactComponents/TravelGuideList";
import TravelGuidePrint from "@/reactComponents/TravelGuidePrint";
import TravelGuideRegister from "@/reactComponents/TravelGuideRegister";
import UserRegister from "@/reactComponents/UserRegister";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// ルーティング設定コンポーネント
function RouterConfig() {
  // ログイン状況
  const [loginContext, setLoginContext] = useState<boolean>(false);
  // token状況
  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          {token ? (
            // ログイン時
            <>
              <Route path="/travel-guide-register">
                <Route
                  index
                  element={
                    <>
                      <Header loginContext={loginContext} />
                      <TravelGuideRegister />
                    </>
                  }
                />
                <Route
                  path=":guideId"
                  element={
                    <>
                      <Header loginContext={loginContext} />
                      <TravelGuideRegister />
                    </>
                  }
                />
              </Route>
              <Route
                path="/travel-guide-list"
                element={
                  <>
                    <Header loginContext={loginContext} />
                    <TravelGuideList />
                  </>
                }
              />
              <Route path="/travel-guide">
                <Route
                  path=":guideId"
                  element={
                    <>
                      <Header loginContext={loginContext} />
                      <TravelGuideDetail />
                    </>
                  }
                />
                <Route path="print">
                  <Route path=":guideId" element={<TravelGuidePrint />} />
                </Route>
              </Route>
            </>
          ) : (
            // 未ログイン時
            <Route
              path="*"
              element={
                <>
                  <Header loginContext={loginContext} />
                  <NeedLogin />
                </>
              }
            />
          )}
          <Route
            path="/login"
            element={
              <>
                <Header loginContext={loginContext} />
                <Login setLoginContext={setLoginContext} />
              </>
            }
          />
          <Route
            path="/user-register"
            element={
              <>
                <Header loginContext={loginContext} />
                <UserRegister />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <Header loginContext={loginContext} />
                <NotFound />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouterConfig;
