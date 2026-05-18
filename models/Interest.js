const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
  // קישור למודל של הפרויקטים
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Startup', // השם של המודל שאליו מקשרים
    required: true
  },
  // קישור למודל של המשתמשים
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // השם של המודל שאליו מקשרים
    required: true
  },
  type: {
    type: String,
    enum: ['Partner', 'Investor', 'Employee'], // דוגמה לערכים אפשריים
    default: 'Partner'
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  message: {
    type: String
  },
  // אובייקט לקובץ קורות חיים (למשל URL ושם קובץ)
  cvFile: {
    url: String,
    fileName: String
  },
  // אובייקט לפרטי קשר
  contactInfo: {
    email: String,
    phone: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'Interest' });

module.exports = mongoose.model('Interest', interestSchema,'Interest');