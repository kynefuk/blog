import { useState } from "react";
import { useRouter } from "next/router";
import { MarkdownEditor } from "../../components/MarkdownEditor";
import { Button, Container, FormControl } from "@chakra-ui/react";
import { useApi } from "../../hooks/useApi";
import { BlogCreate } from "../../openapi/api";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("test");
  const [loading, setLoading] = useState(false);
  const { api } = useApi();
  const router = useRouter();

  const handleOnSubmit = async () => {
    setLoading(true);
    const inputData: BlogCreate = { title: title, content: markdown };
    try {
      const response = await api.createBlogBlogsPost(inputData);
      setLoading(false);
      if (response.status !== 201) {
        console.log("failed to post blog");
      }
      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Container>
        <MarkdownEditor
          title={title}
          setTitle={setTitle}
          markdown={markdown}
          setMarkdown={setMarkdown}
        />
        <FormControl onSubmit={handleOnSubmit}>
          <Button
            colorScheme="blue"
            isLoading={loading}
            onClick={handleOnSubmit}
          >
            Save
          </Button>
        </FormControl>
      </Container>
    </>
  );
};

export default Editor;
