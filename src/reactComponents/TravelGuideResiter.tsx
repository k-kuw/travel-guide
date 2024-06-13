import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DestinationRegister from "./DestinationRegister";
import ItemsRegister from "./ItemsRegister";
import ScheduleRegister from "./ScheduleRegister";
import { useState } from "react";
import { Destination, Item, Schedule } from "@/types/travelGuide";
import RegisterConfirmation from "./RegisterConfirmation";
function TravelGuideResiter() {
  const [destinationData, setDestinationData] = useState<Destination[]>([]);
  const [itemData, setItemData] = useState<Item[]>([]);
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);

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
            <DestinationRegister onDataChange={handleDestinationData} />
          </CarouselItem>
          <CarouselItem>
            <ItemsRegister onDataChange={handleItemData} />
          </CarouselItem>
          <CarouselItem>
            <ScheduleRegister onDataChange={handleScheduleData} />
          </CarouselItem>
          <CarouselItem>
            <RegisterConfirmation
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
