import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Guide = {
  id: string;
  title: string;
};

// しおり一覧コンポーネント
function TravelGuideList() {
  // しおり
  const [guides, setGuides] = useState<Guide[]>([]);
  const navigator = useNavigate();
  // しおり一覧取得
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_PATH}/guides/search`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setGuides(data);
      })
      .catch((error) => {
        // 認証失敗時
        if (error.message === "Unauthorized") {
          navigator("/login");
        }
      });
  }, []);

  // 印刷用画面遷移処理
  function openWindowForPrint(guideId: string) {
    window.open(`/travel-guide/${guideId}`);
  }
  return (
    <ul className="list-disc p-1" style={{ margin: "0 25vw" }}>
      {guides.map((guide) => (
        <li key={guide.id} className="text-lg mt-3">
          <button
            onClick={() => {
              openWindowForPrint(guide.id);
            }}
          >
            {guide.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TravelGuideList;
