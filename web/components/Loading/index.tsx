import { CircularProgress, Container } from "@chakra-ui/react";

export const LoadingComponent = () => {
  return (
    <Container textAlign="center" mt="100">
      <CircularProgress isIndeterminate color="green.300" size="120px" />
    </Container>
  );
};
