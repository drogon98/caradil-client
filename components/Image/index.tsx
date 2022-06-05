import React from "react";
import Image from "next/image";

interface ICustomImageProps {
  src: string;
  alt: string;
  height: string;
  width: string;
  layout: "fixed" | "fill" | "intrinsic" | "responsive" | undefined;
  loader?: any;
}

export default function CustomImage(props: ICustomImageProps) {
  return (
    <Image
      // loader={myLoader}
      src={props.src ?? ""}
      alt={props.alt}
      height={props.height}
      width={props.width}
      layout={props.layout}
      objectFit="cover"
      quality={100}
    />
  );
}
