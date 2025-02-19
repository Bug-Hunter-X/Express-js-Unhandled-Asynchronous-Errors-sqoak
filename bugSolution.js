const express = require('express');
const app = express();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
  someAsyncOperation()
    .then(() => {
      res.send('Hello');
    })
    .catch(next);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Simulate an asynchronous operation that might throw an error
function someAsyncOperation() {
  return new Promise((resolve, reject) => {
    // Simulate a potential error
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
      reject(new Error('Something went wrong!'));
    } else {
      resolve();
    }
  });
} 