import React, { FC } from "react";
import { Contact } from "../../../graphql_types/generated/graphql";

interface EnquiryBoxProps {
  data: Contact;
}

export const EnquiryBox: FC<EnquiryBoxProps> = (props) => {
  return (
    <div className="shadow p-2 mb-4">
      <h5 className="m-0">{props.data.subject}</h5>
      <p className="m-0">{props.data.message}</p>
      <div className="mt-2">
        <small>{new Date(props.data.created_at).toLocaleString()}</small>
      </div>
    </div>
  );
};
