const Tracker = require('../models/Tracker.js')

async function allBugs(req, res) {
    try {
        const tracker = await Tracker.allBugs;
        res.status(200).json(tracker)

    } catch (e) {
        res.status(404).json({'Error': e})
    }
}

async function newBug(req, res) {
    try {
        const {title, description, status, user} = req.body
        const newBug = await Tracker.newBug(title, description, status, user)
        res.status(200).json(newBug)

    } catch (e) {
        res.status(404).json({'Error': e})
    }
}

async function bugsByUser(req, res) {
    try {
        const {user} = req.query
        const bugsByUser = await Tracker.bugsByUser(user)
        res.status(200).json(bugsByUser)

    } catch (e) {
        res.status(404).json({'Error': `${e}`})
    }
}

module.exports = {allBugs, newBug, bugsByUser}
