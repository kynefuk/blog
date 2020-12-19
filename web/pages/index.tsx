import React from "react";
import { useEffect, useState, useMemo } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { withSSRContext, Auth } from "aws-amplify";
import {
  Box,
  Text,
  Heading,
  Stack,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { DefaultApi, Blog } from "../openapi/api";
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
      {data ? (
        <VStack
          mt="50px"
          spacing={8}
          divider={<StackDivider borderColor="gray.200" />}
        >
          <Heading>Posts</Heading>
          {data.map((blog) => (
            <React.Fragment key={blog.title}>
              <Heading as="h3" size="md" textAlign="center">
                <Link href="/">{blog.title}</Link>
              </Heading>
              <Text size="sm" color="GrayText" mt="5px">
                {blog.created}
              </Text>
            </React.Fragment>
          ))}
        </VStack>
      ) : (
        <h1>ブログがありません</h1>
      )}
    </>
  );
}

export default withAuthenticator(Home);
