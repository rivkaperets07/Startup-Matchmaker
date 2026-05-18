const express = require('express');
const router = express.Router();
const interestController = require('../controllers/InterestController');
const { protect,entrepreneurOnly } = require('../middleware/authMiddleware');


router.get('/',protect, entrepreneurOnly, interestController.getInterests);
router.post('/', protect, interestController.createInterest);
router.get('/new', protect, interestController.getNewForm);
router.patch('/:id/status', protect, interestController.updateInterestStatus);
router.delete('/:id', protect, interestController.deleteInterest);

module.exports = router;