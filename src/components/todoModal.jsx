import { useState, useEffect, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, X } from 'lucide-react'

function AddTodoModal() {
  const queryClient = useQueryClient()
  const [newTodo, setNewTodo] = useState('')

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: newTodo,
          completed: false,
          userId: 1,
        }),
      })

      const data = await response.json()
      console.log("New todo added:", data)

      if (!response.ok) throw new Error(data.message || 'Failed to add task')
      return data
    },

    onSuccess: (data) => {
      queryClient.setQueryData(['todos'], (old) => old ? [...old, data] : [data])
      setNewTodo('')
      document.getElementById('add_todo_modal').checked = false
    },
  })

  const addTodoBtnRef = useRef()

    useEffect(() => {
      if (!document.getElementById('add_todo_modal').checked) {
        addTodoBtnRef.current?.focus()
      }
    }, [mutation.isSuccess])

  return (
    <>
      <label
        htmlFor="add_todo_modal"
        className="btn bg-[#0F4C5C] text-white font-semibold rounded-xl hover:bg-[#0d3a45] transition"
      >
        <Plus size={16} />Add Todo
      </label>

      <input type="checkbox" id="add_todo_modal" className="modal-toggle" />

      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-box">
          <h3 id="modal-title" className="font-bold text-lg mb-4">Add a New Task</h3>
          <input
            type="text"
            placeholder="e.g. Bake plantain pie"
            className="input input-bordered w-full bg-[#1F2937] text-white placeholder:text-gray-400 rounded-lg mb-4"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />

          <div className="modal-action">
            <label
              htmlFor="add_todo_modal"
              className="btn border border-[#0F4C5C] text-[#0F4C5C] bg-white hover:bg-[#0F4C5C] hover:text-white rounded-xl transition"
              ref={addTodoBtnRef}
            >
              <X size={16} />Cancel
            </label>

            <button
              onClick={() => mutation.mutate()}
              disabled={!newTodo || mutation.isLoading}
              className="btn border border-[#0F4C5C] text-[#0F4C5C] bg-white hover:bg-[#0F4C5C] hover:text-white rounded-xl transition"
            >
               <Plus size={16} />
              {mutation.isLoading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddTodoModal
