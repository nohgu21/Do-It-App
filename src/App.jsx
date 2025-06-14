// importing all my components to parent folder from child folder as well as my router
import { useState } from 'react'
import Greeting from './components/greeting'
import TodoDetail from './components/todoDetails'
import MyTodoList from './components/todoList'
import AddTodoModal from './components/todoModal'
import NotFoundPage from './components/notFoundPage'
import SearchFilter from './components/searchFilter'
import ErrorBoundary from './components/errorboundary'
import TestError from './components/testerror'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'

function Todo() {
  const [modalOpen, setModalOpen] = useState(false)
  const [searchTodo, setSearchTodo] = useState("")
  const [todoStatusFilter, setTodoStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

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
  )
}


// Rendering my main component with routes and wrapped in my error boundary
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/todos/:id" element={<TodoDetail />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/error" element={<TestError />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default App
