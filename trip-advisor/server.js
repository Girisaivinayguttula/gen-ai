const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

mongoose.connect('mongodb://localhost:27017/tripadvisor', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const reviewSchema = new mongoose.Schema({
  place: String,
  review: String,
  rating: Number
});

const Review = mongoose.model('Review', reviewSchema);

app.get('/api/reviews', async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
});

app.post('/api/reviews', async (req, res) => {
  const newReview = new Review(req.body);
  await newReview.save();
  res.json(newReview);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
