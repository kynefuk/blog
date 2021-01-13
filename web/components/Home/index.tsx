import React from "react";
import Link from "next/link";
import { Text, Heading, VStack, StackDivider, Button } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import toDate from "../../lib/date-util";
import { useRouter } from "next/router";
import { useApi } from "../../hooks/useApi";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { dataFetchContextType } from "../../contexts/dataFetch";
import { DataFetchActionType } from "../../reducers/dataFetch";
import { BlogListActionType } from "../../reducers/blogList";
import { useRootContext } from "../../contexts/root";

const Home = () => {
  const { blogs, dispatchBlogList, dispatchDataFetch } = useRootContext();
  const { api } = useApi();
  const { isLoggedIn } = useIsLoggedIn();
  const router = useRouter();

  const handleOnEditClick = () => {
    router.push("/");
  };

  const handleOnDeleteClick = async (title: string) => {
    try {
      dispatchDataFetch({
        type: DataFetchActionType.FETCH_INIT,
        payload: {
          isLoading: true,
          status: "success",
          message: "",
        } as dataFetchContextType,
      });
      const response = await api.deleteBlogBlogBlogTitleDelete(title);
      if (response.status !== 204) {
        dispatchDataFetch({
          type: DataFetchActionType.FETCH_ERROR,
          payload: {
            isLoading: false,
            status: "error",
            message: "failed to delete blog!!!",
          } as dataFetchContextType,
        });
      }
      dispatchDataFetch({
        type: DataFetchActionType.FETCH_SUCCESS,
        payload: {
          isLoading: false,
          status: "success",
          message: "success to delete blog!!!",
        } as dataFetchContextType,
      });
      dispatchBlogList({
        type: BlogListActionType.DELETE,
        payload: title,
      });
    } catch (err) {
      console.log(err);
    } finally {
      dispatchDataFetch({
        type: DataFetchActionType.FETCH_SUCCESS,
        payload: {
          isLoading: false,
          status: "success",
          message: "success to delete blog!!!",
        } as dataFetchContextType,
      });
    }
  };

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
