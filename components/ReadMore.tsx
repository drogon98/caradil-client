import React, { FC, SyntheticEvent, useState } from "react";

interface ReadMoreProps {}

export const ReadMore: FC<ReadMoreProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="readmore">
      <div className={isExpanded ? "expand" : "readmoreContent"}>
        {props.children}
      </div>
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
