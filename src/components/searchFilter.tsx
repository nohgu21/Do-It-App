// components/SearchFilter.tsx
import { Search, Filter } from 'lucide-react';
import type { SearchFilterProps, TodoStatusFilter } from '../types/todo';

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  searchTodo, 
  setSearchTodo, 
  todoStatusFilter, 
  setTodoStatusFilter 
}) => {
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      console.log('Search triggered by Enter key');
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTodoStatusFilter(e.target.value as TodoStatusFilter);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-[#1F2937] rounded-xl p-4 mb-6 shadow-sm">
      <Search size={16} />
      <input
        type="text"
        aria-label="Search todos by title"
        placeholder="Search your tasks here..."
        value={searchTodo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTodo(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        className="input input-bordered bg-[#1F2937] text-white placeholder:text-gray-400 rounded-lg w-full md:w-2/3"
      />

      <Filter size={16} />
      <select
        aria-label="Filter by completion status"
        value={todoStatusFilter}
        onChange={handleFilterChange}
        className="select select-bordered bg-[#1F2937] text-white rounded-lg w-full md:w-1/3"
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
};

export default SearchFilter;