import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import MovieExplorer from './pages/MovieExplorer';

function App() {
  return (
    <Provider store={store}>
      <MovieExplorer />
    </Provider>
  );
}

export default App;