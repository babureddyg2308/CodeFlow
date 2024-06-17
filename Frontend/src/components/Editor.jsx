// import React, { useEffect, useRef } from "react";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/dracula.css";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/addon/edit/closetag";
// import "codemirror/addon/edit/closebrackets"
// import CodeMirror from "codemirror";
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



// import React, { useEffect, useRef } from 'react';
// import MonacoEditor from 'react-monaco-editor';
// import { ACTIONS } from '../Actions';

// function Editor({ socketRef, roomId, onCodeChange }) {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     if (!socketRef.current) return;

//     const handleCodeChange = ({ code }) => {
//       if (code !== null && editorRef.current && editorRef.current.getValue() !== code) {
//         editorRef.current.setValue(code);
//       }
//     };

//     socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);

//     return () => {
//       socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
//     };
//   }, [socketRef, roomId]);

//   const editorDidMount = (editor, monaco) => {
//     editorRef.current = editor;
//     editor.onDidChangeModelContent(() => {
//       const value = editor.getValue();
//       onCodeChange(value);
//       socketRef.current.emit(ACTIONS.CODE_CHANGE, {
//         roomId,
//         code: value,
//       });
//     });
//   };

//   return (
//     <MonacoEditor
//       width="900px"
//       height="600px"
//       language="javascript"
//       theme="vs-dark"
//       editorDidMount={editorDidMount}
//       options={{
//         automaticLayout: true,
//         minimap: {
//           enabled: false,
//         },
//       }}
//     />
//   );
// }

// export default Editor;

// import React, { useEffect, useRef } from "react";
// import Editor from "@monaco-editor/react";
// import { ACTIONS } from "../Actions";

// function CodeEditor({ socketRef, roomId, onCodeChange }) {
//   const editorRef = useRef(null);

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

//   const handleEditorDidMount = (editor, monaco) => {
//     editorRef.current = editor;
    
//     editor.onDidChangeModelContent((event) => {
//       const code = editor.getValue();
//       onCodeChange(code);
//       socketRef.current.emit(ACTIONS.CODE_CHANGE, {
//         roomId,
//         code,
//       });
//     });
//   };

//   return (
//     <div style={{ height: "600px" }}>
//       <Editor
//         height="100%"
//         language="javascript"
//         theme="vs-dark"
//         onMount={handleEditorDidMount}
//       />
//     </div>
//   );
// }

// export default CodeEditor;
