import { GetStaticProps, GetStaticPaths } from "next";
import { Blog } from "../../openapi/api";
import { Container, Heading } from "@chakra-ui/react";
import { getAllBlog, getBlog } from "../../lib/getStatic";
import { Markdown } from "../../components/Markdown";
import { useBlogListContext } from "../../contexts/blog";

const Post: React.FC<Blog> = (props: Blog) => {
  return (
    <Container mt="100px">
      <Heading as="h1" size="4xl" mb="20px">
        {props.title}
      </Heading>
      <Markdown content={props.content} />
    </Container>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllBlog();

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const blogTitle = ctx.params?.title as string;
  const data = await getBlog(blogTitle);
  return {
    props: data,
  };
};
