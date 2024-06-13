import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Schedule, SchedulesDataProps } from "@/types/travelGuide";
import { ChangeEvent, useEffect, useState } from "react";

function ScheduleRegister({ onDataChange }: SchedulesDataProps) {
  const [schedule, setSchedule] = useState({
    time: "",
    place: "",
    activity: "",
    note: "",
  });
  const [scheduleList, setScheduleList] = useState<Schedule[]>([]);

  function onChangeShcedule(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [name]: value,
    }));
  }
  useEffect(() => {
    onDataChange(scheduleList);
  }, [scheduleList, onDataChange]);
  function onClickAddShcedule() {
    if (schedule.time === "" || schedule.place === "") {
      return;
    }
    const newList = {
      ...schedule,
      id: self.crypto.randomUUID(),
    };
    setScheduleList([...scheduleList, newList]);
    schedule.time = "";
    schedule.place = "";
    schedule.activity = "";
    schedule.note = "";
  }

  function onClickDelSchedule(id: string) {
    const newList = scheduleList.filter((schedule) => schedule.id !== id);
    setScheduleList(newList);
  }
  return (
    <div>
      <div className="text-4xl font-semibold">スケジュール登録</div>
      {scheduleList.length !== 0 && (
        <Table>
          <TableCaption>スケジュール</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>時刻</TableHead>
              <TableHead>場所</TableHead>
              <TableHead>活動内容</TableHead>
              <TableHead>備考</TableHead>
              <TableHead>削除</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduleList.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell className="font-medium">{schedule.time}</TableCell>
                <TableCell>{schedule.place}</TableCell>
                <TableCell>{schedule.activity}</TableCell>
                <TableCell className="text-right">{schedule.note}</TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => onClickDelSchedule(schedule.id)}>
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <div className="w-full">
        <div className="" style={{ margin: "5vh 1vw" }}>
          <Label>時刻</Label>
          <Input
            name="time"
            value={schedule.time}
            onChange={(e) => onChangeShcedule(e)}
          />
          <Label>場所</Label>
          <Input
            name="place"
            value={schedule.place}
            onChange={(e) => onChangeShcedule(e)}
          />
          <Label>活動内容</Label>
          <Textarea
            name="activity"
            value={schedule.activity}
            onChange={(e) => onChangeShcedule(e)}
          />
          <Label>備考</Label>
          <Textarea
            name="note"
            value={schedule.note}
            onChange={(e) => onChangeShcedule(e)}
          />
          <Button onClick={() => onClickAddShcedule()} className="w-full mt-5">
            スケジュールを追加
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleRegister;
