
const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true
}).then(async () => {
  console.log('MongoDB Connected');

}).catch(err => console.log('MongoDB::', err));

