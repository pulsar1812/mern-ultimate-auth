const express = require('express');

const app = express();

// Body parser
app.use(express.json());

app.get('/api/signup', (req, res) => {
  res.json({
    data: 'You hit signup endpoint',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
