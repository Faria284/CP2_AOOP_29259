import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/movies/${id}`)
      .then(res => setMovie(res.data));
  }, [id]);

  if (!movie) return <p>A carregar...</p>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p><strong>Ano:</strong> {movie.year}</p>
      <p><strong>Diretores:</strong> {movie.directors?.join(', ')}</p>
      <p><strong>Descrição:</strong> {movie.fullplot}</p>
    </div>
  );
}

export default MovieDetail;
