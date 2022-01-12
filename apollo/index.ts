import {
  ApolloClient,
  ApolloLink,
  // createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { store } from "../redux/store";
import { baseUrl } from "../utils/baseUrl";
import { tokenRefreshLink } from "./tokenRefreshLink";
import { createUploadLink } from "apollo-upload-client";
// import { RetryLink } from "@apollo/client/link/retry";

// const NetwworkErrorRetryLink = new RetryLink();

const httpLink = createUploadLink({
  uri: `${baseUrl}graphql`,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage
  const token = store.getState().auth._id;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  // uri: baseUrl,
  cache: new InMemoryCache(),
  //  Pass the credentials option e.g. credentials: 'same-origin'
  // if your backend server is the same domain, as shown below, or else credentials: 'include'
  // if your backend is a different domain.
  link: ApolloLink.from([
    tokenRefreshLink,
    authLink,
    httpLink,
    // NetwworkErrorRetryLink,
  ]),
  // link: authLink.concat(httpLink),
});

export default client;
