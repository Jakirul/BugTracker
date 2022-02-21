const bugTrackerController = require('../controllers/bugTracker')
const usersController = require('../controllers/users')
const authController = require('../controllers/auth')
const {verifyToken} = require('../middleware/auth.js')
const express = require('express')
const router = express.Router();
const cors = require('cors')
router.use(express.json());
router.use(cors())


router.get('/', bugTrackerController.allBugs)
router.get('/get', bugTrackerController.bugsByUser)
router.get('/view/:id', bugTrackerController.getBugById)
router.get('/filter/:value', bugTrackerController.filterSearch)
router.post('/new', bugTrackerController.newBug)
router.put('/comment/:id', bugTrackerController.appendComment)
router.put('/bug/:id', verifyToken, bugTrackerController.markBugResolved)
router.delete('/delete/:id', verifyToken, bugTrackerController.deleteBugPost)

router.post('/login', authController.login)
router.post('/register', authController.register)

router.get('/user/all', usersController.all)
router.get('/user/:username', usersController.findByUsername)

module.exports = router;