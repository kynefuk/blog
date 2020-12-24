import ReactDOMServer from "react-dom/server";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import { Input } from "@chakra-ui/react";
import "easymde/dist/easymde.min.css";
import "react-markdown-editor-lite/lib/index.css";
import { SyntaxHighlightRenderer } from "../Markdown/index";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

export interface MarkdownEditorProps {
  title: string;
  markdown: string;
  setTitle: (title: string) => void;
  setMarkdown: (markdown: string) => void;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  title,
  markdown,
  setTitle,
  setMarkdown,
}) => {
  return (
    <>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <MdEditor
        renderHTML={(text) => {
          return ReactDOMServer.renderToString(
            <ReactMarkdown
              source={text}
              renderers={{
                CodeBlock: SyntaxHighlightRenderer,
                Code: SyntaxHighlightRenderer,
              }}
            />
          );
        }}
        onChange={(e) => setMarkdown(e.text)}
      />
    </>
  );
};
