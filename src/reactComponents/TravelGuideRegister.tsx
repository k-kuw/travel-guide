import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Belonging, Destination, Schedule } from "@/types/travelGuide";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BelongingsRegister from "./BelongingsRegister";
import DestinationRegister from "./DestinationRegister";
import RegisterConfirmation from "./RegisterConfirmation";
import ScheduleRegister from "./ScheduleRegister";
import TitleRegister from "./TitleRegister";

// しおり登録親コンポーネント
function TravelGuideRegister() {
  // 編集時は編集データを取得
  const location = useLocation();
  const editData = location.state;
  const { guideId } = useParams();

  // タイトル
  const [titleData, setTitleData] = useState<string>("");
  // 目的地
  const [destinationData, setDestinationData] = useState<Destination[]>([]);
  // 持ち物
  const [belongingData, setBelongingData] = useState<Belonging[]>([]);
  // スケジュール
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);

  // タイトル変更処理
  const handleTitleData = (data: string) => {
    setTitleData(data);
  };

  // 目的地変更処理
  const handleDestinationData = (data: Destination[]) => {
    setDestinationData(data);
  };

  // 持ち物変更処理
  const handleBelongingData = (data: Belonging[]) => {
    setBelongingData(data);
  };

  // スケジュール変更処理
  const handleScheduleData = (data: Schedule[]) => {
    setScheduleData(data);
  };

  return (
    <>
      <div className="w-full mt-5">
        <Carousel style={{ margin: "0 25vw" }}>
          <CarouselContent>
            <CarouselItem>
              <TitleRegister
                data={editData ? editData.title : ""}
                onDataChange={handleTitleData}
                key={guideId}
              />
            </CarouselItem>
            <CarouselItem>
              <DestinationRegister
                data={editData ? editData.destinations : []}
                onDataChange={handleDestinationData}
                key={guideId}
              />
            </CarouselItem>
            <CarouselItem>
              <BelongingsRegister
                data={editData ? editData.belongings : []}
                onDataChange={handleBelongingData}
                key={guideId}
              />
            </CarouselItem>
            <CarouselItem>
              <ScheduleRegister
                data={editData ? editData.schedules : []}
                onDataChange={handleScheduleData}
                destinationData={destinationData}
                key={guideId}
              />
            </CarouselItem>
            <CarouselItem>
              <RegisterConfirmation
                titleData={titleData}
                destinationData={destinationData}
                belongingData={belongingData}
                scheduleData={scheduleData}
                key={guideId}
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}

export default TravelGuideRegister;
