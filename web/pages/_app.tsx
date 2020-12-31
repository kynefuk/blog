import Head from "next/head";
import "../styles/globals.css";
import { AppProps } from "next/app";
import Amplify from "aws-amplify";
import { CSSReset } from "@chakra-ui/react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Header from "../components/Header";
import { SWRConfig } from "swr";
import axios from "axios";
import { MessageProvider } from "../context/message";

Amplify.configure({
  Auth: {
    region: "ap-northeast-1",
    // identityPoolId: process.env.NEXT_PUBLIC_ID_POOL_ID,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    authenticationFlowType: process.env.NEXT_AUTHENTICATION_FLOW_TYPE,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SWRConfig
        value={{
          fetcher: (url: string) => axios.get(url),
        }}
      >
        <CSSReset />
        <Head>
          <title>My Blog</title>
        </Head>
        <MessageProvider>
          <Container maxWidth="4xl">
            <Header />
            <Component {...pageProps} />
          </Container>
        </MessageProvider>
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
