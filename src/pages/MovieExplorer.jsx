import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import {
  fetchMovies,
  deleteMovie,
  clearError,
} from '../features/movies/movieSlice';
import MovieForm from '../components/MovieForm';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Toast from '../components/Toast';

const MovieExplorer = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);
  const [editingMovie, setEditingMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setToast({ message: error, type: 'error' });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await dispatch(deleteMovie(id)).unwrap();
        setToast({ message: 'Movie deleted successfully!', type: 'success' });
      } catch (error) {
        setToast({ message: error || 'Failed to delete movie', type: 'error' });
      }
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingMovie(null);
    setShowForm(false);
  };

  // Get unique genres
  const genres = [...new Set(movies.map((m) => m.genre))];

  // Filter and sort movies
  let filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre = !filterGenre || movie.genre === filterGenre;
    return matchesSearch && matchesGenre;
  });

  filteredMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎬 Movie Explorer
          </h1>
          <p className="text-gray-600">
            Browse, add, and manage your favorite movies
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center gap-2 mx-auto"
          >
            <Plus size={20} />
            Add New Movie
          </button>
        )}

        {showForm && (
          <MovieForm editingMovie={editingMovie} onCancel={handleCancelEdit} />
        )}

        <div className="mb-6">
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        </div>

        <FilterBar
          genres={genres}
          filterGenre={filterGenre}
          onFilterChange={setFilterGenre}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <MovieList
          movies={filteredMovies}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default MovieExplorer;