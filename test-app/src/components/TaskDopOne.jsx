import { useWindowScroll } from '../hooks/useWindowScroll/useWindowScroll.js';

export default function TaskDopOne() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <div>
      <p>
        Scroll position x: {scroll.x}, y: {scroll.y}
      </p>
      <button onClick={() => scrollTo({ y: 0 })}>Scroll to top</button>
      <p>
        lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50
        lorem50lorem50lorem50lorem50lorem50
        lorem50lorem50lorem50lorem50lorem50lorem50lorem50lorem50
        lorem50lorem50lorem50lorem50
      </p>
    </div>
  );
}