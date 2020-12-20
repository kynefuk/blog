import React from "react";
import Link from "next/link";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Text, Heading, VStack, StackDivider } from "@chakra-ui/react";
import { Blog } from "../openapi/api";
import { BASE_PATH } from "../openapi/base";
import useSWR from "swr";
import toDate from "../lib/date-util";
import { AxiosResponse } from "axios";

function Home() {
  const { data, error } = useSWR<AxiosResponse<Blog[]>>(`${BASE_PATH}/blogs`);
  if (error) {
    console.log(error);
    return <h1> Error </h1>;
  }
  if (!data) {
    return <h1>Loading...</h1>;
  }

  const blogs = data.data;
  return (
    <>
      {blogs ? (
        <VStack
          mt="50px"
          spacing={8}
          divider={<StackDivider borderColor="gray.200" />}
        >
          <Heading>Posts</Heading>
          {blogs.map((blog) => (
            <React.Fragment key={blog.title}>
              <Heading as="h3" size="md" textAlign="center">
                <Link href="/">{blog.title}</Link>
              </Heading>
              <Text size="sm" color="GrayText" mt="5px">
                {toDate(blog.created)}
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
