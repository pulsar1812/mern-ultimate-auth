const express = require('express');

// Route files
const authRoutes = require('./routes/auth');

const app = express();

// Body parser
app.use(express.json());

// Mount routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
