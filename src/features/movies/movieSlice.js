import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { moviesAPI } from './movieAPI';

// Async Thunks
export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async (_, { rejectWithValue }) => {
        try {
            return await moviesAPI.fetchAll();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addMovie = createAsyncThunk(
    'movies/addMovie',
    async (movie, { rejectWithValue }) => {
        try {
            return await moviesAPI.create(movie);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateMovie = createAsyncThunk(
    'movies/updateMovie',
    async (movie, { rejectWithValue }) => {
        try {
            return await moviesAPI.update(movie);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteMovie = createAsyncThunk(
    'movies/deleteMovie',
    async (id, { rejectWithValue }) => {
        try {
            return await moviesAPI.delete(id);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice
const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Movies
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Movie
            .addCase(addMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.movies.push(action.payload);
            })
            .addCase(addMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Movie
            .addCase(updateMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.movies.findIndex((m) => m.id === action.payload.id);
                if (index !== -1) {
                    state.movies[index] = action.payload;
                }
            })
            .addCase(updateMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Movie
            .addCase(deleteMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = state.movies.filter((m) => m.id !== action.payload);
            })
            .addCase(deleteMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = moviesSlice.actions;
export default moviesSlice.reducer;