import { useState } from "react";
import { useRouter } from "next/router";
import { MarkdownEditor } from "../../components/MarkdownEditor";
import { Button, Container } from "@chakra-ui/react";
import { useApi } from "../../hooks/useApi";
import { BlogCreate } from "../../openapi/api";
import { Message } from "../../components/Message";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("test");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { api } = useApi();
  const router = useRouter();

  const DisplayError = () => {
    if (message) {
      return <Message message={message} setMessage={setMessage} />;
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
        setMessage("failed to post blog");
      }
      router.push("/");
    } catch (err) {
      setMessage(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AmplifyAuthenticator>
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
    </AmplifyAuthenticator>
  );
};

export default Editor;
