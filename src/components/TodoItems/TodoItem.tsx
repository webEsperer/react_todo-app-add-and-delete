/* eslint-disable jsx-a11y/label-has-associated-control */

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  removeTodo: (id: number) => void;
  deleteTodoId?: number | null;
};

export const TodoItem = ({ todo, removeTodo, deleteTodoId }: Props) => {
  const { title, completed, id } = todo;
  const isDelete = deleteTodoId === id;

  return (
    <div data-cy="Todo" className={`todo ${completed ? 'completed' : ''}`}>
      <label className="todo__status-label" htmlFor="status">
        <input
          id="status"
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => removeTodo(id)}
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={`modal overlay ${(todo && !id) || isDelete ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
