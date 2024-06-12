import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChangeEvent, useState } from "react";
type Schedule ={
    id:string,
    time: string,
    place: string,
    activity: string,
    note: string,
}
function ScheduleRegister() {
  const [schedule, setSchedule] = useState({
    time: "",
    place: "",
    activity: "",
    note: "",
  });
  const [scheduleList,setScheduleList] = useState<Schedule[]>([])

  function onChangeShcedule(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [name]: value,
    }));
  }

  function onClickAddShcedule(){
    const newList ={
        ...schedule,
        id:self.crypto.randomUUID(),
    }
    setScheduleList([...scheduleList,newList])
  }

  function onClickDelSchedule(id:string){
    const newList = scheduleList.filter((schedule)=>schedule.id !== id)
    setScheduleList(newList)
  }
  return (
    <div>
      <div className="text-4xl font-semibold">スケジュール登録</div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>時刻</TableHead>
            <TableHead>場所</TableHead>
            <TableHead>活動内容</TableHead>
            <TableHead>備考</TableHead>
            <TableHead >削除</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduleList.map((schedule) => (
            <TableRow key={schedule.id}>
              <TableCell className="font-medium">{schedule.time}</TableCell>
              <TableCell>{schedule.place}</TableCell>
              <TableCell>{schedule.activity}</TableCell>
              <TableCell className="text-right">
                {schedule.note}
              </TableCell>
              <TableCell className="text-right">
                <Button onClick={()=>onClickDelSchedule(schedule.id)}>削除</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      時刻
      <Input
        name="time"
        value={schedule.time}
        onChange={(e) => onChangeShcedule(e)}
      />
      場所
      <Input
        name="place"
        value={schedule.place}
        onChange={(e) => onChangeShcedule(e)}
      />
      活動内容
      <Input
        type="textarea"
        name="activity"
        value={schedule.activity}
        onChange={(e) => onChangeShcedule(e)}
      />
      備考
      <Input
        type="textarea"
        name="note"
        value={schedule.note}
        onChange={(e) => onChangeShcedule(e)}
      />
      <Button onClick={()=>onClickAddShcedule()}>スケジュールを追加</Button>
    </div>
  );
}

export default ScheduleRegister;
