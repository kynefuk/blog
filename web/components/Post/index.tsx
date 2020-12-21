import { Blog } from "../../openapi/api";
import { Container, Heading } from "@chakra-ui/react";

export const Post: React.FC<Blog> = (blog: Blog) => {
  return (
    <Container>
      <Heading>{blog.title}</Heading>
      {blog.content}
    </Container>
  );
};
