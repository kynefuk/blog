import { Switch, useColorMode, Flex, Spacer } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ColorToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Flex>
        <Spacer />
        <Switch size="lg" mr="3px" onChange={toggleColorMode}></Switch>
        {colorMode === "light" ? (
          <MoonIcon boxSize="1.5em" />
        ) : (
          <SunIcon boxSize="1.5em" />
        )}
      </Flex>
    </>
  );
};

export default ColorToggle;
