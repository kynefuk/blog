import "../styles/globals.css";
import { AppProps } from "next/app";
import { CSSReset } from "@chakra-ui/react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Head from "next/head";

import Amplify from "aws-amplify";

Amplify.configure({
  Auth: {
    region: "ap-northeast-1",
    // identityPoolId: process.env.NEXT_PUBLIC_ID_POOL_ID,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    authenticationFlowType: "USER_SRP_AUTH",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CSSReset />
      <Head>
        <title>My Blog</title>
      </Head>
      <Container maxWidth="xl" centerContent>
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  );
}

export default MyApp;
