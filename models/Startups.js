const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  startupName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  elevatorPitch: {
    type: String,
    required: true
  },
  // הגדרה של מערך של מחרוזות (Strings) עבור ה-lookingFor
  lookingFor: {
    type: [String],
    default: []
  },
  // הגדרה של אובייקט פנימי עבור ה-stats
  stats: {
    interestedCount: {
      type: Number,
      default: 0
    },
    investorViews: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }}, {collection:'Startups'  }
);

module.exports = mongoose.model('Startup', startupSchema, 'Startups'); // ציון שם האוסף במפורש