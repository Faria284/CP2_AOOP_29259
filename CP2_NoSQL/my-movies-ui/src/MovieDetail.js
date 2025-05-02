import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './MovieDetail.css';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/movies/${id}`)
      .then(res => setMovie(res.data));
  }, [id]);

  if (!movie) return <p className="movie-info">🔄 A carregar...</p>;

  return (
    <div className="movie-detail-container">
      <Link to="/" className="back-button">← Voltar</Link>
      <div className="movie-card">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <div className="movie-content">
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-info"><strong>📅 Ano:</strong> {movie.year}</p>
          <p className="movie-info"><strong>🎬 Diretores:</strong> {movie.directors?.join(', ')}</p>
          <p className="movie-description"><strong>📝 Descrição:</strong> {movie.fullplot}</p>
        </div>
      </div>
      <Link to={`/movies/${id}/comments`} className="view-comments-button">
        💬 Ver Comentários
      </Link>
    </div>
  );
}

export default MovieDetail;