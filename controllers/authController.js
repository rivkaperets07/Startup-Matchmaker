const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// פונקציה ליצירת טוקן
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};

// הצגת דף התחברות
exports.getLoginForm = (req, res) => {
    res.render('login', { errorMessage: null });
};

// התחברות (Login)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. בדיקה שהוזנו נתונים
        if (!email || !password) {
            return res.render('login', { errorMessage: 'נא להזין אימייל וסיסמה' });
        }

        // 2. מציאת המשתמש ובדיקת סיסמה
        const user = await User.findOne({ email });
        
        // תיקון לוגי: אם אין משתמש או שהסיסמה לא תואמת (bcrypt מחזיר false אם אין התאמה)
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('login', { errorMessage: 'אימייל או סיסמה שגויים' });
        }

        // 3. יצירת טוקן ושליחה ב-Cookie
        const token = signToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // יום אחד
        });

        res.redirect('/challenges');
    } catch (err) {
        console.error(err);
        res.status(500).send('שגיאת שרת');
    }
};

// הצגת דף הרשמה
exports.getRegisterForm = (req, res) => {
    res.render('register', { errorMessage: null });
};

// הרשמה (Register)
exports.register = async (req, res) => {
    try {
        // התאמה לשדות שבנינו ב-Schema: fullName במקום username
        const newUser = await User.create({
            fullName: req.body.fullName, 
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'Entrepreneur' // ברירת מחדל אם לא נבחר תפקיד
        });

        // יצירת טוקן מיד לאחר ההרשמה
        const token = signToken(newUser._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });

        res.redirect('/index');
    } catch (err) {
        console.error("שגיאה בזמן יצירת משתמש:", err);
        res.render('register', { 
            errorMessage: 'ההרשמה נכשלה. ייתכן שהאימייל כבר קיים במערכת.' 
        });
    }
};

// התנתקות (Logout)
exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000), // פוקע תוך 10 שניות
        httpOnly: true
    });
    res.redirect('/challenges');
};

