import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Destination } from "@/types/travelGuide";
import { ChangeEvent, useState } from "react";

function DestinationRegister() {
  const [destination, setDestination] = useState<string>("");
  const [destinationList, setDestinationList] = useState<Destination[]>([]);

  function hadleChangeDestination(e: ChangeEvent<HTMLInputElement>) {
    setDestination(e.target.value);
  }

  function onClickAddDistination() {
    if(destination === ""){
        return
    }
    const destInfo = {
      id: self.crypto.randomUUID(),
      name: destination,
      // lon:,緯度経度を追加する
      // lat:,
    };
    setDestinationList([...destinationList, destInfo]);
    setDestination('')
  }
  function handleDeleteDestination(id: string) {
    const newDestList = destinationList.filter((dest) => dest.id !== id);
    setDestinationList(newDestList);
  }
  return (
    <div className="p-1">
      <div>行き先登録</div>
      {destinationList.map((dest) => (
        <div key={dest.id}>
          {dest.name}
          <Button onClick={() => handleDeleteDestination(dest.id)}>削除</Button>
        </div>
      ))}
      <Input value={destination} onChange={(e) => hadleChangeDestination(e)} />
      <Button type="button" onClick={() => onClickAddDistination()}>
        行き先を追加
      </Button>
    </div>
  );
}

export default DestinationRegister;
