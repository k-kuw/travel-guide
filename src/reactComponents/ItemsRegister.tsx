import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Item, ItemslDataProps } from "@/types/travelGuide";
import { ChangeEvent, useEffect, useState } from "react";

function ItemsRegister({ onDataChange }:ItemslDataProps) {
  const [item, setItem] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [itemList, setItemList] = useState<Item[]>([]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setItem(e.target.value);
    }
  }

  useEffect(() => {
    onDataChange(itemList);
  }, [itemList, onDataChange]);

  function onClickAddItem() {
    if(item === ''){
        return
    }
    const newItemList = {
      id: self.crypto.randomUUID(),
      name: item,
    };
    setItemList([...itemList, newItemList]);
    setItem("");
  }

  function handleDelItem(id: string) {
    const newItemList = itemList.filter((item) => item.id !== id);
    setItemList(newItemList);
  }
  return (
    <div className="p-1">
      <div className="text-4xl font-semibold">持ち物登録</div>
      タイトル
      <Input name="title" value={title} onChange={(e) => handleChange(e)} />
      {itemList.map((item) => (
        <div key={item.id}>
          {item.name}
          <Button onClick={() => handleDelItem(item.id)}>削除</Button>
        </div>
      ))}
      持ち物
      <Input name="item" value={item} onChange={(e) => handleChange(e)} />
      <Button onClick={() => onClickAddItem()}>持ち物を追加する</Button>
    </div>
  );
}

export default ItemsRegister;
