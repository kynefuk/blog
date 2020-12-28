import Link from "next/link";
import {
  Heading,
  Text,
  Box,
  Button,
  Container,
  Spacer,
  Flex,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerFooter,
  useDisclosure,
  DrawerContent,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import ColorToggle from "../ColorToggle/index";
import { GoMarkGithub } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex height="10" p="4">
        <Box>nam dev</Box>
        <Spacer />
        <Box mr="10">
          <Link href="https://github.com" passHref={true}>
            <a>
              <GoMarkGithub size="24" />
            </a>
          </Link>
        </Box>
        <Box>
          <ColorToggle />
        </Box>
        <Box onClick={onOpen}>
          <Button>Settings</Button>
          <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Hoge</DrawerHeader>
                <DrawerBody>
                  <ChakraLink href="/">
                    <AmplifySignOut />
                  </ChakraLink>
                </DrawerBody>
                <DrawerFooter>Footer</DrawerFooter>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Box>
      </Flex>

      <Container>
        <Box>
          <Heading textAlign="center" as="h1" size="4xl">
            nam dev
          </Heading>
          <Text fontSize="xs" pt="50px">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the s standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </Box>
      </Container>
    </>
  );
};

export default Header;
