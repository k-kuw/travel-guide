import { Destination, Item, Schedule } from "@/types/travelGuide";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import checkbox from "../assets/checkbox_unchecked.png";
import TravelGuideMap from "./TravelGuideMap";

type GuideDetail = {
  title: string;
  destinations: Destination[];
  belongings: Item[];
  schedules: Schedule[];
};

function TravelGuideDetail() {
  const { guideId } = useParams();
  const navigator = useNavigate();
  const [guideDetail, setGuideDetail] = useState<GuideDetail>();
  const [printColor, setPrintColor] = useState<string>("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/guides/search/${guideId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setGuideDetail(data);
      })
      .catch((error) => {
        if (error.message === "Unauthorized") {
          navigator("/login");
        }
      });
  }, []);

  return (
    <div>
      <div
        className="md:flex text-center print-flex pt-2 border-4 no-print-border print-size"
        style={{ backgroundColor: printColor }}
      >
        <div className="flex-auto md:w-1/2 mx-4 half-width">
          <div className="mb-2 border-2">
            <p className="font-semibold">タイトル</p>
            <p className="text-4xl font-semibold">{guideDetail?.title}</p>
          </div>
          <div className="my-2 border-2">
            <p className="font-semibold">目的地</p>
            {guideDetail?.destinations.map((destination) => {
              return (
                <p key={destination.name} className="text-left ml-4">
                  {destination.name}
                </p>
              );
            })}
          </div>
          <div className="my-2 border-2">
            <p className="font-semibold">持ち物</p>
            {guideDetail?.belongings.map((item) => {
              return (
                <p key={item.name} className="flex ml-4">
                  <img src={checkbox} alt="checkbox" className="h-6"></img>
                  {item.name}
                </p>
              );
            })}
          </div>
        </div>
        <div className="flex-auto md:w-1/2 mx-4 half-width">
          <div className="my-2 border-2">
            <p className="font-semibold">スケジュール</p>
            {guideDetail?.schedules.map((schedule) => {
              return (
                <p key={schedule.time}>
                  {schedule.time} {schedule.place} {schedule.activity}{" "}
                  {schedule.note}
                </p>
              );
            })}
          </div>
          <div className="my-2 self-center">
            {guideDetail && (
              <TravelGuideMap destinations={guideDetail.destinations} />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center no-print">
        <label className="self-center mt-4">色設定：</label>
        <select
          defaultValue=""
          className="mt-4 mr-8 border w-20"
          onChange={(e) => setPrintColor(e.target.value)}
        >
          <option value="" className=""></option>
          <option value="rgb(255,105,180)">赤色</option>
          <option value="rgb(175,238,238)">青色</option>
          <option value="rgb(152,251,152)">緑色</option>
        </select>
        <button
          onClick={() => {
            window.print();
          }}
          className="mt-4 border"
        >
          <span>印刷</span>
        </button>
      </div>
    </div>
  );
}

export default TravelGuideDetail;
