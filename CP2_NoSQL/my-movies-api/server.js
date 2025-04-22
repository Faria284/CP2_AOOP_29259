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
    const movies = await Movie.find().limit(50);
    res.json(movies);
});

app.get('/api/movies/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  });
  
  app.listen(3001, () => console.log('Servidor a correr na porta 3001'));
