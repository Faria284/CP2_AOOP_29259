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

app.get('/api/movies', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 50;
    const skip = (page - 1) * limit;
  
    const movies = await Movie.find().skip(skip).limit(limit);
    res.json(movies);
});

app.get('/api/movies/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  });
  
  app.listen(3001, () => console.log('Servidor a correr na porta 3001'));
