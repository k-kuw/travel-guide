import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Destination, Item, Schedule } from "@/types/travelGuide";
type Props = {
  destinationData: Destination[];
  itemData: Item[];
  scheduleData: Schedule[];
};

function RegisterConfirmation(props: Props) {
  const { destinationData, itemData, scheduleData } = props;
  return (
    <div>
      <div>
        <Label>目的地</Label>
        {destinationData.map((dest) => (
          <div key={dest.id}>
            <div>{dest.name}</div>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <div>
        <Label>持ち物</Label>
        {itemData.map((item) => (
          <div key={item.id}>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <div>
        <Label>スケジュール</Label>
        {scheduleData.map((schedule) => (
          <div key={schedule.id}>
            <div>{schedule.time}</div>
            <div>{schedule.place}</div>
            <div>{schedule.activity}</div>
            <div>{schedule.note}</div>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <Button>しおりを保存する</Button>
    </div>
  );
}

export default RegisterConfirmation;
