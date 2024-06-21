import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Item, ItemslDataProps } from "@/types/travelGuide";
import { useEffect, useState } from "react";

function ItemsRegister({ onDataChange }: ItemslDataProps) {
  const [item, setItem] = useState<string>("");
  const [itemSeq, setItemSeq] = useState<number>(1);
  const [itemList, setItemList] = useState<Item[]>([]);

  useEffect(() => {
    onDataChange(itemList);
  }, [itemList, onDataChange]);

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
          <Button onClick={() => handleDelItem(item.id)}>削除</Button>
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
