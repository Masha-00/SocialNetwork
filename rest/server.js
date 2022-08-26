const mongoose = require('mongoose');
const app = require('./app');
const { MONGO_DB, PORT } = require('./config/config');

try {
  mongoose.connect(MONGO_DB).then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Connected to PORT ${PORT}`);
    });
  }).catch((err) => {
    console.log(err);
  });
} catch (err) {
  console.log('Database not connected', err);
}
