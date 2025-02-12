import { useState } from "react";
import { useWindowEvent } from "../useWindowEvent/useWindowEvent.js";

function check(type) {
    switch (type) {
        case "width":
            if (typeof window !== "undefined") {
                return window.innerWidth
            } else {
                return 0
            }
        case "height":
            if (typeof window !== "undefined") {
                return window.innerHeight
            } else {
                return 0
            }  
        default:
            return 0
    }
    
}

export function useViewportSize() {
  const [size, setSize] = useState({
    width: check("width"),
    height: check("height"),
  });

  useWindowEvent("resize", () => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  });

  return size;
}
