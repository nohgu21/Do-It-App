import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Pencil, X, Loader2 } from 'lucide-react'

function EditTodoModal({ todo, onClose }) {
  const [editedTodo, setEditedTodo] = useState(todo.todo)
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`https://dummyjson.com/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: editedTodo })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to update')
      return data
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['todos'], (old) =>
        old.map((t) => (t.id === data.id ? { ...t, todo: data.todo } : t))
      )
      onClose()
    }
  })

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true">
      <div className="modal-box bg-[#1F2937] text-white rounded-xl relative border border-gray-600">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Pencil className="text-[#0F4C5C]-400" size={20} /> Edit Todo
        </h3>

        <button
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2 bg-[#0F4C5C] text-white hover:bg-[#0a3742] border-none"
          aria-label="Close edit modal"
        >
          <X size={18} />
        </button>

        <input
          type="text"
          value={editedTodo}
          onChange={(e) => setEditedTodo(e.target.value)}
          className="input input-bordered w-full mb-4 bg-[#0F4C5C] text-white border-none placeholder-gray-300"
          aria-label="Edit todo title"
        />

        <div className="modal-action">
          <button
            className="btn border border-[#0F4C5C] text-[#0F4C5C] bg-white hover:bg-[#0F4C5C] hover:text-white rounded-xl transition"
            onClick={onClose}
            aria-label="Cancel editing"
          >
            Cancel
          </button>
          <button
            className="btn border border-[#0F4C5C] text-[#0F4C5C] bg-white hover:bg-[#0F4C5C] hover:text-white rounded-xl transition"
            disabled={mutation.isLoading}
            onClick={() => mutation.mutate()}
            aria-label="Update todo"
          >
            {mutation.isLoading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditTodoModal
