import { Input } from "@/components/ui/input";
import { DataChangeProp } from "@/types/travelGuide";
import { useEffect, useState } from "react";

// タイトル入力コンポーネント
function TitleRegister({ onDataChange }: DataChangeProp<string>) {
  // タイトル
  const [title, setTitle] = useState<string>("");

  // タイトルを親コンポーネントに設定
  useEffect(() => {
    onDataChange(title);
  }, [title, onDataChange]);

  return (
    <div className="p-1">
      <div className="text-4xl font-semibold mb-4 font-mono">タイトル</div>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
    </div>
  );
}

export default TitleRegister;
