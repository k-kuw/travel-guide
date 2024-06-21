import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Destination, Item, Schedule } from "@/types/travelGuide";
import { useNavigate } from "react-router-dom";
type Props = {
  titleData: string;
  destinationData: Destination[];
  itemData: Item[];
  scheduleData: Schedule[];
};

function RegisterConfirmation(props: Props) {
  const { titleData, destinationData, itemData, scheduleData } = props;

  const navigate = useNavigate();

  function registerGuide() {
    console.log(titleData, itemData, scheduleData);
    const params = {
      username: localStorage.getItem("username"),
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
        console.log(data);
        navigate("/travel-guide-list");
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
        <table className="table-fixed w-full text-left break-all">
          <thead className="border-b-2">
            <tr>
              <th>時間</th>
              <th>場所</th>
              <th>活動</th>
              <th>備考</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((schedule) => (
              <tr key={schedule.time}>
                <td>{schedule.time}</td>
                <td>{schedule.place}</td>
                <td>{schedule.activity}</td>
                <td>{schedule.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Separator className="my-4" />
      <Button type="button" className="w-full mt-5" onClick={registerGuide}>
        しおりを保存する
      </Button>
    </div>
  );
}

export default RegisterConfirmation;
