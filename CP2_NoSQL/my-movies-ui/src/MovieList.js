import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MovieList.css';
import api from './api';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [titleInput, setTitleInput] = useState('');
  const [genreInput, setGenreInput] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');

  useEffect(() => {
    const params = { page };
    if (titleFilter.trim()) params.title = titleFilter.trim();
    if (genreFilter.trim()) params.genre = genreFilter.trim();
  
    api.get('/movies', { params })
      .then(res => setMovies(res.data));
  }, [page, titleFilter, genreFilter]);  

  return (
    <div className="movie-list-container">
      <h1 className="movie-list-title">🎬 Movies List</h1>
      <div className="filters">
        <input
            type="text"
            placeholder="🔍 Search for title..."
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
        />
        <input
            type="text"
            placeholder="🎭 Filter by gender..."
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
        />
        <button
            className="search-button"
            onClick={() => {
            setPage(1);
            setTitleFilter(titleInput);
            setGenreFilter(genreInput);
            }}
        >
            🔎 Search
        </button>
        </div>
        <div className="movie-grid">
          {movies.map(movie => (
            <div key={movie._id} className="movie-card-preview">
              <Link to={`/movies/${movie._id}`}>
                <div className="poster-wrapper">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="movie-poster"
                    onError={(e) => { e.target.src = "/fallback.jpg"; }}
                  />
                  <div className="movie-overlay">
                    <h3>{movie.title}</h3>
                    <p>{movie.genres?.join(', ') || 'N/A'}</p>
                    <p>{movie.year || 'Unknown Year'}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      <div className="pagination-buttons">
        <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
        >
            ◀ Previous
        </button>

        <span>Page {page}</span>

        <button
            onClick={() => setPage(p => p + 1)}
            disabled={movies.length < 50} 
        >
            Next ▶
        </button>
        </div>
    </div>
  );
}

export default MovieList;