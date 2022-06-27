import { gql, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const client = useApolloClient();

  useEffect(() => {
    client
      .query({
        query: gql`
          {
            allMovies {
              title
            }
          }
        `,
      })
      .then((result) => setMovies(result.data.allMovies));
  }, [client]);

  return (
    <div>
      {movies.map((movie) => {
        return <li key={movie.id}>{movie.title}</li>;
      })}
    </div>
  );
}
