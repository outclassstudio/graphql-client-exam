import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
    }
    allTweets {
      id
      text
    }
  }
`;

export default function Movies() {
  // const [movies, setMovies] = useState([]);
  // const client = useApolloClient();

  // useEffect(() => {
  //   client
  //     .query({
  //       query: gql`
  //         {
  //           allMovies {
  //             title
  //           }
  //         }
  //       `,
  //     })
  //     .then((result) => setMovies(result.data.allMovies));
  // }, [client]);
  const { data, loading, error } = useQuery(ALL_MOVIES);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Could not fetch :(</div>;
  }
  return (
    <ul>
      <h1>Movies</h1>
      {data.allMovies.map((el) => {
        return (
          <li key={el.id}>
            <Link to={`/movies/${el.id}`}>{el.title}</Link>
          </li>
        );
      })}
      <h1>Tweets</h1>
      {data.allTweets.map((el) => {
        return <li key={el.id}>{el.text}</li>;
      })}
    </ul>
  );

  // return (
  //   <div>
  //     {movies.map((movie) => {
  //       return <li key={movie.id}>{movie.title}</li>;
  //     })}
  //   </div>
  // );
}
