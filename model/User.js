const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    hasAccountCreated: {
      type: Boolean,
      default: false
    },
    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)
// Create A Model
const User = mongoose.model("User",userSchema);
module.exports= User;
