const mongoose = require('mongoose');

mongoose.connect('mongodb://92.88.170.100/Offres', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));
