import React, { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { FileInput } from "../../graphql_types/generated/graphql";

interface PhotoBoxProps {
  photo: FileInput;
  deletePhoto: (id: string) => void;
  carVerified: boolean;
}

/**
 * @author @CodeYourEmpire
 * @function @PhotoBox
 **/

export const PhotoBox: FC<PhotoBoxProps> = (props) => {
  const handleClick = () => {
    props.deletePhoto(props.photo.public_id);
  };
  return (
    <div className="photo-box-wrapper">
      <img
        src={
          props.photo.secure_url ? props.photo.secure_url : "/images/lambo.jpg"
        }
        width="100%"
        height="250px"
        style={{ objectFit: "cover" }}
      />
      {!props.carVerified && (
        <span className="photo-box-delete-wrapper">
          <button className="btn p-0 m-0" onClick={handleClick}>
            <FaTrash style={{ color: "orange" }} />
          </button>
        </span>
      )}
    </div>
  );
};
