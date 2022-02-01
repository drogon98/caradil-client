import React, { ReactElement } from "react";
import { AiFillFileImage, AiFillFileText } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

interface DocumentContentProps {
  title: string;
  deleteHandler: any;
  docUrl: string;
  // isVerified: boolean;
  // verificationInProgress?: boolean;
  isManage?: boolean;
  isEdit?: boolean;
  deleteLoading: boolean;
}

export default function DocumentContent(
  props: DocumentContentProps
): ReactElement {
  const processFileName = (url: string) => {
    if (url) {
      const urlSections = url.split("/");
      return `https://res...${urlSections[urlSections.length - 1]}`;
    } else {
      return "";
    }
  };

  const checkFileType = (url: string) => {
    if (url) {
      const urlSections = url.split("/");
      const lastSection = urlSections[urlSections.length - 1];
      const extension = lastSection.split(".")[1];

      if (extension === "pdf") {
        return "pdf";
      } else if (
        extension === "png" ||
        extension === "jpg" ||
        extension === "jpeg"
      ) {
        return "image";
      }
    } else {
      return "";
    }
  };

  return (
    <div>
      {props.docUrl && (
        <span>
          {checkFileType(props.docUrl) === "image" ? (
            <AiFillFileImage />
          ) : (
            <AiFillFileText />
          )}
          <small>{processFileName(props.docUrl)}</small>
          <>
            {(!props.isManage || (props.isManage && props.isEdit)) && (
              <small>
                <button
                  title="Delete file"
                  className="btn"
                  onClick={(e) => props.deleteHandler(e, props.title)}
                  disabled={props.deleteLoading}
                >
                  <FaTrash />
                </button>
              </small>
            )}
          </>
        </span>
      )}
    </div>
  );
}
