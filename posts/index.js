const express = require('express');
const parser = require('body-parser')
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(parser.json());
app.use(cors());

const posts = {};

app.get('/posts', (request, response) => {
  response.send(posts);
});

app.post('/posts', (request, response) => {
  const id = randomBytes(4).toString('hex');
  const { title } = request.body;

  posts[id] = {
    id, title
  };

  response.status(201).send(posts[id]);

});

app.listen(4000, () => {
  console.log("Listem on 4000 🚀🚀")
});