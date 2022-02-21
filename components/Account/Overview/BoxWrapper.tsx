import React, { ReactChild } from "react";

export interface BoxWrapperProps {
  children: ReactChild;
}

export function BoxWrapper(props: BoxWrapperProps) {
  return <div className="overview-box-wrapper shadow">{props.children}</div>;
}
