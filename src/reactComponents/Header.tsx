import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

type Props = {
  loginContext: boolean;
};

function Header(props: Props) {
  const { loginContext } = props;
  const location = useLocation();
  function changeCurrentPageNavColor(path: string) {
    if (location.pathname === path) {
      return "text-white";
    } else {
      return "";
    }
  }
  return (
    <div className="no-print">
      <header className="bg-blue-500 py-4 px-6 md:px-8">
        <div className="container mx-auto px-0 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-white font-bold text-lg">Travel Guide</h1>
            <nav className="md:flex items-center gap-2">
              <Button
                variant="ghost"
                className={`hover:text-white 
                  ${changeCurrentPageNavColor("/travel-guide-register")}`}
              >
                <Link to="/travel-guide-register">しおりを登録</Link>
              </Button>
              <Button
                variant="ghost"
                className={`hover:text-white 
                  ${changeCurrentPageNavColor("/travel-guide-list")}`}
              >
                <Link to="/travel-guide-list">しおり一覧</Link>
              </Button>
              <Button
                variant="ghost"
                className={`hover:text-white 
                  ${changeCurrentPageNavColor("/login")}`}
              >
                <Link to="/login">ログイン</Link>
              </Button>
            </nav>
          </div>
          {loginContext && (
            <div>ようこそ{localStorage.getItem("username")}さん</div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
