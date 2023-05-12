const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require("crypto")

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/comments', (req, res) => res.status(200).send(commentsByPostId))

app.get('/posts/:id/comments', (req, res) => commentsByPostId[req.params.id] ? res.status(200).send(commentsByPostId[req.params.id]) : res.status(404).send({ msg: "Post Não Encontrado" }));

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments

  res.status(201).send(comments);

});

app.listen(4001, () => {
  console.log("Listem Service Comments in 4001");
});