import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingDialog from "./LoadingDialog";
import TravelGuideDialog from "./TravelGuideDialog";

type Props = {
  setLoginContext: React.Dispatch<React.SetStateAction<boolean>>;
};
// ログインコンポーネント
function Login(props: Props) {
  // ログイン状況
  const { setLoginContext } = props;
  // ローディングダイアログ表示
  const [loadingDialog, setLoadingDialog] = useState(false);
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
    // 入力不足の場合
    if (nameRef.current!.value === "" || passwordRef.current!.value === "") {
      setErrorTitle("入力不正");
      setErrorMessage(
        "入力が検知できませんでした。\nユーザ名、パスワードを再度ご入力ください。"
      );
      setOpenDialog(true);
      return;
    }
    // ローカルストレージを初期化
    localStorage.clear();
    setLoginContext(false);
    const params = new URLSearchParams();
    params.append("username", nameRef.current!.value);
    params.append("password", passwordRef.current!.value);
    setLoadingDialog(true);
    // トークン取得処理
    fetch(`${import.meta.env.VITE_API_PATH}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })
      .then((response) => {
        setLoadingDialog(false);
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error("Bad Request");
          } else if (response.status === 401) {
            throw new Error("Unauthorized");
          } else {
            throw new Error();
          }
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
        // 入力内容不足時
        if (error.message === "Bad Request") {
          setErrorTitle("入力不正");
          setErrorMessage(
            "入力が検知できませんでした。\nユーザ名、パスワードを再度ご入力ください。"
          );
        }
        // 認証失敗時
        else if (error.message === "Unauthorized") {
          setErrorTitle("認証失敗");
          setErrorMessage(
            "認証に失敗しました。\nユーザ名、パスワードをご確認の上、再度お試しください。"
          );
        }
        // その他
        else {
          setErrorTitle("サーバーエラー");
          setErrorMessage("サーバーでエラーが発生しました。");
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
      <LoadingDialog open={loadingDialog} />
    </div>
  );
}

export default Login;
