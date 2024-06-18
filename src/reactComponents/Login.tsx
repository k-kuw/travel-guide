import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  setLoginContext: React.Dispatch<React.SetStateAction<boolean>>;
};
function Login(props: Props) {
  const { setLoginContext } = props;
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    localStorage.clear();
    setLoginContext(false);
    const params = new URLSearchParams();
    params.append("username", nameRef.current!.value);
    params.append("password", passwordRef.current!.value);
    fetch("http://127.0.0.1:8000/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data, data.access_token);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("username", nameRef.current!.value);
        setLoginContext(true);
        navigate("/travel-guide-register");
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
    </div>
  );
}

export default Login;
