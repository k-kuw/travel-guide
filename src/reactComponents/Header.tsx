import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Props = {
  loginContext: boolean;
};

function Header(props: Props) {
  const { loginContext } = props;
  return (
    <div>
      <header className="bg-blue-500 py-4 px-6 md:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-white font-bold text-lg">Travel Guide</h1>
            <nav className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                className="hover:text-white"
                disabled={!loginContext}
              >
                <Link to="/travel-guide-register">しおりを登録</Link>
              </Button>
              <Button
                variant="ghost"
                className=" hover:text-white"
                disabled={!loginContext}
              >
                <Link to="/travel-guide-list">しおり一覧</Link>
              </Button>
              <Button
                variant="ghost"
                className=" hover:text-white"
                disabled={!loginContext}
              >
                <Link to="/travel-guide-map">地図</Link>
              </Button>
              <Button variant="ghost" className=" hover:text-white">
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
