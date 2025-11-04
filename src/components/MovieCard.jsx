import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const MovieCard = ({ movie, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800">{movie.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(movie)}
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit movie"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(movie.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete movie"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-medium">Genre:</span> {movie.genre}
        </p>
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-600">Rating:</span>
          <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
            ⭐ {movie.rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;