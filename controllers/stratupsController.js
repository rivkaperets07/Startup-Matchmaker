const Startup = require('../models/Startups'); 

// שליפת כל הסטארטאפים
exports.getAllStartups = async (req, res) => {
    try {
        const startups = await Startup.find();
        res.render('index', { startups, user: req.user });
    } catch (err) {
    // זה ידפיס לך בטרמינל (ב-VS Code) את הסיבה המדויקת
    console.log("--- שגיאת DB מפורטת: ---");
    console.error(err); 
    
    // זה ישלח לדפדפן את השגיאה כדי שתוכלי לקרוא אותה שם
    res.status(500).render('index', { 
        startups: [], 
        user: req.user, 
        errorMessage: "בעיה בחיבור לנתונים: " + err.message 
    });
}
};

// הצגת טופס ליצירת סטארטאפ חדש
exports.getNewForm = (req, res) => {
    res.render('newStartup');
};

// יצירת סטארטאפ חדש
exports.createStartup = async (req, res) => {
    try {
        // בגלל שבמודל שלנו יש אובייקטים מורכבים (stats, lookingFor), 
        // כדאי לוודא שהנתונים מהטופס מגיעים במבנה הנכון או לבנות אותם כאן:
        const startupData = {
            startupName: req.body.startupName,
            category: req.body.category,
            ownerId: req.user ? req.user._id : req.body.ownerId, // שימוש ב-ID של המשתמש המחובר
            elevatorPitch: req.body.elevatorPitch,
            lookingFor: req.body.lookingFor, // אם זה מגיע כרשימה מהטופס
            stats: {
                interestedCount: 0,
                investorViews: 0
            }
        };

        const newStartup = new Startup(startupData);
        await newStartup.save();
        res.redirect('/index');
    } catch (err) {
        console.error("שגיאה ביצירת סטארטאפ:", err);
        res.status(400).send('שגיאה ביצירת סטארטאפ');
    }
};

// הצגת טופס עריכה
exports.getEditForm = async (req, res) => {
    try {
        const startup = await Startup.findById(req.params.id);
        if (!startup) {
            return res.status(404).send('סטארטאפ לא נמצא');
        }
        res.render('editStartup', { startup });
    } catch (err) {
        res.status(404).send('שגיאה בטעינת הטופס');
    }
};

// עדכון סטארטאפ
exports.updateStartup = async (req, res) => {
    try {
        // findByIdAndUpdate מעדכן את השדות שנשלחו ב-req.body
        await Startup.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.redirect('/index');
    } catch (err) {
        res.status(400).send('שגיאה בעדכון');
    }
};

// מחיקת סטארטאפ
exports.deleteStartup = async (req, res) => {
    try {
        await Startup.findByIdAndDelete(req.params.id);
        res.redirect('/index');
    } catch (err) {
        res.status(500).send('שגיאה במחיקה');
    }
};