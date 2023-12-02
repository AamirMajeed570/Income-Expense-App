const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    accountType: {
      type: String,
      enum: [
        'Savings',
        'Investment',
        'Checking',
        'Current',
        'Credit Card',
        'Loan',
        'Uncategorized',
        'School',
        'Project',
        'Education',
        'Entertainment'
      ],
      required:true,
    },
    initialBalance: {
      type: Number,
      default:0,
    },
    hasAccountCreated: {
      type: Boolean,
      default: false
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
      }
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    notes:{
        type:String,
        required:true,
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)
// Create A Model
const Account = mongoose.model('Account', accountSchema)
module.exports = Account
