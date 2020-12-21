import { GetStaticProps, GetStaticPaths } from "next";
import { Blog } from "../../openapi/api";
import { Container, Heading } from "@chakra-ui/react";

const Post: React.FC<Blog> = (blog: Blog) => {
  return (
    <Container>
      <Heading>{blog.title}</Heading>
      {blog.content}
    </Container>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = "hoge";
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = params;
};
