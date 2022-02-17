const Tracker = require('../models/Tracker.js')

async function allBugs(req, res) {
    try {
        const tracker = await Tracker.allBugs;
        res.status(200).json(tracker)

    } catch (e) {
        res.status(404).json({'Error': e})
    }
}

module.exports = {allBugs}
