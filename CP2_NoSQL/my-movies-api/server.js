require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO)

const movieSchema = new mongoose.Schema({}, { collection: 'movies', strict: false});
const Movie = mongoose.model('Movie', movieSchema);

const commentSchema = new mongoose.Schema({}, { collection: 'comments', strict: false });
const Comment = mongoose.model('Comment', commentSchema);

app.get('/api/movies', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 50;
    const skip = (page - 1) * limit;
  
    const title = req.query.title?.trim();
    const genre = req.query.genre?.trim();
  
    const filter = {};
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }
    if (genre) {
        filter.genres = { $regex: genre, $options: 'i' }; 
    }      
  
    const movies = await Movie.find(filter).skip(skip).limit(limit);
    res.json(movies);
});  

app.get('/api/movies/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
});

// Comentários
app.get('/api/comments/:id', async (req, res) => {
  const movieId = new mongoose.Types.ObjectId(req.params.id);
  const comments = await Comment.find({ movie_id: movieId }).sort({ date: -1 });
  res.json(comments);
});

app.post('/api/comments/:id', async (req, res) => {
  try {
    const { name, email, text } = req.body;

    // Verifica se o id é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID inválido do filme.' });
    }

    const comment = new Comment({
      name,
      email,
      text,
      date: new Date(),
      movie_id: new mongoose.Types.ObjectId(req.params.id)
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error);
    res.status(500).json({ error: 'Erro ao adicionar comentário.' });
  }
});


app.delete('/api/comments/:commentId', async (req, res) => {
  await Comment.findByIdAndDelete(req.params.commentId);
  res.status(204).end();
});

app.listen(3001, () => console.log('Servidor a correr na porta 3001'));
