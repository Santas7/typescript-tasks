import { DeleteButton } from "./DeleteButton";

type Props = Task & {
    onDelete: (id: Task["id"]) => void;
    onToggle: (id: Task["id"]) => void;
};

export const Item = (props: Props) => {
  const displayHeader = props.header.length > 32 ? props.header.slice(0, 32) + '...' : props.header;

  return (
      <li className="item-wrapper">
          <input
              type="checkbox"
              id={props.id}
              checked={props.done} 
              onChange={() => props.onToggle(props.id)}
              aria-label={props.header} 
          />
          <label htmlFor={props.id} onClick={() => props.onToggle(props.id)}>
              {props.done ? <s>{displayHeader}</s> : displayHeader}
          </label>
          <DeleteButton
              disabled={!props.done}
              onClick={() => props.onDelete(props.id)}
          />
      </li>
  );
};