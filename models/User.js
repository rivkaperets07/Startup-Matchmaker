const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'חובה להזין שם מלא']
  },
  email: {
    type: String,
    required: [true, 'חובה להזין אימייל'],
    unique: true // מומלץ לאימייל כדי למנוע כפילויות
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Entrepreneur', 'Investor', 'Developer'], // ניתן להגביל לתפקידים ספציפיים
    required: true
  },
  bio: {
    type: String
  },
  // מערך של מחרוזות עבור הכישורים
  skills: {
    type: [String],
    default: []
  },
  linkedInUrl: {
    type: String
  },
  profileImage: {
    type: String
  },
  // אובייקט פנימי עבור העדפות המשתמש
  preferences: {
    isOpenToRelocation: {
      type: Boolean,
      default: false
    },
    lookingFor: {
      type: String
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function() {
    if(!this.isModified('password'))return;
    this.password=await bcrypt.hash(this.password,12)
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        throw err; 
    }
},collection='User');

module.exports=mongoose.model('User',userSchema,'User');