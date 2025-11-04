const API_URL = 'http://localhost:4000/movies';

export const moviesAPI = {
  fetchAll: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch movies');
    return await response.json();
  },

  create: async (movie) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });
    if (!response.ok) throw new Error('Failed to add movie');
    return await response.json();
  },

  update: async (movie) => {
    const response = await fetch(`${API_URL}/${movie.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });
    if (!response.ok) throw new Error('Failed to update movie');
    return await response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete movie');
    return id;
  },
};