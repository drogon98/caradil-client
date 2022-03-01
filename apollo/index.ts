import {
  ApolloClient,
  ApolloLink,
  // createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { store } from "../redux/store";
import { baseHttpDomain, baseWsDomain } from "../utils/baseDomain";
import { tokenRefreshLink } from "./tokenRefreshLink";
import { onError } from "@apollo/client/link/error";

const httpLink = createUploadLink({
  uri: `${baseHttpDomain}graphql`,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = store.getState().auth._id;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const wsLink: any = process.browser
  ? new WebSocketLink({
      uri: `${baseWsDomain}subscriptions`,
      options: {
        reconnect: true,
        lazy: true,
        connectionParams: () => {
          return {
            authToken: `Bearer ${store.getState().auth._id}`,
          };
        },
      },
    })
  : null;

const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

const errorLink = onError((obj) => {
  console.log("obj", obj);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  //  Pass the credentials option e.g. credentials: 'same-origin'
  // if your backend server is the same domain, as shown below, or else credentials: 'include'
  // if your backend is a different domain.
  link: errorLink.concat(
    ApolloLink.from([tokenRefreshLink, authLink, splitLink])
  ),
  ssrMode: true,
  // link: authLink.concat(httpLink),
});

export default client;
