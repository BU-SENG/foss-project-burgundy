const Router = require('express');
const { selectFeeling, getAllUsers, sendRequest, acceptRequest, rejectRequest, getPendingRequests } = require('../controllers/userController');
const protectUser = require('../middleware/protectUser');
const router = Router();

router.post('/select-feeling', protectUser, selectFeeling);
router.get('/all', protectUser, getAllUsers);
router.post('/send-request/:targetId', protectUser, sendRequest);
router.post('/accept/:senderId', protectUser, acceptRequest);
router.post('/reject/:senderId', protectUser, rejectRequest);
router.get('/pending-requests', protectUser, getPendingRequests);

module.exports = router;