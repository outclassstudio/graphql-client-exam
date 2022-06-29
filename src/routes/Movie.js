import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      title
      id
      small_cover_image
    }
  }
`;

export default function Movie() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });
  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Could not recieve</div>;
  }
  return <div>{data.movie.title}</div>;
}
