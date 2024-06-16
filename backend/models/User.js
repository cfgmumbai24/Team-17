const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  clerkId: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("users", UserSchema);
