import "../styles/globals.css";
import { AppProps } from "next/app";
import { CSSReset } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

import Amplify, { Auth } from "aws-amplify";

Amplify.configure({
  Auth: {
    identityPoolId: "xxxx",
    region: "ap-northeast-1",
    userPoolId: "xxxx",
    userPoolWebClientId: "xxxx",
    authenticationFlowType: "USER_SRP_AUTH",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
