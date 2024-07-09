import { Input } from "@/components/ui/input";
import { DataChangeProp } from "@/types/travelGuide";
import { useEffect, useState } from "react";

type Props = {
  data: string;
  onDataChange: DataChangeProp<string>;
};

// タイトル入力コンポーネント
function TitleRegister(props: Props) {
  const { data, onDataChange } = props;

  // タイトル
  const [title, setTitle] = useState<string>(data);

  // タイトルを親コンポーネントに設定
  useEffect(() => {
    onDataChange(title);
  }, [title, onDataChange]);

  return (
    <div className="p-1">
      <div className="text-4xl font-semibold mb-4 font-mono">タイトル</div>
      <Input defaultValue={title} onBlur={(e) => setTitle(e.target.value)} />
    </div>
  );
}

export default TitleRegister;
