// import React, { useEffect, useRef } from "react";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/dracula.css";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/addon/edit/closetag";
// import  "codemirror/addon/edit/closebrackets"
// import {CodeMirror} from "codemirror";
// import { ACTIONS } from "../Actions";  

// function Editor({ socketRef, roomId, onCodeChange }) {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     const initEditor = () => {
//       const editor = CodeMirror.fromTextArea(
//         document.getElementById("realtimeEditor"),
//         {
//           mode: { name: "javascript", json: true },
//           theme: "dracula",
//           autoCloseTags: true,
//           autoCloseBrackets: true,
//           lineNumbers: true,
//         }
//       );

//       editorRef.current = editor;

//       editor.setSize(null, "100%");
//       editorRef.current.on("change", (instance, changes) => {
//         const { origin } = changes;
//         const code = instance.getValue();
//         onCodeChange(code);
//         if (origin !== "setValue") {
//           socketRef.current.emit(ACTIONS.CODE_CHANGE, {
//             roomId,
//             code,
//           });
//         }
//       });

//       return () => {
//         socketRef.current.off(ACTIONS.CODE_CHANGE);
//       };
//     };

//     initEditor();
//   }, [onCodeChange, roomId, socketRef]);

//   useEffect(() => {
//     if (socketRef.current) {
//       socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
//         if (code !== null && editorRef.current.getValue() !== code) {
//           editorRef.current.setValue(code);
//         }
//       });
//     }
//     return () => {
//       socketRef.current.off(ACTIONS.CODE_CHANGE);
//     };
//   }, [socketRef]);

//   return (
//     <div style={{ height: "600px" }}>
//       <textarea id="realtimeEditor"></textarea>
//     </div>
//   );
// }

// export default Editor;

import React, { useEffect, useRef, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { ACTIONS } from '../Actions';

function Editor({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (!socketRef.current) return;

    const handleCodeChange = ({ code }) => {
      if (code !== null && editorRef.current && editorRef.current.getValue() !== code) {
        editorRef.current.setValue(code);
      }
    };

    socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
    };
  }, [socketRef]);

  const handleEditorChange = (value) => {
    onCodeChange(value);
    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
      roomId,
      code: value,
      language,
    });

    // Evaluate JavaScript code and display output
    if (language === 'javascript') {
      try {
        let capturedOutput = '';
        const originalConsoleLog = console.log;
        console.log = (...args) => {
          capturedOutput += args.join(' ') + '\n';
          originalConsoleLog(...args);
        };
        const result = eval(value);
        console.log = originalConsoleLog; // Restore original console.log
        setOutput(capturedOutput || (result !== undefined ? result.toString() : 'undefined'));
      } catch (error) {
        setOutput(error.message);
      }
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div style={{ backgroundColor: 'gray' }}>
      <select value={language} onChange={handleLanguageChange} style={{ backgroundColor: '#2563EB', color: 'white' }}>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="javascript">JavaScript</option>
      </select>
      <MonacoEditor
        width="100vw"
        height="505px"
        language={language}
        theme="vs-dark"
        onMount={(editor, monaco) => {
          editorRef.current = editor;
          editor.onDidChangeModelContent(() => handleEditorChange(editor.getValue()));
        }}
        options={{
          automaticLayout: true,
          minimap: {
            enabled: false,
          },
        }}
      />
      <div style={{ height: '200px', overflow: 'auto', padding: '10px', border: '1px solid #ccc', backgroundColor: 'gray', color: 'white' }}>
        <h4>Output:</h4>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default Editor;
