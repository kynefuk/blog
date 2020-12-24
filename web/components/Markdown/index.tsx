import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/cjs/styles/prism/prism";

export interface SyntaxHighlighterProps {
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

export const Markdown: React.FC<{ content: string }> = ({ content }) => {
  return (
    <ReactMarkdown
      source={content}
      renderers={{ code: SyntaxHighlightRenderer }}
    />
  );
};
