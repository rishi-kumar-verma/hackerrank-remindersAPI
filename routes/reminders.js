const router = require('express').Router();
const controller = require('../controllers/reminders');


router.post('/', controller.createReminder);
router.get('/', controller.getAllReminders);
router.get('/:id', controller.getReminder);
router.delete('/:id', controller.deleteReminder);
router.put('/:id', controller.updateReminder);
module.exports = router;
