const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/',authController.getLoginForm ); // הפניה לדף התחברות כברירת מחדל  
router.get('/login', authController.getLoginForm);
router.post('/login', authController.login);
router.get('/register', authController.getRegisterForm);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

module.exports = router;