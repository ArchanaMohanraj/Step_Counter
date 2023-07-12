const express = require('express');
const app = express();
const path = require('path');

// Static user list
const userList = [
  { id: 1, name: 'John Doe', stepCount: 5000 },
  { id: 2, name: 'Jane Smith', stepCount: 3000 },
  { id: 3, name: 'Alice Johnson', stepCount: 2000 },
  { id: 4, name: 'Allan', stepCount: 6000 },
  { id: 5, name: 'Rinku', stepCount: 3500 }
];

// API to fetch step count of a user
app.get('/api/user/:id/stepCount', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userList.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ stepCount: user.stepCount });
});

// API to update step count for a user
app.put('/api/user/:id/stepCount', express.json(), (req, res) => {
  const userId = parseInt(req.params.id);
  const user = userList.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { stepCount } = req.body;
  if (typeof stepCount !== 'number') {
    return res.status(400).json({ error: 'Invalid step count value' });
  }

  user.stepCount = stepCount;
  res.json({ message: 'Step count updated successfully' });
});

// Serve the frontend HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
