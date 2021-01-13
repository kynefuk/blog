import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isUserLoggedIn = async () => {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setLoggedIn(true);
      }
    };
    isUserLoggedIn();
  }, []);
  return { isLoggedIn };
};
