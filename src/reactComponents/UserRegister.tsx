import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TravelGuideDialog from "./TravelGuideDialog";

function UserRegister() {
  const [openDialog, setOpenDialog] = useState(false);
  const [errorTitle, setErrorTitle] = useState("サーバーエラー");
  const [errorMessage, setErrorMessage] =
    useState("サーバーでエラーが発生しました。");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  function registerUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = {
      username: nameRef.current!.value,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    };
    fetch("http://127.0.0.1:8000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        navigate("/login");
      })
      .catch((error) => {
        if (error.message === "Bad Request") {
          setErrorTitle("入力不正");
          setErrorMessage(
            "入力が検知できませんでした。\nユーザ名、メールアドレス、パスワードを再度ご入力ください。"
          );
        } else if (error.message === "Conflict") {
          setErrorTitle("ユーザ名重複");
          setErrorMessage(
            "そのユーザ名は既に使用されています。\n別のユーザ名をご使用ください。"
          );
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
    </div>
  );
}

export default UserRegister;
