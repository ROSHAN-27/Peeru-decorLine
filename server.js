const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (make sure MongoDB is running locally)
mongoose.connect('mongodb://localhost:27017/peeru');

// Define a schema for quote requests
const QuoteSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  projectType: String,
  budget: String,
  timeline: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});
const Quote = mongoose.model('Quote', QuoteSchema);

// API endpoint to receive quote requests
app.post('/api/quotes', async (req, res) => {
  try {
    const quote = new Quote(req.body);
    await quote.save();
    res.status(201).json({ message: 'Quote saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save quote' });
  }
});

// (Optional) Get all quotes (for admin)
app.get('/api/quotes', async (req, res) => {
  const quotes = await Quote.find().sort({ createdAt: -1 });
  res.json(quotes);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));