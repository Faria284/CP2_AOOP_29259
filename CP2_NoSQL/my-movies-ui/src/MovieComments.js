import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './MovieComments.css';
import api from './api';

function MovieComments() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    api.get(`/comments/${id}`)
      .then(res => setComments(res.data))
      .catch(() => setComments([]));
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!name || !email || !newComment) return;

    const res = await api.post(`/comments/${id}`, {
      name,
      email,
      text: newComment
    });

    setComments([res.data, ...comments]);
    setNewComment('');
  };

  const toggleEdit = (id) => {
    const updated = comments.map(comment =>
      comment._id === id ? { ...comment, editing: true, editText: comment.text } : comment
    );
    setComments(updated);
  };
  
  const cancelEdit = (id) => {
    const updated = comments.map(comment =>
      comment._id === id ? { ...comment, editing: false } : comment
    );
    setComments(updated);
  };
  
  const handleSaveEdit = async (id) => {
    const comment = comments.find(c => c._id === id);
    try {
      const res = await api.put(`/comments/${id}`, {
        text: comment.editText
      });
  
      const updated = comments.map(c =>
        c._id === id ? { ...res.data, email: c.email } : c
      );
      setComments(updated);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };
  
  const handleDeleteComment = async (commentId) => {
    await api.delete(`/comments/${commentId}`);
    setComments(comments.filter(c => c._id !== commentId));
  };  

  return (
    <div className="comments-page">
      <Link to={`/movies/${id}`} className="back-button">← Back to Movie Details</Link>
      <h2>💬 Comments</h2>
  
      <form onSubmit={handleAddComment} className="comment-form">
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <textarea
          placeholder="Comment..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          required
        ></textarea>
        <button type="submit">Add Comment</button>
      </form>
  
      <ul className="comment-list">
        {comments.map(comment => (
          <li key={comment._id}>
            <p><strong>{comment.name}</strong> ({new Date(comment.date).toLocaleDateString()}):</p>
            <p>{comment.editing ? (
              <textarea
                value={comment.editText}
                onChange={e => {
                  const updated = comments.map(c => c._id === comment._id ? { ...c, editText: e.target.value } : c);
                  setComments(updated);
                }}
              />
            ) : (
              comment.text
            )}</p>
            {comment.email === email && (
              <div className="comment-actions">
                {comment.editing ? (
                  <>
                    <button onClick={() => handleSaveEdit(comment._id)}>💾 Save</button>
                    <button onClick={() => cancelEdit(comment._id)}>❌ Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => toggleEdit(comment._id)}>✏️ Edit</button>
                    <button onClick={() => handleDeleteComment(comment._id)}>🗑️ Delete</button>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );  
}

export default MovieComments;
