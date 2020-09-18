import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Head from "next/head";
import App, { Container } from "next/app";
import { AppProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
import Cookies from "js-cookie";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import ClientRouter from "../components/ClientRouter";

const client = new ApolloClient({
  fetchOptions: {
    credentials: "include",
  },
});

function MyAPP(props) {
  console.log("Hello World-------- ", new Date(Date.now()));
  console.log("props----", props);
  const { Component, pageProps } = props;
  const shopOrigin = Cookies.get("shopOrigin");
  return (
    <React.Fragment>
      <Head>
        <title>Sample App</title>
        <meta charSet="utf-8" />
      </Head>
    </React.Fragment>
  );
}

export default MyAPP;
