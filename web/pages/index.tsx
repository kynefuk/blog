import React from "react";
import Link from "next/link";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { Text, Heading, VStack, StackDivider } from "@chakra-ui/react";
import { Blog } from "../openapi/api";
import { BASE_PATH } from "../openapi/base";
import toDate from "../lib/date-util";
import { useRequest } from "../lib/fetcher";

const Home = () => {
  const { response, error } = useRequest<Blog[]>({
    url: `${BASE_PATH}/blogs`,
    method: "GET",
  });
  if (error) {
    console.log(error);
    return <h1> Error </h1>;
  }
  if (!response) {
    return <h1>Loading...</h1>;
  }

  const blogs = response.data;
  return (
    <AmplifyAuthenticator>
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
    </AmplifyAuthenticator>
  );
};

export default Home;

// export const getStaticProps = async () => {
//   const api = new DefaultApi();
//   const response = await api.listBlogBlogsGet();
//   // const response = useRequest<Blog[]>({
//   //   url: `${BASE_PATH}/blogs`,
//   //   method: "GET",
//   // });

//   return {
//     props: { response },
//   };
// };
