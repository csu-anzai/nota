import ApolloClient from "apollo-boost";
import { AUTH_KEY } from "../shared/constants/localStorageKeys";

const getApolloHeaders = () => {
  const authorization = localStorage.getItem(AUTH_KEY);
  if (!authorization) return null;
  return {
    authorization,
  };
}

const client = new ApolloClient({
  uri: "http://localhost:4007/graphql",
  headers: getApolloHeaders(),
});

// @ts-ignore
window.apollo = client;

export default client;