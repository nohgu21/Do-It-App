import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { Todo } from '../types/todo';


async function fetchTodoDetails(id: string): Promise<Todo> {
  const response = await fetch(`https://dummyjson.com/todos/${id}`);
  if (!response.ok) throw new Error('Failed to fetch details to this task');

  return response.json();
}

const TodoDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState<string>('');

  const { data, error, isLoading } = useQuery<Todo, Error>({
    queryKey: ['todo', id],
    queryFn: () => {
      if (!id) throw new Error('Todo ID is required');
      return fetchTodoDetails(id);
    },
    enabled: !!id, // Only run query if id exists
  });

  const handleAddTask = (): void => {
    if (!description.trim()) {
      alert('Please enter a task description.');
      return;
    }

    if (!data) return;

    console.log('New Task Added:', {
      title: data.todo,
      status: data.completed ? 'Completed' : 'Pending',
      description,
    });

    alert('Task added! (Check console for now)');
    setDescription('');
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value);
  };

  const handleGoBack = (): void => {
    navigate('/');
  };

  if (isLoading) return <p className='text-center text-white mt-8'>Loading...</p>;
  if (error) return <p className='text-center text-red-500 mt-8'>Error: {error.message}</p>;
  if (!data) return <p className='text-center text-white mt-8'>Todo not found.</p>;

  return (
    <main className='font-lato min-h-screen bg-[#0F4C5C] flex items-center justify-center px-4 py-10'>
      <div className='w-full max-w-md bg-white text-[#0F4C5C] p-6 rounded-2xl shadow-xl space-y-6'>

        <button
          onClick={handleGoBack}
          className='btn btn-sm bg-white border border-[#0F4C5C] text-[#0F4C5C] font-semibold hover:bg-[#0f4c5c] hover:text-white transition-all'
        >
          View complete list
        </button>

        <div className='space-y-1'>
          <strong>Title:</strong>
          <p className='font-bold text-lg'>{data.todo}</p>
        </div>

        <div className='space-y-1'>
          <p className='font-bold text-lg'>Status:</p>
          <span
            className={`inline-block px-3 py-1 text-sm rounded-full font-medium text-white ${
              data.completed ? 'bg-green-600' : 'bg-yellow-500'
            }`}
          >
            {data.completed ? 'Completed' : 'Pending'}
          </span>
        </div>

        <div className='space-y-1'>
          {data.completed ? (
            <h3 className="bg-green-600 text-white text-center py-3 rounded-lg font-semibold text-lg shadow-md">
              Yipee 🎉 Task completed!
            </h3>
          ) : (
            <>
              <p className='font-bold text-lg'>What's this task about?</p>

              <input
                type='text'
                value={description}
                onChange={handleDescriptionChange}
                placeholder='Briefly describe your task...'
                className='input input-bordered w-full bg-[#1F2937] text-white placeholder:text-gray-400'
              />

              <button
                onClick={handleAddTask}
                className="btn w-full mt-3 bg-[#0F4C5C] text-white hover:bg-[#0d3a45]"
              >
                Update Task
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default TodoDetail;