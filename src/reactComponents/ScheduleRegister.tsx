import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Schedule, SchedulesDataProps } from "@/types/travelGuide";
import { Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

function ScheduleRegister({ onDataChange }: SchedulesDataProps) {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      time: "",
      place: "",
      activity: "",
      note: "",
    },
  ]);

  function onChangeShcedule(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) {
    const { name, value } = e.target;
    setSchedules((prevSchedules) => {
      const newSchedules = [...prevSchedules];
      newSchedules[index] = {
        ...newSchedules[index],
        [name]: value,
      };
      return newSchedules;
    });
  }

  const onClickAddShcedule = () => {
    setSchedules((prevSchedules) => [
      ...prevSchedules,
      { time: "", place: "", activity: "", note: "" },
    ]);
  };

  useEffect(() => {
    onDataChange(schedules);
  }, [schedules, onDataChange]);

  function onClickDelSchedule(index: number) {
    setSchedules((prevSchedules) => {
      const newSchedules = [...prevSchedules];
      newSchedules.splice(index, 1);
      return newSchedules;
    });
  }
  return (
    <div>
      <div className="w-full">
        <Label>日にち</Label>
        <Input type="date" />
        {schedules.map((schedule, index) => (
          <div key={index} style={{ margin: "5vh 1vw" }}>
            <Label>時刻</Label>
            <Input
              name="time"
              value={schedule.time}
              onChange={(e) => onChangeShcedule(e, index)}
            />
            <Label>場所</Label>
            <Input
              name="place"
              value={schedule.place}
              onChange={(e) => onChangeShcedule(e, index)}
            />
            <Label>活動内容</Label>
            <Textarea
              name="activity"
              value={schedule.activity}
              onChange={(e) => onChangeShcedule(e, index)}
            />
            <Label>備考</Label>
            <Textarea
              name="note"
              value={schedule.note}
              onChange={(e) => onChangeShcedule(e, index)}
            />
            <Button onClick={() => onClickDelSchedule(index)}>
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={onClickAddShcedule} className="w-full mt-5">
        スケジュールを追加
      </Button>
    </div>
  );
}

export default ScheduleRegister;
