import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import dynamic from "next/dynamic";
import {
  Faq,
  useAddFaqMutation,
} from "../../../graphql_types/generated/graphql";

interface Props {
  modalShow: boolean;
  handleClose: () => void;
  isEdit: boolean;
  faq?: Faq;
}

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
    ["link", "image", "video"],
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
  "image",
  "video",
];

export default function AddEditModalFaq(props: Props) {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [addFaq, { loading }] = useAddFaqMutation();
  const [faqIntendedUser, setFaqIntendedUser] = useState("both");

  useEffect(() => {
    if (props.isEdit && props.faq) {
      setQuestion(props.faq?.question!);
      setAnswer(props.faq?.answer!);
    }
  }, [props.isEdit, props.faq]);

  const handleQuizChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleIntendedUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFaqIntendedUser(e.target.value);
  };

  const handleAnswerChange = (value: any) => {
    setAnswer(value);
  };

  const handleSave = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!question || !answer) {
      return;
    }

    try {
      let response = await addFaq({
        variables: {
          input: { question, answer, intended_user: faqIntendedUser },
        },
      });
      if (response.data?.addFaq.success) {
        props.handleClose();
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <Modal
      show={props.modalShow}
      onHide={props.handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.isEdit ? "Edit Faq" : "Add Faq"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="mb-3">
            <label>Intended User</label>
            <select
              className="form-select form-control car-row-input-width"
              aria-label="Default select example"
              onChange={handleIntendedUserChange}
              value={faqIntendedUser}
              name="make"
              required
            >
              <option value={""}>Select User</option>
              <option value={"quest"}>Guest</option>
              <option value={"host"}>Host</option>
              <option value={"both"}>Both</option>
            </select>
          </div>
          <div className="mb-3">
            <label>Question</label>
            <input
              className="form-control"
              type="text"
              placeholder="How do i list a car?"
              value={question}
              onChange={handleQuizChange}
            />
          </div>
          <label>Answer</label>
          <div id="faqs-editor">
            <ReactQuill
              value={answer}
              // name="description"
              onChange={handleAnswerChange}
              modules={modules}
              formats={formats}
              placeholder="Type answer here"
              bounds={"#faqs-editor"}
              // theme="snow"
            />
          </div>
          <div className="mt-3">
            <button
              className="btn bgOrange"
              onClick={handleSave}
              disabled={loading}
            >
              Save
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
