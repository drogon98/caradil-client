import React, { ReactElement } from "react";

interface Props {
  upgradeAccRef: any;
}

export default function UpgradeAccount(props: Props): ReactElement {
  return (
    <div>
      <div ref={props.upgradeAccRef} />
    </div>
  );
}
