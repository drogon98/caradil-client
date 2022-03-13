import Link from "next/link";
import React from "react";
import { Plan } from "../../../graphql_types/generated/graphql";

interface UpgradeBtnProps {
  data: Plan;
}

export default function UpgradeBtn(props: UpgradeBtnProps) {
  // Redirect to list car page with parallax
  return (
    <Link
      href={{
        pathname: "/list-your-car",
        query: { upgrade: true, current: props.data.title },
      }}
      scroll={false}
    >
      <a className="btn btn-sm btn-outline-success">Upgrade Now!</a>
    </Link>
  );
}
