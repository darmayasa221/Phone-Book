import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://wpe-hiring.tokopedia.net/graphql",
    fetch,
  }),
  cache: new InMemoryCache(),
});

export { apolloClient, gql };
