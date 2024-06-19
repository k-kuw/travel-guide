import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Destination, DestinationsDataProps } from "@/types/travelGuide";
import { ChangeEvent, useEffect, useState } from "react";

function DestinationRegister({ onDataChange }: DestinationsDataProps) {
  const [destinationSeq, setDestinationSeq] = useState<number>(1);
  const [destination, setDestination] = useState<string>("");
  const [destinationList, setDestinationList] = useState<Destination[]>([]);

  function handleChangeDestination(e: ChangeEvent<HTMLInputElement>) {
    setDestination(e.target.value);
  }
  useEffect(() => {
    onDataChange(destinationList);
  }, [destinationList, onDataChange]);

  function onClickAddDistination() {
    if (destination === "") {
      return;
    }
    const params = {
      name: destination,
    };
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/map/search-address", {
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
        const destInfo = {
          id: destinationSeq,
          name: destination,
          lon: data.lon,
          lat: data.lat,
        };
        setDestinationSeq(destinationSeq + 1);
        setDestinationList([...destinationList, destInfo]);
        setDestination("");
      });
  }
  function handleDeleteDestination(id: number) {
    const newDestList = destinationList.filter((dest) => dest.id !== id);
    setDestinationList(newDestList);
  }
  return (
    <div className="p-1">
      <div className="text-4xl font-semibold">目的地</div>
      {destinationList.map((dest) => (
        <div key={dest.id}>
          {dest.name}
          <Button onClick={() => handleDeleteDestination(dest.id)}>削除</Button>
        </div>
      ))}
      <Input value={destination} onChange={(e) => handleChangeDestination(e)} />
      <Button
        type="button"
        className="w-full mt-5"
        onClick={() => onClickAddDistination()}
      >
        目的地を追加
      </Button>
    </div>
  );
}

export default DestinationRegister;
