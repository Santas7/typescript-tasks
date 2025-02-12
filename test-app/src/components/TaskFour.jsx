import { useViewportSize } from "../hooks/useViewportSize/useViewportSize";

export default function TaskFour() {
  const { height, width } = useViewportSize();

  return (
    <>
      Width: {width}, height: {height}
    </>
  );
}