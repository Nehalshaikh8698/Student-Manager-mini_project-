// === FRONTEND (React) ===
// File: frontend/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get('http://localhost:5000/students');
    setStudents(res.data);
  };

  const addStudent = async () => {
    await axios.post('http://localhost:5000/students', { name, age });
    fetchStudents();
    setName('');
    setAge('');
  };

  return (
    <div
    id='main'
    style={{ padding: '20px' }}>
      <h2>Student Manager</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <button onClick={addStudent}>Add Student</button>

      <ul>
        {students.map((s, index) => (
          <li key={index}>{s.name} ({s.age} yrs)</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
