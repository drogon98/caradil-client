import React from "react";

export interface HeroBottomProps {}

export function HeroBottom(props: HeroBottomProps) {
  return (
    <div className="customContainer my-4 mb-5 text-center">
      <h1 className="find-your-drive">Find Your Drive</h1>
      <h6>Explore africa's largest car sharing marketplace</h6>
    </div>
  );
}
