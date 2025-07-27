import { useEffect } from "react";

export function useDetectOutsideClicks(ref, close) {
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
        console.log("Closing because clicked outside");
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [close, ref]);
}
