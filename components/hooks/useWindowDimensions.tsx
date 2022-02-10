import { useEffect, useState } from "react";

// interface IProps {}

// function getWindowDimensions() {
//   if (window) {
//     const { innerWidth: width, innerHeight: height } = window;
//     return {
//       width,
//       height,
//     };
//   } else {
//     return { width: "", height: "" };
//   }
// }

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      if (typeof window !== "undefined") {
        const { innerWidth: width, innerHeight: height } = window;

        setWindowDimensions({
          width,
          height,
        });
      }
    }

    handleResize();

    // window.addEventListener("resize", handleResize);
    // return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
