import React, { FC, SyntheticEvent, useState } from "react";

interface ReadMoreProps {}

/**
 * @author @CodeYourEmpire
 * @function @ReadMore
 **/

export const ReadMore: FC<ReadMoreProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  // const read
  const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    // console.log("e :>> ", e);
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="readmore z-index-2">
      <div className={isExpanded ? "expand" : "readmoreContent"}>
        {props.children}
      </div>
      {/* <div className="mt-2 readMoreLessLink"> */}
      <div className={!isExpanded ? "mt-2 readMoreLessLink" : ""}>
        <div className="readMoreLessInnerWrapper">
          <div className="test">
            <button className="moreBox" onClick={handleClick}>
              {isExpanded ? "Less" : "More"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
