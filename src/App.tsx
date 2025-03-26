/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { deleteTodo, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ErrorNotification } from './components/ErrorNotification';
import { FilterStatus } from './types/FilterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.ALL,
  );
  const [error, setError] = useState<string>('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [deleteTodoId, setDeleteTodoId] = useState<number | null>(null);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    setError('');
    getTodos()
      .then(data => setTodos(data))
      .catch(() => setError('Unable to load todos'));
  }, []);

  useEffect(() => {
    let newFilterTodos = [...todos];

    switch (filterStatus) {
      case FilterStatus.ACTIVE:
        newFilterTodos = todos.filter(todo => !todo.completed);
        break;
      case FilterStatus.COMPLETED:
        newFilterTodos = todos.filter(todo => todo.completed);
        break;
    }

    setFilteredTodos(newFilterTodos);
  }, [filterStatus, todos]);

  const removeTodo = (id: number) => {
    setDeleteTodoId(id);
    setIsDeleted(false);

    return deleteTodo(id)
      .then(() => {
        setTodos(prevTodos => prevTodos.filter(prevTodo => prevTodo.id !== id));
      })
      .catch(() => setError('Unable to delete a todo'))
      .finally(() => {
        setDeleteTodoId(null);
        setIsDeleted(true);
      });
  };

  const deleteAllCompletedTodos = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    if (completedTodos.length === 0) {
      return;
    }

    Promise.allSettled(completedTodos.map(todo => removeTodo(todo.id)));
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          filteredTodos={filteredTodos}
          setError={setError}
          setTodos={setTodos}
          setTempTodo={setTempTodo}
          isDeleted={isDeleted}
        />
        {todos?.length > 0 && (
          <>
            <TodoList
              filteredTodos={filteredTodos}
              tempTodo={tempTodo}
              removeTodo={removeTodo}
              deleteTodoId={deleteTodoId}
            />
            <Footer
              setFilterStatus={setFilterStatus}
              filterStatus={filterStatus}
              filteredTodos={filteredTodos}
              todos={todos}
              deleteAllCompletedTodos={deleteAllCompletedTodos}
            />
          </>
        )}
      </div>
      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
