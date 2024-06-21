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

function TravelGuideResiter() {
  const [titleData, setTitleData] = useState<string>("");
  const [destinationData, setDestinationData] = useState<Destination[]>([]);
  const [itemData, setItemData] = useState<Item[]>([]);
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);

  const handleTitleData = (data: string) => {
    setTitleData(data);
  };

  const handleDestinationData = (data: Destination[]) => {
    setDestinationData(data);
  };

  const handleItemData = (data: Item[]) => {
    setItemData(data);
  };

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

export default TravelGuideResiter;
