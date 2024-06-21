import { Input } from "@/components/ui/input";
import { TitleDataProps } from "@/types/travelGuide";
import { ChangeEvent, useEffect, useState } from "react";

function TitleRegister({ onDataChange }: TitleDataProps) {
  const [title, setTitle] = useState<string>("");

  function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }
  useEffect(() => {
    onDataChange(title);
  }, [title, onDataChange]);

  return (
    <div className="p-1">
      <div className="text-4xl font-semibold mb-4 font-mono">タイトル</div>
      <Input value={title} onChange={(e) => handleChangeTitle(e)} />
    </div>
  );
}

export default TitleRegister;
