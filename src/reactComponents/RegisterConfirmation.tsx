import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Belonging,
  Destination,
  RegisterGuide,
  Schedule,
} from "@/types/travelGuide";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TravelGuideDialog from "./TravelGuideDialog";
type Props = {
  titleData: string;
  destinationData: Destination[];
  belongingData: Belonging[];
  scheduleData: Schedule[];
};

// 登録内容確認コンポーネント
function RegisterConfirmation(props: Props) {
  // しおり入力データ
  const { titleData, destinationData, belongingData, scheduleData } = props;
  // 登録エラーダイアログ表示
  const [openDialog, setOpenDialog] = useState(false);
  // 登録エラー内容
  const [errorTitle, setErrorTitle] = useState("サーバーエラー");
  const [errorMessage, setErrorMessage] =
    useState("サーバーでエラーが発生しました。");

  const navigate = useNavigate();
  const { guideId } = useParams();

  // しおり登録処理
  function registerGuide() {
    // タイトル入力がなかった場合、処理を終了
    if (titleData === "") {
      setErrorTitle("入力不正");
      setErrorMessage(
        "入力が検知できませんでした。\nタイトルが入力されていることをご確認ください。"
      );
      setOpenDialog(true);
      return;
    }
    // 目的地のシーケンス番号を除いたものをパラメータに渡す
    const revisedDestinationData = destinationData.map((destination) => {
      delete destination.id;
      return destination;
    });
    const params: RegisterGuide = {
      username: localStorage.getItem("username") || "",
      title: titleData,
      destinations: revisedDestinationData,
      belongings: belongingData,
      schedules: scheduleData,
    };

    // 新規登録の場合
    let requestPath = "register";
    let requestMethod = "POST";
    // 更新の場合
    if (guideId) {
      params.id = parseInt(guideId);
      requestPath = "update";
      requestMethod = "PUT";
    }

    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_PATH}/guides/${requestPath}`, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    })
      .then((response) => {
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
      .then(() => {
        navigate("/travel-guide-list");
      })
      .catch((error) => {
        // タイトル入力不足時
        if (error.message === "Bad Request") {
          setErrorTitle("入力不正");
          setErrorMessage(
            "入力が検知できませんでした。\nタイトルが入力されていることをご確認ください。"
          );
        }
        // 認証失敗時
        else if (error.message === "Unauthorized") {
          setErrorTitle("ユーザ認証失敗");
          setErrorMessage(
            "ユーザ情報が取得できませんでした。\n再度ログインしてください。"
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

  return (
    <div>
      <div>
        <Label>タイトル</Label>
        <div>{titleData}</div>
      </div>
      <Separator className="my-4" />
      <div>
        <Label>目的地</Label>
        {destinationData.map((destination) => (
          <div key={destination.id}>
            <div>{destination.name}</div>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <div>
        <Label>持ち物</Label>
        {belongingData.map((belonging) => (
          <div key={belonging.id}>
            <div>{belonging.name}</div>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <div>
        <Label>スケジュール</Label>
        <table className="table-fixed w-full text-left break-all">
          <thead className="border-b-2">
            <tr>
              <th>時間</th>
              <th>場所</th>
              <th>活動</th>
              <th>備考</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((schedule) => {
              let formattedTime = "";
              if (schedule.time) {
                formattedTime = new Date(schedule.time).toLocaleString();
                formattedTime = formattedTime.slice(
                  0,
                  formattedTime.length - 3
                );
              }
              return (
                <tr key={schedule.time} className="align-top">
                  <td>{formattedTime}</td>
                  <td>{schedule.place}</td>
                  <td>{schedule.activity}</td>
                  <td>{schedule.note}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Separator className="my-4" />
      <Button type="button" className="w-full mt-5" onClick={registerGuide}>
        しおりを保存する
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

export default RegisterConfirmation;
