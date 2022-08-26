const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PORT, MONGO_DB } = require('./config/config');
const CustomError = require('./errors');

// Express APIs
const users = require('./routes/user.routes');
const posts = require('./routes/post.routers');
const comments = require('./routes/comment.routers');

// Express settings
const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false,
// }));
app.use(cors());

app.get('/info', (req, res) => {
  res.json({ status: 'OK' });
});

app.use('/users', users);
app.use('/posts', posts);
app.use('/', comments);

app.use((req, res, next) => {
  next(new CustomError().notFound('Page not found'));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.code).json(err);
});

module.exports = app;
