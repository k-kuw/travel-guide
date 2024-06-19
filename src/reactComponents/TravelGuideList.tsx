import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Guide = {
  id: string;
  title: string;
};

function TravelGuideList() {
  const [guides, setGuides] = useState<Guide[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://127.0.0.1:8000/guides/search", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGuides(data);
      });
  }, []);
  return (
    <div>
      {guides.map((guide) => (
        <div key={guide.id}>
          <Link to={`/travel-guide/${guide.id}`}>{guide.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default TravelGuideList;
