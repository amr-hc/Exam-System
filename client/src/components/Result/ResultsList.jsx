import { useState, useEffect } from "react";
import { fetchResults } from "../../api";
import Spinner from "react-bootstrap/Spinner";

const ResultsList = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getResults = async () => {
      try {
        const data = await fetchResults();
        setResults(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getResults();
  }, []);

  if (loading) {
    return <Spinner animation="grow" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {results && results.length > 0 ? (
        <div>
          {results.map((result) => (
            <div className="exam-card" key={result.id}>
              <h6>{result.name}</h6>
              <p className="text-muted m-0">Score: {result.score}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ResultsList;
