const Interest = require('../models/Interest');
const User = require('../models/User'); 
const Startup = require('../models/Startups');
const mongoose = require('mongoose');
// שליפת כל הבקשות (בדרך כלל למנהל המערכת או לבעל הסטארטאפ)
exports.getAllInterests = async (req, res) => {
    try {
        // שימוש ב-populate כדי למשוך את פרטי המשתמש והפרויקט במקום רק ID
        const interests = await Interest.find()
            .populate('userId', 'fullName email') 
            .populate('projectId', 'startupName'); 
            console.log("Fetched interests with populated data:", interests); // בדיקה לוגית    
        res.render('interests', { interests, user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send('שגיאה בשליפת הנתונים');
    }
};
exports.getNewForm = async (req, res) => {
    try {
        const startupName = req.query.startupName;
        const projectId = req.query.projectId;
        res.render('newInterest', { startupName, projectId, user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send('שגיאה בשליפת הטופס');
    }
};


// יצירת בקשת עניין חדשה (שליחה מצד משתמש)
exports.createInterest = async (req, res) => {
    try {
        const interestData = {
            projectId: req.body.projectId,
            userId: req.user._id, // המשתמש המחובר הוא זה שמתעניין
            type: req.body.type || 'Partner',
            status: 'Pending',
            message: req.body.message,
            contactInfo: {
                email: req.user.email, // לוקח אוטומטית את האימייל של המשתמש המחובר
                phone: req.body.phone
            }
        };

        const newInterest = new Interest(interestData);
        await newInterest.save();
        
        res.redirect('/index'); // חזרה לדף הסטארטאפים אחרי שליחה
    } catch (err) {
        console.error("שגיאה ביצירת בקשת עניין:", err);
        res.status(400).send('שגיאה בשליחת הבקשה');
    }
};

// עדכון סטטוס בקשה (למשל, בעל הסטארטאפ מאשר או דוחה)
exports.updateInterestStatus = async (req, res) => {
    try {
        const { status } = req.body; // מקבל 'Approved' או 'Rejected'
        await Interest.findByIdAndUpdate(req.params.id, { status });
        
        res.redirect('/interests');
    } catch (err) {
        res.status(400).send('שגיאה בעדכון הסטטוס');
    }
};

// מחיקת בקשה
exports.deleteInterest = async (req, res) => {
    try {
        await Interest.findByIdAndDelete(req.params.id);
        res.redirect('/interests');
    } catch (err) {
        res.status(500).send('שגיאה במחיקת הבקשה');
    }
};

exports.getInterests = async (req, res) => {
    try {
        const userId = req.user._id;
        const myStartups = await Startup.find({ ownerId: userId });
        const myStartupIds = myStartups.map(s => s._id);
       interests = await Interest.find({ projectId: { $in: myStartupIds } })
       .populate('projectId')
       .populate('userId');
    
        res.render('interests', { interests, user: req.user });
    } catch (err) {
        
        res.status(500).send('שגיאה בשליפת הבקשות');
    }
};