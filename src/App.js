import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

function App() {
  const editor = useRef(null);

  const config = {
    uploader: {
      insertImageAsBase64URI: false,
      imagesExtensions: ["jpg", "png", "jpeg", "gif"],
      withCredentials: false,
      format: "json",
      method: "POST",
      url: "http://localhost:8080/upload",
      headers: {
        Authorization: `Bearer afgfgfgaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
      },
      prepareData: function (formData) {
        var file = formData.getAll("files[0]")[0];
        formData.forEach((value, key) => {
          if (key !== "files[0]") {
            formData.delete(key);
          }
        });
        formData.append("file", file);
        return formData;
      },
      isSuccess: function (resp) {
        return !resp.error;
      },
      process: function (resp) {
        if (resp && resp.url) {
          if (editor.current) {
            const [tagName, attr] = ["img", "src"];
            const elm = editor.current.createInside.element(tagName);
            elm.setAttribute(attr, resp.url);
            editor.current.selection.insertImage(elm, null, 300);
          } else {
            console.error("editor.current is undefined.");
          }
        }
        return {
          files: [""], 
          path: "",
          baseurl: "",
          error: 0, 
          msg: "Image uploaded successfully" 
        };
      },
    },
  };

  const [content, setContent] = useState("");
  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const click = () => {
    console.log(content);
  }
  return (
    <div className="App">
      {" "}
      <JoditEditor
        ref={editor}
        editorRef={(ref) => (editor.current = ref)}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={handleEditorChange}
      />
      <button onClick={click}>Click</button>
    </div>
  );
}

export default App;
