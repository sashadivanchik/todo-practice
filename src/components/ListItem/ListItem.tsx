import React from "react";
import { TodoProps } from "../state/types";
export interface ListItemProps extends TodoProps {
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  id,
  isComplete,
  todoName,
  onToggle,
  onRemove
}) => {

  const toggleMessage = isComplete ? 'В работу' : 'Завершить';
  const isCompleteStyle = isComplete ? 'line-through' : '';

  return (
    <div style={{ display: "flex "}}>
      <div>
        <button onClick={() => onRemove(id)}>Удалить</button>
        <button onClick={() => onToggle(id)}>{toggleMessage}</button>
      </div>
      <p style={{ textDecoration: `${isCompleteStyle}` }}>
        {todoName}
      </p>
    </div>
  )
};