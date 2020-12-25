import { useState } from "react";
import { useRouter } from "next/router";
import { MarkdownEditor } from "../../components/MarkdownEditor";
import { Button, Container } from "@chakra-ui/react";
import { useApi } from "../../hooks/useApi";
import { BlogCreate } from "../../openapi/api";
import { Error } from "../../components/Error";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("test");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { api } = useApi();
  const router = useRouter();

  const DisplayError = () => {
    if (error) {
      return <Error error={error} setError={setError} />;
    } else {
      return null;
    }
  };

  const handleOnSubmit = async () => {
    setLoading(true);
    const inputData: BlogCreate = { title: title, content: markdown };
    try {
      const response = await api.createBlogBlogsPost(inputData);
      setLoading(false);
      if (response.status !== 201) {
        setError("failed to post blog");
      }
      router.push("/");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Container mt="100px">
        <DisplayError />
        <MarkdownEditor
          title={title}
          setTitle={setTitle}
          markdown={markdown}
          setMarkdown={setMarkdown}
        />
        <Button colorScheme="blue" isLoading={loading} onClick={handleOnSubmit}>
          Save
        </Button>
      </Container>
    </>
  );
};

export default Editor;
