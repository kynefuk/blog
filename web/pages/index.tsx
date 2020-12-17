import { GetServerSideProps } from "next";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { withSSRContext, Auth } from "aws-amplify";
import { Box, Text } from "@chakra-ui/react";
import { DefaultApi } from "../openapi/api";
import useSWR from "swr";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const SSR = withSSRContext(context);
//   console.log(context);
//   try {
//     // const user = Auth.signIn();
//   } catch (error) {
//     console.log(error);
//   }
//   return {
//     props: {},
//   };
// };

function Home() {
  const api = new DefaultApi();
  const { data, error } = useSWR("/", api.listBlogBlogsGet);

  return (
    <>
      {data ? (
        <>
          {data.data.blogs?.map((blog) => {
            <Box w="100%" bg="tomato" color="white">
              <Text align="center">{blog.title}</Text>
            </Box>;
          })}
        </>
      ) : (
        <h1>ブログがありません</h1>
      )}
    </>
  );
}

export default withAuthenticator(Home);
