import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Text, Heading, VStack, StackDivider, Button } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Blog } from "../openapi/api";
import { BASE_PATH } from "../openapi/base";
import toDate from "../lib/date-util";
import { useRequest } from "../lib/fetcher";
import { Error } from "../components/Error";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

const Home = () => {
  const { response, error } = useRequest<Blog[]>({
    url: `${BASE_PATH}/blogs`,
    method: "GET",
  });
  const [err, setErr] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isUserLoggedIn = async () => {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setLoggedIn(true);
      }
    };
    isUserLoggedIn();
  }, []);

  const handleOnEditClick = () => {
    router.push("/");
  };

  const handleOnEditorClick = () => {
    router.push("/drafts/editor");
  };

  if (error) {
    return <Error error={err} setError={setErr} />;
  }
  if (!response) {
    return <h1>Loading...</h1>;
  }

  const blogs = response.data;
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
              {isLoggedIn ? (
                <Button
                  colorScheme="teal"
                  rightIcon={<EditIcon />}
                  onClick={handleOnEditClick}
                >
                  Edit
                </Button>
              ) : null}
            </React.Fragment>
          ))}
          <Button
            colorScheme="teal"
            rightIcon={<EditIcon />}
            onClick={handleOnEditorClick}
          >
            Editor
          </Button>
        </VStack>
      ) : (
        <h1>ブログがありません</h1>
      )}
    </>
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
