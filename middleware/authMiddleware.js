const jwt=require('jsonwebtoken');
const User=require('../models/User');

exports.protect= async(req,res,next)=>{
    try{
        let token=req.cookies.jwt;
        if(!token){
            return res.status(401).send('אינך מחובר נא להתחבר כדי לבצע פעולה זו');
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const currentUser= await User.findById(decoded.id);
        if(!currentUser){
            return res.status(401).send('המשתמש השייך לטוקן זה כבר אינו קיים');
        }
        req.user=currentUser;
        next();
    }catch(err){
        res.status(401).send('חלה שגיאה באימות המשתמש');
    } 
};

exports.entrepreneurOnly = (req, res, next) => {
    if (req.user && req.user.role === 'Entrepreneur') {
        next(); 
    } else {
        res.status(403).render('404', { message: "גישה נדחתה: דף זה מיועד למנהלים בלבד" });
    }
};

