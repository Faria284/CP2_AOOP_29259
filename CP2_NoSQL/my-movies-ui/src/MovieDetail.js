import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from './api';
import './MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    api.get(`/movies/${id}`)
      .then(res => setMovie(res.data));
  }, [id]);

  if (!movie) return <p className="movie-info">🔄 Loading...</p>;

  return (
    <div className="movie-detail-container">
      <Link to="/" className="back-button">← Back to Movies</Link>
      <div className="movie-card">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <div className="movie-content">
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-info"><strong>Genres:</strong> {movie.genres?.join(', ') || 'N/A'}</p>
          <p className="movie-info"><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p className="movie-info"><strong>Year:</strong> {movie.year}</p>
          <p className="movie-info"><strong>Directors:</strong> {movie.directors?.join(', ')}</p>
          <p className="movie-info"><strong>Cast:</strong> {movie.cast?.join(', ')}</p>
          <p className="movie-description"><strong>Plot:</strong> {movie.fullplot}</p>
          <p className="movie-rating"><strong>IMDB Rating:</strong> {movie.imdb.rating}</p>
        </div>
      </div>
      <Link to={`/movies/${id}/comments`} className="view-comments-button">
        💬 See Comments
      </Link>
    </div>
  );
}

export default MovieDetail;