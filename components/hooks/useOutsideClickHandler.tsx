import { RefObject, useEffect } from "react";

export function useOutsideClickHandler(
  ref: RefObject<HTMLDivElement>,
  closeHandler: any,
  desiredRef: RefObject<HTMLElement>
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      // Check if it is the desired element clicked. If it is work normally
      if (desiredRef?.current && !desiredRef.current.contains(event.target)) {
        if (ref.current && !ref.current.contains(event.target)) {
          closeHandler(false);
        }
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, desiredRef]);
}
