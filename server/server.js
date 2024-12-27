// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// // In-memory data storage
// const users = ['yash', 'sam', 'aman', 'harsh'];
// const kudosTypes = ['Helping Hand', 'Excellence', 'Above and Beyond', 'Client Focus'];
// const kudos = [];

// // Get all users
// app.get('/api/users', (req, res) => {
//   res.json(users);
// });

// // Get all kudos types
// app.get('/api/kudos-types', (req, res) => {
//   res.json(kudosTypes);
// });

// // Get all kudos
// app.get('/api/kudos', (req, res) => {
//   res.json(kudos);
// });

// // Add a new kudo
// app.post('/api/kudos', (req, res) => {
//   const { from, to, type, message } = req.body;
//   if (!from || !to || !type || !message) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }
//   const newKudo = { from, to, type, message, timestamp: new Date() };
//   kudos.push(newKudo);
//   res.status(201).json(newKudo);
// });

// // Get analytics data
// app.get('/api/analytics', (req, res) => {
//   const kudosByType = kudosTypes.map(type => ({
//     type,
//     count: kudos.filter(kudo => kudo.type === type).length
//   }));
//   const kudosByUser = users.map(user => ({
//     user,
//     given: kudos.filter(kudo => kudo.from === user).length,
//     received: kudos.filter(kudo => kudo.to === user).length
//   }));
//   res.json({ kudosByType, kudosByUser });
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3001;

// MongoDB URI (replace with your MongoDB connection URI)
const uri = 'mongodb://localhost:27017/kudospot';  // Your URI pointing to 'kudospot' database
const dbName = 'kudospot'; // The database name should be 'kudospot' as per your setup
const client = new MongoClient(uri);

let usersCollection;

// MongoDB connection
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    usersCollection = db.collection('users'); // 'users' collection in your database
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

app.use(cors());
app.use(express.json());

// Default kudos types (unchanged)
const kudosTypes = ['Helping Hand', 'Excellence', 'Above and Beyond', 'Client Focus'];
const kudos = [];

// Get all users (from MongoDB)
app.get('/api/users', async (req, res) => {
  try {
    // Fetch all users from the MongoDB collection
    const users = await usersCollection.find().toArray();
    
    // If no users found
    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    // Return the list of user names from the fetched users
    res.json(users.map(user => user.name));  // Only return names of users
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users from the database' });
  }
});

// Get all kudos types (unchanged)
app.get('/api/kudos-types', (req, res) => {
  res.json(kudosTypes);
});

// Get all kudos (unchanged)
app.get('/api/kudos', (req, res) => {
  res.json(kudos);
});

// Add a new kudo (unchanged)
app.post('/api/kudos', (req, res) => {
  const { from, to, type, message } = req.body;
  if (!from || !to || !type || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const newKudo = { from, to, type, message, timestamp: new Date() };
  kudos.push(newKudo);
  res.status(201).json(newKudo);
});

// Get analytics data (unchanged)
app.get('/api/analytics', (req, res) => {
  const kudosByType = kudosTypes.map(type => ({
    type,
    count: kudos.filter(kudo => kudo.type === type).length
  }));
  const kudosByUser = usersCollection.find().toArray().then(users => {
    return users.map(user => ({
      user: user.name,
      given: kudos.filter(kudo => kudo.from === user.name).length,
      received: kudos.filter(kudo => kudo.to === user.name).length
    }));
  });

  Promise.all([kudosByUser]).then(([kudosByUser]) => {
    res.json({ kudosByType, kudosByUser });
  }).catch(error => {
    res.status(500).json({ error: 'Error fetching analytics' });
  });
});

// Initialize MongoDB connection
connectToMongoDB();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
