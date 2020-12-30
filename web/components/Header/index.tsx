import Link from "next/link";
import Image from "next/image";
import { Text, Box, Container, Spacer, Flex } from "@chakra-ui/react";
import ColorToggle from "../ColorToggle/index";
import { GoMarkGithub } from "react-icons/go";
import { ChevronRightIcon } from "@chakra-ui/icons";

const Header = () => {
  return (
    <>
      <Flex height="10" p="4">
        <Box>
          <Link href="/">
            <a>
              <Image src="/logo.ico" width={100} height={50} />
            </a>
          </Link>
        </Box>
        <Spacer />
        <Box mr="10">
          <a
            href="https://github.com/kynefuk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GoMarkGithub size="24" />
          </a>
        </Box>
        <Box mr="10">
          <Link href="/drafts/editor">
            <ChevronRightIcon />
          </Link>
        </Box>
        <Box>
          <ColorToggle />
        </Box>
      </Flex>

      <Container>
        <Box textAlign="center">
          <Text fontSize="s" pt="50px">
            技術ブログをなにか書きます。
          </Text>
        </Box>
      </Container>
    </>
  );
};

export default Header;
