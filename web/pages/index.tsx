import { useEffect, useState, useMemo } from "react";
import { GetServerSideProps } from "next";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { withSSRContext, Auth } from "aws-amplify";
import { Box, Text, Heading, Stack } from "@chakra-ui/react";
import { DefaultApi, Blog } from "../openapi/api";
import useSWR from "swr";
import { apiResolver } from "next/dist/next-server/server/api-utils";

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
  const api = useMemo(() => {
    return new DefaultApi();
  }, []);
  //const { data, error } = useSWR("/blogs", api.listBlogBlogsGet);
  const [data, setBlogs] = useState<Blog[]>([]);
  useEffect(() => {
    const getBlogs = async () => {
      const response = await api.listBlogBlogsGet();
      if (response.data) {
        setBlogs(response.data);
      }
    };
    getBlogs();
  }, [api]);

  return (
    <>
      <Heading>nam dev</Heading>
      {data ? (
        <>
          {data.map((blog) => (
            <Stack spacing={8} key={blog.title}>
              <Box
                w="100%"
                maxW="lg"
                borderWidth="1px"
                borderRadius="lg"
                mt="10"
              >
                <Heading as="h2" textAlign="center">
                  {blog.title}
                </Heading>
                <Text align="center" isTruncated mt="10">
                  {blog.content}
                </Text>
              </Box>
            </Stack>
          ))}
        </>
      ) : (
        <h1>ブログがありません</h1>
      )}
    </>
  );
}

export default withAuthenticator(Home);
