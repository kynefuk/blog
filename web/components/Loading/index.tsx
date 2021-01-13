import { CircularProgress } from "@chakra-ui/react";
import { useRootContext } from "../../contexts/root";

export const Loading = () => {
  const { dataFetch } = useRootContext();

  return (
    <>
      {dataFetch.isLoading && (
        <CircularProgress isIndeterminate color="green.300" />
      )}
    </>
  );
};
