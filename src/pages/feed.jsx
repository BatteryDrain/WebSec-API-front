import { useEffect, useState } from "react";
import api from "@/api/api";

export default function Feed() {
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await api.get("/photos/feed");
        setData(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data || "Failed to fetch feed");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Photo Feed</h2>

      {loading && <p>Loading feed...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Feed Response:</h4>
          <p>{data}</p>
        </div>
      )}
    </div>
  );
}