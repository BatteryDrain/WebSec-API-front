import { useEffect, useState } from "react";
import { apiFetch } from "../api/apiClient";

export default function Feed() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await apiFetch({ url: "/photos/feed" });

        setData(res);

      } catch (err) {
        console.error(err);

        setError(err.data?.msg || err.message || "Failed to fetch feed");

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
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}