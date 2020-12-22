import ReactDOMServer from "react-dom/server";
import { useState } from "react";
import SimpleMED from "react-simplemde-editor";
import SyntaxHighlightRenderer from "../posts/[title]";
import ReactMarkdown from "react-markdown";

const Editor = () => {
  const [markdown, setMarkdown] = useState("test");
  return (
    <>
      <SimpleMED
        value={markdown}
        onChange={(e) => setMarkdown(e)}
        options={{
          previewRender(text) {
            return ReactDOMServer.renderToString(
              <ReactMarkdown
                source={text}
                renderers={{ code: SyntaxHighlightRenderer }}
              />
            );
          },
        }}
      />
    </>
  );
};

export default Editor;
