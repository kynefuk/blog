import Link from "next/link";
import { Heading, Text, Box, Container, SimpleGrid } from "@chakra-ui/react";
import ColorToggle from "../ColorToggle/index";
import { GoMarkGithub } from "react-icons/go";

const Header = () => {
  return (
    <>
      <SimpleGrid columns={4}>
        <Box>nam dev</Box>
        <Box>
          <Link href="https://github.com" passHref={true}>
            <a>
              <GoMarkGithub />
            </a>
          </Link>
        </Box>
        <Box></Box>
        <Box>
          <ColorToggle />
        </Box>
      </SimpleGrid>

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
