import Head from "next/head";
import React, { FC } from "react";

interface CustomHeadProps {
  title: string;
  metaDescription?: string;
}

export const CustomHead: FC<CustomHeadProps> = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta
        name="description"
        content={
          props.metaDescription
            ? props.metaDescription
            : `Africa largest car sharing platform`
        }
      />
      <meta
        name="viewport"
        content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />

      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@900&family=Roboto:ital,wght@0,400;0,900;1,300&display=swap"
        rel="stylesheet"
      />

      <script src="https://maps.googleapis.com/maps/api/js?v=weekly&key=AIzaSyB34rcYbsjnewKDvl1-2_qUV87iFwkpXso&libraries=places"></script>
    </Head>
  );
};
