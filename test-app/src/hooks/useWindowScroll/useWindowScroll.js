import { useState } from "react";
import { useWindowEvent } from "../useWindowEvent/useWindowEvent.js";

function check(type) {
    switch (type) {
        case "x":
            if (typeof window !== "undefined") {
                return window.scrollX
            } else {
                return 0
            }
        case "y":
            if (typeof window !== "undefined") {
                return window.scrollY
            } else {
                return 0
            }  
        default:
            return 0
    }
    
}

export function useWindowScroll() {
  const [scroll, setScroll] = useState({
    x: check("x"),
    y: check("y"),
  });

  useWindowEvent("scroll", () => {
    setScroll({
      x: window.scrollX,
      y: window.scrollY,
    });
  });

  const scrollTo = ({ x = window.scrollX, y = window.scrollY }) => {
    window.scrollTo({ 
        left: x, 
        top: y, 
    });
  };

  return [scroll, scrollTo];
}
