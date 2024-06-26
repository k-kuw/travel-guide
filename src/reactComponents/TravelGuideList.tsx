import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Guide = {
  id: string;
  title: string;
};

function TravelGuideList() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const navigator = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/guides/search", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setGuides(data);
      })
      .catch((error) => {
        if (error.message === "Unauthorized") {
          navigator("/login");
        }
      });
  }, []);
  return (
    <ul className="list-disc p-1" style={{ margin: "0 25vw" }}>
      {guides.map((guide) => (
        <li key={guide.id} className="text-lg mt-3">
          <Link to={`/travel-guide/${guide.id}`}>{guide.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default TravelGuideList;
