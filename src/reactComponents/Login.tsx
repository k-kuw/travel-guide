import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TravelGuideDialog from "./TravelGuideDialog";

type Props = {
  setLoginContext: React.Dispatch<React.SetStateAction<boolean>>;
};
// ログインコンポーネント
function Login(props: Props) {
  // ログイン状況
  const { setLoginContext } = props;
  // ログインエラーダイアログ表示
  const [openDialog, setOpenDialog] = useState(false);
  // ログインエラー内容
  const [errorTitle, setErrorTitle] = useState("サーバーエラー");
  const [errorMessage, setErrorMessage] =
    useState("サーバーでエラーが発生しました。");

  // ユーザ名入力要素
  const nameRef = useRef<HTMLInputElement>(null);
  // パスワード入力要素
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // ログイン処理
  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // ローカルストレージを初期化
    localStorage.clear();
    setLoginContext(false);
    const params = new URLSearchParams();
    params.append("username", nameRef.current!.value);
    params.append("password", passwordRef.current!.value);
    // トークン取得処理
    fetch("http://127.0.0.1:8000/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        // ローカルストレージにトークンとユーザ名を設定
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("username", nameRef.current!.value);
        setLoginContext(true);
        // しおり登録画面へ遷移
        navigate("/travel-guide-register");
      })
      .catch((error) => {
        // 認証失敗時
        if (error.message === "Unauthorized") {
          setErrorTitle("認証失敗");
          setErrorMessage(
            "認証に失敗しました。\nユーザ名、パスワードをご確認の上、再度お試しください。"
          );
        }
        // 入力内容不足時
        else if (error.message === "Bad Request") {
          setErrorTitle("入力不正");
          setErrorMessage(
            "入力が検知できませんでした。\nユーザ名、パスワードを再度ご入力ください。"
          );
        }
        setOpenDialog(true);
      });
  }

  // ユーザ登録画面遷移処理
  function moveToNewRegister() {
    navigate("/user-register");
  }

  return (
    <div className="p-1" style={{ margin: "0 25vw" }}>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="name" className="text-2xl font-semibold">
            ユーザ名
          </label>
          <Input id="name" name="name" ref={nameRef} />
        </div>
        <div>
          <label htmlFor="password" className="text-2xl font-semibold">
            パスワード
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            ref={passwordRef}
          />
        </div>
        <Button type="submit" className="w-full mt-5">
          ログイン
        </Button>
      </form>
      <Button className="w-full mt-5" onClick={moveToNewRegister}>
        ユーザ登録
      </Button>
      <TravelGuideDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title={errorTitle}
        message={errorMessage}
      />
    </div>
  );
}

export default Login;
