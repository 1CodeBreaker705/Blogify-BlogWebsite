import React from "react";
import MDEditor from '@uiw/react-md-editor';

export default function MarkdownEditor({value,setValue}) {
  return (
    <div data-color-mode="dark" className="container" >
      <MDEditor
        value={value}
        onChange={setValue}
        theme='dark'
        className="!bg-main"
        preview="edit" // 👈 removes the right-side preview
      />
    </div>
  );
}