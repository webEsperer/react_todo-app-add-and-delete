import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItems';

type Props = {
  filteredTodos: Todo[];
  tempTodo: Todo | null;
  removeTodo: (id: number) => void;
  deleteTodoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  tempTodo,
  removeTodo,
  deleteTodoId,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          deleteTodoId={deleteTodoId}
        />
      ))}
      {tempTodo && <TodoItem todo={tempTodo} removeTodo={removeTodo} />}
    </section>
  );
};
