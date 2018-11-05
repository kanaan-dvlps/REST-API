const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true},
  email: { type: String, required: true, trim: true},
  balance: { type: Number, default: 0}
});

CustomerSchema.plugin(timestamp); // the user model will now have createdAt and updateAt added to it wich will be added to the document when we save it(it will be Automatically added)
const Customer = mongoose.model('Customer', CustomerSchema); //This will tell the mongoose ODM the name of the model and it's related model
module.exports = Customer; // Export this model with this piece of code