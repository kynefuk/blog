import { CircularProgress } from "@chakra-ui/react";
import { useDataFetchContext } from "../../contexts/dataFetch";

export const Loading = () => {
  const { isLoading } = useDataFetchContext();

  return (
    <>{isLoading && <CircularProgress isIndeterminate color="green.300" />}</>
  );
};
