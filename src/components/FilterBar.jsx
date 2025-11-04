import React from 'react';
import { Filter } from 'lucide-react';

const FilterBar = ({ genres, filterGenre, onFilterChange, sortBy, onSortChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
          <select
            value={filterGenre}
            onChange={(e) => onFilterChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
        >
          <option value="title">Sort by Title</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;