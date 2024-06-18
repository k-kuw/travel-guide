import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  function registUser(e: FormEvent<HTMLFormElement>) {
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
          console.log(response);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="p-1" style={{ margin: "0 25vw" }}>
      <form onSubmit={registUser}>
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
    </div>
  );
}

export default UserRegister;
