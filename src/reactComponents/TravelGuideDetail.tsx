import { Destination, Item, Schedule } from "@/types/travelGuide";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TravelGuideMap from "./TravelGuideMap";

type GuideDetail = {
  title: string;
  destinations: Destination[];
  belongings: Item[];
  schedules: Schedule[];
};

function TravelGuideDetail() {
  const { guideId } = useParams();
  const [guideDetail, setGuideDetail] = useState<GuideDetail>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://127.0.0.1:8000/guides/search/${guideId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGuideDetail(data);
      });
  }, []);

  return (
    <div>
      <div className="mb-4">
        <p className="font-semibold">タイトル</p>
        <p className="text-4xl font-semibold">{guideDetail?.title}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">目的地</p>
        {guideDetail?.destinations.map((destination) => {
          return <p key={destination.name}>{destination.name}</p>;
        })}
      </div>
      <div className="mb-4">
        <p className="font-semibold">持ち物</p>
        {guideDetail?.belongings.map((item) => {
          return <p key={item.name}>{item.name}</p>;
        })}
      </div>
      <div className="mb-4">
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
      <div>
        <TravelGuideMap />
      </div>
    </div>
  );
}

export default TravelGuideDetail;
