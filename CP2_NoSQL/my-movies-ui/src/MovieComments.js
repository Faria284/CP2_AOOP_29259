import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './MovieComments.css';

function MovieComments() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3001/api/comments/${id}`)
      .then(res => setComments(res.data))
      .catch(() => setComments([]));
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!name || !email || !newComment) return;

    console.log("A enviar comentário para:", `http://localhost:3001/api/comments/${id}`);

    const res = await axios.post(`http://localhost:3001/api/comments/${id}`, {
      name,
      email,
      text: newComment
    });

    setComments([res.data, ...comments]);
    setNewComment('');
  };

  return (
    <div className="comments-page">
      <Link to={`/movies/${id}`} className="back-button">← Voltar ao filme</Link>
      <h2>💬 Comentários</h2>

      <form onSubmit={handleAddComment}>
        <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <textarea
          placeholder="Comentário..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          required
        ></textarea>
        <button type="submit">Adicionar Comentário</button>
      </form>

      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            <p><strong>{comment.name}</strong> ({new Date(comment.date).toLocaleDateString()}):</p>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieComments;
