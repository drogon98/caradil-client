import React, { FC, SyntheticEvent } from "react";
import { FaTrash } from "react-icons/fa";
import { FileInput } from "../../graphql_types/generated/graphql";

interface PhotoBoxProps {
  photo: FileInput;
  deletePhoto: (id: string) => void;
  // verificationInProgress?: boolean;
  isManage?: boolean;
  isEdit?: boolean;
}

export const PhotoBox: FC<PhotoBoxProps> = (props) => {
  const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    props.deletePhoto(props.photo.public_id);
  };
  return (
    <div className="photo-box-wrapper">
      <img
        src={
          props.photo.secure_url ? props.photo.secure_url : "/images/lambo.jpg"
        }
        width="100%"
        height="200px"
        style={{ objectFit: "cover" }}
      />
      {(!props.isManage || (props.isManage && props.isEdit)) && (
        <span className="photo-box-delete-wrapper">
          <button
            className="btn p-0 m-0"
            onClick={handleClick}
            // disabled={props.verificationInProgress}
          >
            <FaTrash style={{ color: "orange" }} />
          </button>
        </span>
      )}
    </div>
  );
};
