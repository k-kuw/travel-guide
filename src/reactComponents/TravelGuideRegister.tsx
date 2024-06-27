import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Destination, Item, Schedule } from "@/types/travelGuide";
import { useState } from "react";
import DestinationRegister from "./DestinationRegister";
import ItemsRegister from "./ItemsRegister";
import RegisterConfirmation from "./RegisterConfirmation";
import ScheduleRegister from "./ScheduleRegister";
import TitleRegister from "./TitleRegister";

// しおり登録親コンポーネント
function TravelGuideRegister() {
  // タイトル
  const [titleData, setTitleData] = useState<string>("");
  // 目的地
  const [destinationData, setDestinationData] = useState<Destination[]>([]);
  // 持ち物
  const [itemData, setItemData] = useState<Item[]>([]);
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
  const handleItemData = (data: Item[]) => {
    setItemData(data);
  };

  // スケジュール変更処理
  const handleScheduleData = (data: Schedule[]) => {
    setScheduleData(data);
  };

  return (
    <div className="w-full mt-5">
      <Carousel style={{ margin: "0 25vw" }}>
        <CarouselContent>
          <CarouselItem>
            <TitleRegister onDataChange={handleTitleData} />
          </CarouselItem>
          <CarouselItem>
            <DestinationRegister onDataChange={handleDestinationData} />
          </CarouselItem>
          <CarouselItem>
            <ItemsRegister onDataChange={handleItemData} />
          </CarouselItem>
          <CarouselItem>
            <ScheduleRegister
              onDataChange={handleScheduleData}
              destinationData={destinationData}
            />
          </CarouselItem>
          <CarouselItem>
            <RegisterConfirmation
              titleData={titleData}
              destinationData={destinationData}
              itemData={itemData}
              scheduleData={scheduleData}
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default TravelGuideRegister;
