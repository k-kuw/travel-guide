import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataChangeProp, Destination } from "@/types/travelGuide";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TravelGuideDialog from "./TravelGuideDialog";
import TravelGuideMap from "./TravelGuideMap";

type Props = {
  data: Destination[];
  onDataChange: DataChangeProp<Destination[]>;
};

// 目的地入力コンポーネント
function DestinationRegister(props: Props) {
  const { data, onDataChange } = props;
  // 目的地シーケンス番号
  const [destinationSeq, setDestinationSeq] = useState<number>(1);
  // 目的地
  const [destination, setDestination] = useState<string>("");
  // 目的地リスト
  const [destinationList, setDestinationList] = useState<Destination[]>(data);
  // 目的地検索エラーダイアログ表示
  const [openDialog, setOpenDialog] = useState(false);
  // 目的地検索エラー内容
  const [errorTitle, setErrorTitle] = useState("サーバーエラー");
  const [errorMessage, setErrorMessage] =
    useState("サーバーでエラーが発生しました。");

  const navigator = useNavigate();

  // 目的地リストを親コンポーネントに設定
  useEffect(() => {
    onDataChange(destinationList);
  }, [destinationList, onDataChange]);

  // 目的地追加処理
  function onClickAddDistination() {
    if (destination === "") {
      return;
    }
    const params = {
      name: destination,
    };
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_PATH}/map/search-address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const destInfo = {
          id: destinationSeq,
          name: destination,
          lon: data.lon || null,
          lat: data.lat || null,
        };
        setDestinationSeq(destinationSeq + 1);
        setDestinationList([...destinationList, destInfo]);
        setDestination("");
      })
      .catch((error) => {
        // 認証失敗時
        if (error.message === "Unauthorized") {
          navigator("/login");
        }
        // 地名の検索結果がなかった場合
        else if (error.message === "Not Found") {
          setErrorTitle("目的地不明");
          setErrorMessage(
            "目的地が見つかりませんでした。\n別の地名でお試しください。"
          );
        }
        // その他
        else {
          setErrorTitle("サーバーエラー");
          setErrorMessage("サーバーでエラーが発生しました。");
        }
        setOpenDialog(true);
      });
  }
  // 目的地削除処理
  function handleDeleteDestination(id: number) {
    const newDestList = destinationList.filter((dest) => dest.id !== id);
    setDestinationList(newDestList);
  }
  return (
    <div className="p-1">
      <div className="text-4xl font-semibold mb-4 font-mono">目的地</div>
      {destinationList.map((dest) => (
        <div key={dest.id}>
          {dest.name}
          <button
            onClick={() => handleDeleteDestination(dest.id!)}
            className="border text-white bg-black rounded px-2 ml-2 mb-1"
          >
            削除
          </button>
        </div>
      ))}
      <Input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <Button
        type="button"
        className="w-full my-5"
        onClick={() => onClickAddDistination()}
      >
        目的地を追加
      </Button>
      {destinationList.length !== 0 && (
        <TravelGuideMap destinations={destinationList} />
      )}
      <TravelGuideDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title={errorTitle}
        message={errorMessage}
      />
    </div>
  );
}

export default DestinationRegister;
