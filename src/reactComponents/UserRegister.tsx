import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingDialog from "./LoadingDialog";
import TravelGuideDialog from "./TravelGuideDialog";

// ユーザ登録コンポーネント
function UserRegister() {
  // ローディングダイアログ表示
  const [loadingDialog, setLoadingDialog] = useState(false);
  // ユーザ登録失敗ダイアログ表示
  const [openDialog, setOpenDialog] = useState(false);
  // ユーザ登録エラー内容
  const [errorTitle, setErrorTitle] = useState("サーバーエラー");
  const [errorMessage, setErrorMessage] =
    useState("サーバーでエラーが発生しました。");

  // ユーザ名入力要素
  const nameRef = useRef<HTMLInputElement>(null);
  // メールアドレス入力要素
  const emailRef = useRef<HTMLInputElement>(null);
  // パスワード入力要素
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // ユーザ登録処理
  function registerUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // パスワードが4文字以下の場合
    if (passwordRef.current!.value.length <= 4) {
      setErrorTitle("パスワード文字数不足");
      setErrorMessage("パスワードは5文字以上必要です。");
      setOpenDialog(true);
      return;
    }
    const params = {
      name: nameRef.current!.value,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };
    setLoadingDialog(true);
    fetch(`${import.meta.env.VITE_API_PATH}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify(params),
    })
      .then((response) => {
        setLoadingDialog(false);
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error("Bad Request");
          } else if (response.status === 409) {
            throw new Error("Conflict");
          } else if (response.status === 411) {
            throw new Error("Length Required");
          } else {
            throw new Error();
          }
        }
        return response.json();
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        // 入力内容不足時
        if (error.message === "Bad Request") {
          setErrorTitle("入力不正");
          setErrorMessage(
            "入力が検知できませんでした。\nユーザ名、メールアドレス、パスワードを再度ご入力ください。"
          );
        }
        // ユーザ名が既に使用されている時
        else if (error.message === "Conflict") {
          setErrorTitle("ユーザ名重複");
          setErrorMessage(
            "そのユーザ名は既に使用されています。\n別のユーザ名をご使用ください。"
          );
        }
        // パスワード文字数不足時
        else if (error.message === "Length Required") {
          setErrorTitle("パスワード文字数不足");
          setErrorMessage("パスワードは5文字以上必要です。");
        }
        // その他
        else {
          setErrorTitle("サーバーエラー");
          setErrorMessage("サーバーでエラーが発生しました。");
        }
        setOpenDialog(true);
      });
  }

  return (
    <div className="p-1" style={{ margin: "0 25vw" }}>
      <form onSubmit={registerUser}>
        <div>
          <label htmlFor="name" className="text-2xl font-semibold">
            ユーザ名
          </label>
          <Input id="name" name="name" type="text" ref={nameRef} />
        </div>
        <div>
          <label htmlFor="email" className="text-2xl font-semibold">
            メールアドレス
          </label>
          <Input id="email" name="email" type="email" ref={emailRef} />
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
          登録
        </Button>
      </form>
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

export default UserRegister;
