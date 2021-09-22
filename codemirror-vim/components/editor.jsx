import React, { Component, useState } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/keymap/vim";
import data from "../dummydata";

const VimEditor = () => {
  const [vimode, setVimode] = useState("Normal");
  const [value, setValue] = useState(data[1].code);

  const handleVimode = (editor) => {
    if (
      editor.state.vim.insertMode === false &&
      editor.state.vim.visualMode === false
    ) {
      setVimode("Normal");
    } else if (
      editor.state.vim.visualMode === true &&
      editor.state.vim.insertMode === false
    ) {
      setVimode("Visual");
    } else {
      setVimode("Insert");
    }
  };

  return (
    <div>
      <CodeMirror
        value={value}
        options={{
          theme: "material-palenight",
          mode: "javascript",
          lineNumbers: true,
          keyMap: "vim",
        }}
        onKeyHandled={(editor, data, value) => handleVimode(editor)}
      />
      <div>{vimode}</div>
    </div>
  );
};

export default VimEditor;
