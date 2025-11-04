import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie, updateMovie } from '../features/movies/movieSlice';
import Toast from './Toast';

const MovieForm = ({ editingMovie, onCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(
    editingMovie || { title: '', genre: '', rating: '' }
  );
  const [toast, setToast] = useState(null);

  const handleSubmit = async () => {
    if (!formData.title || !formData.genre || !formData.rating) {
      setToast({ message: 'Please fill all fields', type: 'error' });
      return;
    }

    const movieData = {
      ...formData,
      rating: parseFloat(formData.rating),
    };

    try {
      if (editingMovie) {
        await dispatch(updateMovie(movieData)).unwrap();
        setToast({ message: 'Movie updated successfully!', type: 'success' });
      } else {
        await dispatch(addMovie(movieData)).unwrap();
        setToast({ message: 'Movie added successfully!', type: 'success' });
        setFormData({ title: '', genre: '', rating: '' });
      }
      if (onCancel) setTimeout(onCancel, 1000);
    } catch (error) {
      setToast({ message: error || 'Operation failed', type: 'error' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {editingMovie ? 'Edit Movie' : 'Add New Movie'}
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter movie title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <input
            type="text"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter genre"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating (0-10)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter rating"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            {editingMovie ? 'Update Movie' : 'Add Movie'}
          </button>
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieForm;