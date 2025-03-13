import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card } from "@mantine/core";
import { MarkdownViewerProps } from "../../types/types-interfaces";


export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <Card p="sm" style={{ whiteSpace: "pre-wrap", cursor: "pointer" }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Card>
  );
}
