import React, { FC, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
interface ExpandableProps {
  header: string;
  // data: any;
  // val: number;
  // setCurrentOpenExpandable: Dispatch<SetStateAction<number>>;
  // currentOpenExpandable: number;
}

export const Expandable: FC<ExpandableProps> = (props) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <div className="expandable mb-3">
      <div className="d-grid gap-2 bg-success">
        <button
          className="btn m-0 p-0 py-2"
          onClick={() => {
            // if (expanded) {
            //   props.setCurrentOpenExpandable(-1);
            // } else {
            //   props.setCurrentOpenExpandable(props.val);
            // }
            setExpanded(!expanded);
          }}
          style={{ backgroundColor: "#eaecee" }}
        >
          <div className="d-flex justify-content-between px-2">
            <h6 className="m-0">{props.header}</h6>
            <span>
              <MdKeyboardArrowDown size={"20px"} />
            </span>
          </div>
        </button>
      </div>
      {/* {expanded && props.currentOpenExpandable === props.val && ( */}
      {expanded && <div className="content">{props.children}</div>}
    </div>
  );
};
