import { useForm } from 'react-hook-form'
import { useState, useEffect, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, X } from 'lucide-react'

function AddTodoModal() {
  const queryClient = useQueryClient()
  const [newTodo, setNewTodo] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange', 
    defaultValues: {
      todo: ''
    }
  })

  const todoValue = watch('todo')

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: formData.todo,
          completed: false,
          userId: 1,
        }),
      })

      const data = await response.json()
      console.log("New task added:", data)

      if (!response.ok) throw new Error(data.message || 'Failed to add task')
      return data
    },

    onSuccess: (data) => {
      queryClient.setQueryData(['todos'], (old) => old ? [...old, data] : [data])
      reset() 
      document.getElementById('add_todo_modal').checked = false
    },
  })


  const onSubmit = (data) => {
    if (data.todo.trim()) {
      mutation.mutate(data)
    }
  }

  useEffect(() => {
    const modalOpen = document.getElementById('add_todo_modal').checked
    
    const handleKeyDown = (e) => {
      if (!modalOpen) return
      
      if (e.key === 'Escape') {
        document.getElementById('add_todo_modal').checked = false
        reset() 
      }
      if (e.key === 'Enter' && todoValue?.trim() && !mutation.isLoading) {
        e.preventDefault()
        handleSubmit(onSubmit)() 
      }
    }

    if (modalOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [todoValue, mutation.isLoading, handleSubmit, reset])

  const addTodoBtnRef = useRef()
  useEffect(() => {
    if (!document.getElementById('add_todo_modal').checked) {
      addTodoBtnRef.current?.focus()
    }
  }, [mutation.isSuccess])


  const handleModalClose = () => {
    reset()
  }


  return (
    <>
      <label
        htmlFor="add_todo_modal"
        className="btn bg-[#0F4C5C] text-white font-semibold rounded-xl hover:bg-[#0d3a45] transition"
        ref={addTodoBtnRef}
      >
        <Plus size={16} />Add Todo
      </label>

      <input type="checkbox" id="add_todo_modal" className="modal-toggle" />

      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-box">
          <h3 id="modal-title" className="font-bold text-lg mb-4">Add a New Task</h3>

          <form onSubmit={handleSubmit(onSubmit)}>

            <input
              type="text"
              placeholder="e.g. Bake plantain pie"
              className={`input input-bordered w-full bg-[#1F2937] text-white placeholder:text-gray-400 rounded-lg mb-4 ${
                errors.todo ? 'border-red-500' : ''
              }`}
              {...register('todo', {
                required: 'Todo is required',
                minLength: {
                  value: 1,
                  message: 'Todo must be at least 1 character'
                },
                validate: value => value.trim().length > 0 || 'Todo cannot be empty'
              })}
            />
            
            {errors.todo && (
              <p className="text-red-500 text-sm mb-4">{errors.todo.message}</p>
            )}


            <div className="modal-action">
                <label
                  htmlFor="add_todo_modal"
                  className="btn border border-[#0F4C5C] text-[#0F4C5C] bg-white hover:bg-[#0F4C5C] hover:text-white rounded-xl transition"
                  onClick={handleModalClose}
                >
                  <X size={16} />Cancel
                </label>

              <button
                type="submit"
                disabled={!isValid || mutation.isLoading}
                className="btn border border-[#0F4C5C] text-[#0F4C5C] bg-white hover:bg-[#0F4C5C] hover:text-white rounded-xl transition disabled:opacity-50"
              >
                <Plus size={16} />
                {mutation.isLoading ? 'Adding...' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddTodoModal
