import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/movies')
      .then(res => setMovies(res.data));
  }, []);

  return (
    <div>
      <h1>Filmes</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
