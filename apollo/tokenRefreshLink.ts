import { ApolloLink } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { setToken } from "../redux/authSlice";
import { store } from "../redux/store";
import { baseUrl } from "../utils/baseUrl";
import { CustomJwtPayload } from "../utils/interfaces";

export const tokenRefreshLink = new ApolloLink((operation, forward) => {
  const token = store.getState().auth._id;

  // Make request to server to validate

  if (token) {
    try {
      const { exp } = jwtDecode<CustomJwtPayload>(token);
      // console.log("exp :>> ", exp);
      if (exp) {
        if (Date.now() >= exp * 1000) {
          fetch(`${baseUrl}refresh-token`, {
            method: "POST",
            credentials: "include",
          })
            .then(async (res) => {
              const data = await res.json();
              let token = data.access_token;
              if (token) {
                store.dispatch(setToken(token));
              } else {
                throw new Error("Invalid token from graphql operation!");
              }
            })
            .catch((err) => {
              console.log(`err`, err);
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return forward(operation);
});
