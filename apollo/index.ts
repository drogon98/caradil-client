import { ApolloClient, ApolloLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import { setToken, unsetToken } from "../redux/authSlice";
import { store } from "../redux/store";
import { baseHttpDomain, baseWsDomain } from "../utils/baseDomain";
import { print } from "graphql";
import { createClient, Client } from "graphql-ws";
import {
  Operation,
  FetchResult,
  Observable,
  fromPromise,
} from "@apollo/client/core";

class GraphQLWsLink extends ApolloLink {
  constructor(private client: Client) {
    super();
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: sink.error.bind(sink),
        }
      );
    });
  }
}

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
  ? new GraphQLWsLink(
      createClient({
        url: `${baseWsDomain}graphql`,
        connectionParams: () => {
          return {
            Authorization: `Bearer ${store.getState().auth._id}`,
          };
        },
      })
    )
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

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (networkError) {
      // This error is thrown outside resolvers
      // In this case no data is returned
    }

    if (graphQLErrors) {
      // These errors are thrown inside resolvers
      // As there are many resolvers that might throw errors,this errors are stored in an array
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "UNAUTHENTICATED":
            // error code is set to UNAUTHENTICATED
            // when AuthenticationError thrown in resolver
            return fromPromise(
              fetch(`${baseHttpDomain}refresh-token`, {
                method: "POST",
                credentials: "include",
              })
                .then(async (res) => {
                  const data = await res.json();
                  console.log("data", data);
                  let token = data.access_token;

                  if (token) {
                    return token;
                  } else {
                    throw new Error("Invalid token from graphql operation!");
                  }
                })
                .catch((err) => {
                  // Should i clear or reset the store?
                  console.log(`err`, err);
                  // store.dispatch(unsetToken());
                  // let toRedirectTo = window.location.pathname;
                  // console.log("toRedirectTo", toRedirectTo);
                  // window.location.replace(`/login?next=${toRedirectTo}`);
                })
            )
              .filter((value) => {
                return Boolean(value);
              })
              .flatMap((accessToken) => {
                store.dispatch(setToken(accessToken));
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${accessToken}`,
                  },
                });
                // retry the request, returning the new observable
                return forward(operation);
              });
        }
      }
    }
  }
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  //  Pass the credentials option e.g. credentials: 'same-origin'
  // if your backend server is the same domain, as shown below, or else
  credentials: "include",
  // if your backend is a different domain.
  link: errorLink.concat(ApolloLink.from([authLink, splitLink])),
  ssrMode: true,
});

export default client;
