import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataChangeProp, Item } from "@/types/travelGuide";
import { useEffect, useState } from "react";

// 持ち物入力コンポーネント
function ItemsRegister({ onDataChange }: DataChangeProp<Item[]>) {
  // 持ち物
  const [item, setItem] = useState<string>("");
  // 持ち物シーケンス番号
  const [itemSeq, setItemSeq] = useState<number>(1);
  // 持ち物リスト
  const [itemList, setItemList] = useState<Item[]>([]);

  // 持ち物リストを親コンポーネントに設定
  useEffect(() => {
    onDataChange(itemList);
  }, [itemList, onDataChange]);

  // 持ち物追加処理
  function onClickAddItem() {
    if (item === "") {
      return;
    }
    const newItemList = {
      id: itemSeq,
      name: item,
    };
    setItemSeq(itemSeq + 1);
    setItemList([...itemList, newItemList]);
    setItem("");
  }

  // 持ち物削除処理
  function handleDelItem(id: number) {
    const newItemList = itemList.filter((item) => item.id !== id);
    setItemList(newItemList);
  }
  return (
    <div className="p-1">
      <div className="text-4xl font-semibold mb-4 font-mono">持ち物</div>
      {itemList.map((item) => (
        <div key={item.id}>
          {item.name}
          <button
            onClick={() => handleDelItem(item.id)}
            className="border text-white bg-black rounded px-2 ml-2 mb-1"
          >
            削除
          </button>
        </div>
      ))}
      持ち物
      <Input
        name="item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <Button className="w-full mt-5" onClick={() => onClickAddItem()}>
        持ち物を追加する
      </Button>
    </div>
  );
}

export default ItemsRegister;
