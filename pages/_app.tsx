import { ApolloProvider } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { Router, useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import client from "../apollo";
// import FloatingWhatsApp from "react-floating-whatsapp";
import { Wrapper } from "../components/Wrapper";
import { store } from "../redux/store";
import "../styles/globals.css";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Bootstrap uses some only-client-side objects (window, document) to
    // handle events.On the other hand, Next.js renders the app on both the server -
    // side and client - side.There is no window, document on the server - side thus
    // you can see some error messages like the following: document is not defined
    // windows is not defiend
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap");
  }, []);

  useEffect(() => {
    Router.events.on("routeChangeComplete", () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  }, [router]);

  // useEffect(() => {

  //   const intervalId = setInterval(async () => {
  //     const token = store.getState().auth._id;
  //     // console.log("token :>> ", token);
  //     if (token) {
  //       try {
  //         const { exp } = jwtDecode<CustomJwtPayload>(token);

  //         if (exp) {
  //           if (Date.now() >= (exp - 10) * 1000) {
  //             let fetchRes = await fetch(`${baseHttpDomain}refresh-token`, {
  //               method: "POST",
  //               credentials: "include",
  //             });

  //             let resData = await fetchRes.json();

  //             let token = resData.access_token;
  //             // console.log("token2 :>> ", token);
  //             if (token) {
  //               store.dispatch(setToken(token));
  //             } else {
  //               store.dispatch(unsetToken());
  //               await router.push({
  //                 pathname: "/login",
  //                 query: {
  //                   next: router.pathname,
  //                   nextQuery: JSON.stringify(router.query),
  //                 },
  //               });
  //             }
  //           }
  //         }
  //       } catch (error) {
  //         // Logout the user
  //         store.dispatch(unsetToken());
  //         await router.push({
  //           pathname: "/login",
  //           query: {
  //             next: router.pathname,
  //             nextQuery: JSON.stringify(router.query),
  //           },
  //         });
  //         console.log("error :>> ", error);
  //       }
  //     }
  //     // You are guest or not logged in
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  // MAINTENANCE_MODE

  return (
    <ApolloProvider client={client}>
      {/* <div id="float-whatsapp-wrapper">
        <FloatingWhatsApp
          phoneNumber="+254799204524"
          accountName="Caradil"
          chatMessage="Hi, lets chat"
          darkMode={true}
          statusMessage="Typically replies within 5 minutes"
        />
      </div> */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {() => (
            <Wrapper>
              <Component {...pageProps} />
            </Wrapper>
          )}
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;
