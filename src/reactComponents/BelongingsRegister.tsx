import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Belonging, DataChangeProp } from "@/types/travelGuide";
import { useEffect, useState } from "react";

type Props = {
  data: Belonging[];
  onDataChange: DataChangeProp<Belonging[]>;
};

// 持ち物入力コンポーネント
function BelongingsRegister(props: Props) {
  const { data, onDataChange } = props;
  // 持ち物
  const [belonging, setBelonging] = useState<string>("");
  // 持ち物シーケンス番号
  const [belongingSeq, setBelongingSeq] = useState<number>(1);
  // 持ち物リスト
  const [belongingList, setBelongingList] = useState<Belonging[]>(data);

  // 持ち物リストを親コンポーネントに設定
  useEffect(() => {
    onDataChange(belongingList);
  }, [belongingList, onDataChange]);

  // 持ち物追加処理
  function onClickAddBelonging() {
    if (belonging === "") {
      return;
    }
    const newBelongingList = {
      id: belongingSeq,
      name: belonging,
    };
    setBelongingSeq(belongingSeq + 1);
    setBelongingList([...belongingList, newBelongingList]);
    setBelonging("");
  }

  // 持ち物削除処理
  function handleDelBelonging(id: number) {
    const newItemList = belongingList.filter((belonging) => belonging.id !== id);
    setBelongingList(newItemList);
  }
  return (
    <div className="p-1">
      <div className="text-4xl font-semibold mb-4 font-mono">持ち物</div>
      {belongingList.map((belonging) => (
        <div key={belonging.id}>
          {belonging.name}
          <button
            onClick={() => handleDelBelonging(belonging.id)}
            className="border text-white bg-black rounded px-2 ml-2 mb-1"
          >
            削除
          </button>
        </div>
      ))}
      持ち物
      <Input
        name="belonging"
        value={belonging}
        onChange={(e) => setBelonging(e.target.value)}
      />
      <Button className="w-full mt-5" onClick={() => onClickAddBelonging()}>
        持ち物を追加する
      </Button>
    </div>
  );
}

export default BelongingsRegister;
