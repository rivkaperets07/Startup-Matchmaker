const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const User = require('./models/User');

const authRouters = require('./routers/authRouters');
const startupsRouters = require('./routers/startupsRouters');
const interestRouters = require('./routers/interestRouters');

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('Connection error:', err));

app.use(async (req, res, next) => {
    const token = req.cookies.jwt;
    res.locals.user = null; 

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const currentUser = await User.findById(decoded.id);
            res.locals.user = currentUser;
            req.user = currentUser;
        } catch (err) {
            res.clearCookie('jwt');
        }
    }
    next();
});


app.use('/', authRouters); 
app.use('/index', startupsRouters);
app.use('/interests', interestRouters);

app.use((req, res) => {
    res.status(404).render('404', { title: 'הדף לא נמצא' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});