import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MovieList.css';

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
  
    axios.get('http://localhost:3001/api/movies', { params })
      .then(res => setMovies(res.data));
  }, [page, titleFilter, genreFilter]);  

  return (
    <div className="movie-list-container">
      <h1 className="movie-list-title">🎬 Lista de Filmes</h1>
      <div className="filters">
        <input
            type="text"
            placeholder="🔍 Procurar por título..."
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
        />
        <input
            type="text"
            placeholder="🎭 Filtrar por género..."
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
            🔎 Pesquisar
        </button>
        </div>
      <table className="movie-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Géneros</th>
            <th>IMDB</th>
            <th>Tomatoes</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td>
                <Link to={`/movies/${movie._id}`} className="movie-link">
                  {movie.title}
                </Link>
              </td>
              <td>{movie.genres?.join(', ') || 'N/A'}</td>
              <td>{movie.imdb?.rating || 'N/A'}</td>
              <td>{movie.tomatoes?.critic?.rating || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
        <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1}
        >
            ◀ Anterior
        </button>

        <span>Página {page}</span>

        <button
            onClick={() => setPage(p => p + 1)}
            disabled={movies.length < 50} // se receber menos de 50, provavelmente é a última
        >
            Próxima ▶
        </button>
        </div>
    </div>
  );
}

export default MovieList;