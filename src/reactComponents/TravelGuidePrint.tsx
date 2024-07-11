import { GuideDetail } from "@/types/travelGuide";
import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { useNavigate, useParams } from "react-router-dom";
import checkbox from "../assets/checkbox_unchecked.png";
import TravelGuideMap from "./TravelGuideMap";

// しおり印刷コンポーネント
function TravelGuidePrint() {
  // しおりID
  const { guideId } = useParams();
  const navigator = useNavigate();
  // しおり情報
  const [guideDetail, setGuideDetail] = useState<GuideDetail>();
  // 印刷カラー
  const [printColor, setPrintColor] = useState<string>("");

  // しおり情報取得
  useEffect(() => {
    const token = localStorage.getItem("token");
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
      });
  }, []);

  return (
    <>
      <div
        className="text-center print-div border-2 no-print-border"
        style={{
          backgroundColor: printColor,
          height: "794px",
          width: "1123px",
        }}
      >
        <Rnd default={{ x: 5, y: 0, width: "540px", height: "auto" }}>
          <div className="border-2">
            <p className="text-4xl font-semibold">{guideDetail?.title}</p>
          </div>
        </Rnd>
        <Rnd default={{ x: 5, y: 100, width: "540px", height: "auto" }}>
          <div className="border-2">
            <p className="font-semibold">目的地</p>
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
        </Rnd>
        <Rnd default={{ x: 5, y: 300, width: "540px", height: "auto" }}>
          <div className="border-2">
            <p className="font-semibold">持ち物</p>
            {guideDetail?.belongings.map((belonging) => {
              return (
                <p key={belonging.name} className="flex ml-4">
                  <img src={checkbox} alt="checkbox" className="h-6"></img>
                  {belonging.name}
                </p>
              );
            })}
          </div>
        </Rnd>
        <Rnd default={{ x: 575, y: 0, width: "540px", height: "auto" }}>
          <div className="border-2">
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
        </Rnd>
        <Rnd default={{ x: 575, y: 400, width: "540px", height: "auto" }}>
          <div className="self-center">
            {guideDetail && (
              <TravelGuideMap destinations={guideDetail.destinations} />
            )}
          </div>
        </Rnd>
      </div>
      <div className="flex justify-center no-print">
        <div className="mt-4">
          <label className="align-middle">色設定：</label>
          <input
            type="color"
            className="align-middle"
            onChange={(e) => setPrintColor(e.target.value)}
          />
          <button
            onClick={() => {
              window.print();
            }}
            className="border text-white bg-black rounded px-2 ml-4 align-middle"
          >
            印刷
          </button>
        </div>
      </div>
    </>
  );
}

export default TravelGuidePrint;
