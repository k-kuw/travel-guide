import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Destination, Schedule, SchedulesDataProps } from "@/types/travelGuide";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  onDataChange: SchedulesDataProps["onDataChange"];
  destinationData: Destination[];
};

function ScheduleRegister(props: Props) {
  const { onDataChange, destinationData } = props;
  const [schedule, setSchedule] = useState<Schedule>({
    time: "",
    place: "",
    activity: "",
    note: "",
  });
  const [scheduleList, setScheduleList] = useState<Schedule[]>([]);

  function onChangeSchedule(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setSchedule((prevSchedule) => {
      let newSchedule = { ...prevSchedule };
      if (
        name === "time" ||
        name == "place" ||
        name === "activity" ||
        name === "note"
      ) {
        newSchedule[name] = value;
      }
      return newSchedule;
    });
  }

  const onClickAddSchedule = () => {
    setScheduleList((prevSchedules) => [...prevSchedules, schedule]);
    setSchedule({
      time: "",
      place: "",
      activity: "",
      note: "",
    });
  };

  useEffect(() => {
    onDataChange(scheduleList);
  }, [scheduleList, onDataChange]);

  function onClickDelSchedule(index: number) {
    setScheduleList((prevSchedules) => {
      const newSchedules = [...prevSchedules];
      newSchedules.splice(index, 1);
      return newSchedules;
    });
  }
  return (
    <div>
      <div className="text-4xl font-semibold mb-4 font-mono">スケジュール</div>
      <div className="w-full">
        <table className="table-fixed w-full text-left break-all bg-slate-100">
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
            {scheduleList.map((schedule, index) => (
              <tr key={schedule.time}>
                <td>{schedule.time}</td>
                <td>{schedule.place}</td>
                <td>{schedule.activity}</td>
                <td>{schedule.note}</td>
                <td>
                  <Button onClick={() => onClickDelSchedule(index)}>
                    削除
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ margin: "5vh 1vw" }}>
          <Label>時刻</Label>
          <Input
            name="time"
            type="datetime-local"
            value={schedule.time}
            onChange={(e) => onChangeSchedule(e)}
            className="mb-4"
          />
          <Label>場所</Label>
          <select
            name="place"
            className="block mb-4 w-full border h-10"
            onChange={(e) => onChangeSchedule(e)}
            defaultValue={""}
          >
            <option value=""></option>
            {destinationData &&
              destinationData.map((destination) => {
                return (
                  <option value={destination.name}>{destination.name}</option>
                );
              })}
          </select>
          <Label>活動内容</Label>
          <Textarea
            name="activity"
            value={schedule.activity}
            onChange={(e) => onChangeSchedule(e)}
            className="mb-4"
          />
          <Label>備考</Label>
          <Textarea
            name="note"
            value={schedule.note}
            onChange={(e) => onChangeSchedule(e)}
          />
        </div>
      </div>
      <Button onClick={onClickAddSchedule} className="w-full mt-5">
        スケジュールを追加
      </Button>
    </div>
  );
}

export default ScheduleRegister;
