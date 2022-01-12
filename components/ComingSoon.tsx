import React, { FC } from "react";

interface ComingSoonProps {
  title: string;
}

/**
 * @author @CodeYourEmpire
 * @function @ComingSoon
 **/

export const ComingSoon: FC<ComingSoonProps> = (props) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ height: "calc(100vh - 90px)" }}
    >
      <h1>Coming Soon</h1>
      <p>{props.title}</p>
    </div>
  );
};
