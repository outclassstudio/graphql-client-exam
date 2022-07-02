import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      title
      id
      rating
      small_cover_image
      isLiked @client
    }
  }
`;

export default function Movie() {
  const { id } = useParams();
  const {
    data,
    loading,
    error,
    client: { cache },
  } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });
  console.log(data);

  //복습필수
  const onClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data.movie.isLiked,
      },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Could not recieve</div>;
  }
  return (
    <>
      <div>{data.movie.title}</div>
      <div>{data.movie?.rating}</div>
      <img src={data.movie?.small_cover_image} />
      <button onClick={onClick}>
        {data.movie?.isLiked ? "unlike" : "like"}
      </button>
    </>
  );
}
