import { GuideDetail } from "@/types/travelGuide";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TravelGuideDialog from "./TravelGuideDialog";
import TravelGuideMap from "./TravelGuideMap";

// しおり詳細コンポーネント
function TravelGuideDetail() {
  // しおりID
  const { guideId } = useParams();
  const navigator = useNavigate();
  // しおり情報
  const [guideDetail, setGuideDetail] = useState<GuideDetail>();

  // トークン
  const token = localStorage.getItem("token");

  // エラーダイアログ表示
  const [openDialog, setOpenDialog] = useState(false);
  // しおり操作エラー内容
  const [errorTitle, setErrorTitle] = useState("サーバーエラー");
  const [errorMessage, setErrorMessage] =
    useState("サーバーでエラーが発生しました。");

  // しおり情報取得
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_PATH}/guides/search/${guideId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized");
          } else if (response.status === 404) {
            throw new Error("Not Found");
          } else {
            throw new Error();
          }
        }
        return response.json();
      })
      .then((data) => {
        setGuideDetail(data);
      })
      .catch((error) => {
        // 認証失敗時
        if (error.message === "Unauthorized") {
          navigator("/login");
        }
        // しおりの検索結果がなかった場合
        else if (error.message === "Not Found") {
          setErrorTitle("しおり不明");
          setErrorMessage("しおりが見つかりませんでした。");
        }
        // その他
        else {
          setErrorTitle("サーバーエラー");
          setErrorMessage("サーバーでエラーが発生しました。");
        }
      });
  }, []);

  // 印刷用画面遷移処理
  function openWindowForPrint(guideId: string) {
    window.open(`/travel-guide/print/${guideId}`);
  }

  // 編集ボタン押下時処理
  function onClickEdit() {
    navigator(`/travel-guide-register/${guideId}`, { state: guideDetail });
  }

  // 削除ボタン押下時処理
  function onClickDelete() {
    fetch(`${import.meta.env.VITE_API_PATH}/guides/delete/${guideId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized");
          } else if (response.status === 404) {
            throw new Error("Not Found");
          } else {
            throw new Error();
          }
        }
        navigator("/travel-guide-list");
      })
      .catch((error) => {
        // 認証失敗時
        if (error.message === "Unauthorized") {
          navigator("/login");
        }
        // しおりがなかった場合
        else if (error.message === "Not Found") {
          setErrorTitle("しおり不明");
          setErrorMessage("しおりが見つかりませんでした。");
        }
        // その他
        else {
          setErrorTitle("サーバーエラー");
          setErrorMessage("サーバーでエラーが発生しました。");
        }
      });
  }

  return (
    <>
      <div className="md:flex flex-row mx-32">
        <div className="md:basis-1/2">
          <div className="mt-4">
            <p className="font-semibold">タイトル：</p>
            <p className="text-4xl font-semibold">{guideDetail?.title}</p>
          </div>
          <div className="mt-4">
            <p className="font-semibold">目的地：</p>
            <ul className="list-disc ml-4">
              {guideDetail?.destinations.map((destination) => {
                return (
                  <li key={destination.name} className="text-left ml-4">
                    {destination.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-4">
            <p className="font-semibold">持ち物</p>
            <ul className="list-disc ml-4">
              {guideDetail?.belongings.map((belonging) => {
                return (
                  <li key={belonging.name} className="text-left ml-4">
                    {belonging.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="md:basis-1/2">
          <div className="mt-4">
            <p className="font-semibold">スケジュール：</p>
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
                {guideDetail?.schedules.map((schedule) => {
                  let formattedTime = new Date(schedule.time).toLocaleString();
                  formattedTime = formattedTime.slice(
                    0,
                    formattedTime.length - 3
                  );
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
          <div className="mt-4">
            <p className="font-semibold">マップ：</p>
            {guideDetail && (
              <TravelGuideMap destinations={guideDetail.destinations} />
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => {
            onClickEdit();
          }}
          className="border text-white bg-green-400 rounded px-2 mx-2"
        >
          編集
        </button>
        <button
          onClick={() => {
            onClickDelete();
          }}
          className="border text-white bg-red-400 rounded px-2 mx-2"
        >
          削除
        </button>
        <button
          onClick={() => {
            openWindowForPrint(guideId!);
          }}
          className="border text-white bg-black rounded px-2 mx-2"
        >
          印刷画面を開く
        </button>
      </div>
      <TravelGuideDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title={errorTitle}
        message={errorMessage}
      />
    </>
  );
}

export default TravelGuideDetail;
