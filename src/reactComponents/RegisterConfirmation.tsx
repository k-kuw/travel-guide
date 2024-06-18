import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Destination, Item, Schedule } from "@/types/travelGuide";
type Props = {
  titleData: string;
  destinationData: Destination[];
  itemData: Item[];
  scheduleData: Schedule[];
};

function RegisterConfirmation(props: Props) {
  const { titleData, destinationData, itemData, scheduleData } = props;

  function registerGuide() {
    console.log(titleData, itemData, scheduleData);
    const params = {
      user_id: 1,
      title: titleData,
      destinations: destinationData,
      belongings: itemData,
      schedules: scheduleData,
    };
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/guides/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data.access_token);
        console.log(data);
      });
  }

  return (
    <div>
      <div>
        <Label>タイトル</Label>
        <div>{titleData}</div>
      </div>
      <Separator className="my-4" />
      <div>
        <Label>目的地</Label>
        {destinationData.map((destination) => (
          <div key={destination.id}>
            <div>{destination.name}</div>
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
        {scheduleData.map((schedule, index) => (
          <div key={index}>
            <div>{schedule.time}</div>
            <div>{schedule.place}</div>
            <div>{schedule.activity}</div>
            <div>{schedule.note}</div>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <Button type="button" className="w-full mt-5" onClick={registerGuide}>
        しおりを保存する
      </Button>
    </div>
  );
}

export default RegisterConfirmation;
