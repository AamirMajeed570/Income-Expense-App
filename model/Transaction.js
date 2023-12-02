const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    transactionTypes: {
      type: String,
      enum: ['Income', 'Expenses'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      enum: [
        'Food',
        'Health',
        'Entertainment',
        'Shopping',
        'Utilities',
        'Education',
        'Personal',
        'Grocery',
        'Bills',
        'Travel',
        'Transportation',
        'Uncategorized'
      ],
      required: true
    },
    color: {
      type: String
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required:true,
    },
    date: {
      type: Date,
      default: Date.now()
    },
    notes: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)
// Create A Model
const Transaction = mongoose.model('Transaction', transactionSchema)
module.exports = Transaction
