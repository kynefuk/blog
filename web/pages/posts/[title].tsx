import { GetStaticProps, GetStaticPaths } from "next";
import { Blog } from "../../openapi/api";
import { Container, Heading } from "@chakra-ui/react";
import { getAllBlog, getBlog } from "../../lib/getStatic";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/cjs/styles/prism/prism";

interface SyntaxHighlighterProps {
  value: string;
  language: string;
}

export const SyntaxHighlightRenderer: React.FC<SyntaxHighlighterProps> = ({
  value,
  language,
}) => {
  return (
    <SyntaxHighlighter language={language} style={prism}>
      {value}
    </SyntaxHighlighter>
  );
};

const Post: React.FC<Blog> = (props: Blog) => {
  return (
    <Container mt="100px">
      <Heading as="h1" size="4xl" mb="20px">
        {props.title}
      </Heading>
      <ReactMarkdown
        source={props.content}
        renderers={{ code: SyntaxHighlightRenderer }}
      />
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
