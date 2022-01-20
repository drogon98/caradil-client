import React from "react";

export interface HeroBottomProps {}

export function HeroBottom(props: HeroBottomProps) {
  return (
    <div className="customContainer my-5 text-center">
      <p className="text-center">How It Works</p>
      <h3 className="find-your-drive">Carsharing Has Never Been That Easy</h3>
      <p></p>
      <h6>
        Book a car when you need to drive, save greatly, and enjoy freedom of
        movement.
      </h6>
    </div>
  );
}
