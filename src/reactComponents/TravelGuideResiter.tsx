import { Card, CardContent } from "@/components/ui/card";
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
function TravelGuideResiter() {
  return (
    <div>
      <Carousel className="w-9/12 ml-28">
        <CarouselContent>
          <CarouselItem>
            <DestinationRegister />
          </CarouselItem>
          <CarouselItem>
            <ItemsRegister />
          </CarouselItem>
          <CarouselItem>
            <ScheduleRegister />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default TravelGuideResiter;
