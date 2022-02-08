import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import { CustomHead } from "../components/CustomHead";
import Layout from "../components/layouts/Layout";
import "react-quill/dist/quill.snow.css";
import FileSaver from "file-saver";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    // ["link", "image", "video"],
    // ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  // "image",
  // "video",
];

const Editor: NextPage = () => {
  const [value, setValue] = useState("");

  const handleChange = (value: any) => {
    setValue(value);
  };

  const saveFile = () => {
    let blob = new Blob([value], { type: "text/html;charset=utf-8" });
    let fileName = Date.now();
    FileSaver.saveAs(blob, `${fileName}.html`);
  };

  return (
    <>
      <CustomHead title="About Us" />
      <Layout>
        <div className="customContainer my-5">
          <h3>Edit content and generate html files</h3>
          <ReactQuill
            value={value}
            // name="description"
            onChange={handleChange}
            modules={modules}
            formats={formats}
            placeholder="Type content here"
            bounds={"#car-description-editor"}
            // theme="snow"
          />
          <div className="d-grid gap-2 mt-4">
            <button type="submit" className="btn bgOrange" onClick={saveFile}>
              Generate HTML
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Editor;
