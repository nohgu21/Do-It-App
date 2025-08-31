// App.tsx
import { useState } from 'react';
import Greeting from './components/greeting';
import TodoDetail from './components/todoDetails';
import MyTodoList from './components/todoList';
import AddTodoModal from './components/todoModal';
import NotFoundPage from './components/notFoundPage';
import SearchFilter from './components/searchFilter';
import ErrorBoundary from './components/errorboundary';
import { createBrowserRouter, RouterProvider } from 'react-router';
import type { TodoStatusFilter } from './types/todo';
import './index.css';

const Todo: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchTodo, setSearchTodo] = useState<string>("");
  const [todoStatusFilter, setTodoStatusFilter] = useState<TodoStatusFilter>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <main className="font-lato min-h-screen bg-[#0F4C5C] text-white px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-3xl space-y-6">

        {/* Rendering my greetings as the header */}
        <div className="text-center space-y-1">
          <Greeting />
          <p className="text-sm text-gray-300">How are you? What are you doing today?</p>
        </div>

        {/* Rendering my filter & search */}
        <SearchFilter
          searchTodo={searchTodo}
          setSearchTodo={setSearchTodo}
          todoStatusFilter={todoStatusFilter}
          setTodoStatusFilter={setTodoStatusFilter}
        />

        <AddTodoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

        {/* Rendering my Todo/task list */}
        <MyTodoList
          searchTodo={searchTodo}
          todoStatusFilter={todoStatusFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  );
};

// Here begins my router configuration. This allows for easier and neater routing in my main App component
const router = createBrowserRouter([
  {
    path: "/",
    element: <Todo />,
  },
  {
    path: "/todos/:id",
    element: <TodoDetail />,
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

// Rendering my main component with routes and wrapped in my error boundary
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;