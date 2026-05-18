const express = require('express');
const router = express.Router();
const startupController = require('../controllers/stratupsController');
const { protect } = require('../middleware/authMiddleware');

// הצגת כל הסטארטאפים (דף הבית של הסטארטאפים)
router.get('/', startupController.getAllStartups);

// דף ליצירת סטארטאפ חדש
router.get('/new', protect, startupController.getNewForm);

// יצירת הסטארטאפ (שליחת הטופס)
router.post('/', protect, startupController.createStartup);

// דף עריכת סטארטאפ קיים
router.get('/edit/:id', protect, startupController.getEditForm);

// עדכון הסטארטאפ (שליחת טופס העריכה)
router.post('/:id/update', protect, startupController.updateStartup);

// מחיקת סטארטאפ
router.post('/:id/delete', protect, startupController.deleteStartup);

module.exports = router;