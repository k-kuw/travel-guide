
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
function TravelGuideResiter() {
  const [destinationData, setDestinationData] = useState<Destination[]>([]);
  const [itemData, setItemData] = useState<Item[]>([]);
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);

  const handleDestinationData = (data:Destination[]) => {
    setDestinationData(data);
  };

  const handleItemData = (data:Item[]) => {
    setItemData(data);
  };

  const handleScheduleData = (data:Schedule[]) => {
    setScheduleData(data);
  };

  return (
    <div>
      <Carousel className="w-9/12 ml-28">
        <CarouselContent>
          <CarouselItem>
            <DestinationRegister onDataChange={handleDestinationData}/>
          </CarouselItem>
          <CarouselItem>
            <ItemsRegister onDataChange={handleItemData}/>
          </CarouselItem>
          <CarouselItem>
            <ScheduleRegister onDataChange={handleScheduleData}/>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default TravelGuideResiter;
