import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { MarkdownEditorProps } from "../../types/types-interfaces";


export default function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return <SimpleMDE value={value} onChange={onChange} />;
}
