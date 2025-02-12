import { useToggle } from '../hooks/useToggle/useToggle.js';

export default function TaskDopTwo() {
  const [value, toggle] = useToggle([
    'blue', 'orange', 'cyan', 'teal'
  ]);

  return (
    <button onClick={() => toggle()}>
      {value}
    </button>
  );
}
