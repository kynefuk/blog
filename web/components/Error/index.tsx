import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

interface ErrorProps {
  error: string;
  setError: (errorString: string) => void;
}

export const Error = ({ error, setError }: ErrorProps) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={() => setError("")}
      />
    </Alert>
  );
};
