import { useState, useRef, useEffect } from "react";

export function useHover() {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);

    const handleMouseOver = () => setHovered(true);
    const handleMouseOut = () => setHovered(false);

    useEffect(() => {
        const elem= ref.current;
        if (elem) {
            elem.addEventListener("mouseover", handleMouseOver);
            elem.addEventListener("mouseout", handleMouseOut);
        }
        return () => {
            if (elem) {
                elem.removeEventListener("mouseover", handleMouseOver);
                elem.removeEventListener("mouseout", handleMouseOut);
            }
        };
    }, []);

    return { hovered, ref };
}
