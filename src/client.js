import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

//연결 테스트를 위한 코드
// client
//   .query({
//     query: gql`
//       {
//         allMovies {
//           title
//         }
//       }
//     `,
//   })
//   .then((data) => {
//     return console.log(data);
//   });

export default client;
