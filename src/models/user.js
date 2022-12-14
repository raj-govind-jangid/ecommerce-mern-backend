const mongoose = require('mongoose')
const { Schema } = mongoose;

const user = new Schema({
  fullname: String,
  email: {
    type: String,
    unique: true,
    required: true
  }, 
  password: String,
  userType: Number,
});

const User = mongoose.model('User', user);

module.exports = User;