import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Text, Heading, VStack, StackDivider, Button } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Blog } from "../openapi/api";
import { BASE_PATH } from "../openapi/base";
import toDate from "../lib/date-util";
import { useRequest } from "../lib/fetcher";
import { Message, AlertStatus } from "../components/Message";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useApi } from "../hooks/useApi";
import { Loading } from "../components/Loading";

const Home = () => {
  const { response, error } = useRequest<Blog[]>({
    url: `${BASE_PATH}/blogs`,
    method: "GET",
  });
  const { api } = useApi();
  const [message, setMessage] = useState({ status: "info", message: "" });
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

  const handleOnDeleteClick = async (title: string) => {
    try {
      const response = await api.deleteBlogBlogBlogTitleDelete(title);
      if (response.status !== 204) {
        console.log(message);
      }
      setMessage({ status: "success", message: "success to delete blog!!!" });
    } catch (err) {
      console.log(err);
    }
  };

  if (error) {
    return (
      <Message
        status={message.status as AlertStatus}
        message={message.message}
        setMessage={setMessage}
      />
    );
  }
  if (!response) {
    return <Loading />;
  }

  const blogs = response.data;
  return (
    <>
      {message.message ? (
        <Message
          status={message.status as AlertStatus}
          message={message.message}
          setMessage={setMessage}
        />
      ) : (
        <></>
      )}
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
                <Link href={`/posts/${encodeURIComponent(blog.title)}`}>
                  {blog.title}
                </Link>
              </Heading>
              <Text size="sm" color="GrayText" mt="5px">
                {toDate(blog.created)}
              </Text>
              {isLoggedIn ? (
                <div style={{ display: "inline" }}>
                  <Button
                    colorScheme="teal"
                    rightIcon={<EditIcon />}
                    onClick={handleOnEditClick}
                    m="1"
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="teal"
                    rightIcon={<DeleteIcon />}
                    onClick={() => handleOnDeleteClick(blog.title)}
                    m="1"
                  >
                    Delete
                  </Button>
                </div>
              ) : null}
            </React.Fragment>
          ))}
        </VStack>
      ) : (
        <h1>ブログがありません</h1>
      )}
    </>
  );
};

export default Home;
