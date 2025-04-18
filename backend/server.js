// File: backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // body parser

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema & Model
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
const Student = mongoose.model('Student', studentSchema);

// Routes
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/students', async (req, res) => {
  const { name, age } = req.body;
  const newStudent = new Student({ name, age });
  await newStudent.save();
  res.json({ message: 'Student added!' });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));