const Tracker = require('../models/Tracker.js')

async function allBugs(req, res) {
    try {
        const tracker = await Tracker.allBugs;
        res.status(200).json(tracker)

    } catch (e) {
        res.status(404).json({ 'Error': e })
    }
}

async function newBug(req, res) {
    try {
        const { title, description, status, user } = req.body
        const newBug = await Tracker.newBug(title, description, status, user)
        res.status(200).json(newBug)

    } catch (e) {
        res.status(404).json({ 'Error': e })
    }
}

async function bugsByUser(req, res) {
    try {
        const { user } = req.query
        const bugsByUser = await Tracker.bugsByUser(user)
        res.status(200).json(bugsByUser)

    } catch (e) {
        res.status(404).json({ 'Error': `${e}` })
    }
}

async function getBugById(req, res) {
    try {
        const { id } = req.params
        const bugsById = await Tracker.getBugById(id)
        res.status(200).json(bugsById)

    } catch (e) {
        res.status(404).json({ 'Error': `${e}` })
    }
}

async function appendComment(req, res) {
    try {
        const { user, comment } = req.body
        const { id } = req.params
        const appendComment = await Tracker.appendComment(user, comment, id)
        res.status(200).json(appendComment)
    } catch (e) {
        res.status(200).json({'Error': `${e}`})
    }
}

async function markBugResolved(req, res) {
    try {
        const {id} = req.params
        const markAsResolved = await Tracker.markBugResolved(req, id)
        res.status(200).json(markAsResolved)

    } catch (e) {
        res.status(200).json({'Error': `${e}`})
    }
}

async function filterSearch(req, res) {
    try {
        const {value} = req.params
        const filterSearch = await Tracker.filterSearch(value)
        res.status(200).json(filterSearch)
    } catch (e) {
        res.status(200).json({'Error': `${e}`})
    }
}

async function deleteBugPost(req, res) {
    try {
        const {id} = req.params
        const deletePost = await Tracker.deleteBugPost(req, id)
        res.status(200).json(deletePost)

    } catch (e) {
        res.status(200).json({'Error': `${e}`})
    }
}

module.exports = { allBugs, newBug, bugsByUser, getBugById, appendComment, markBugResolved, filterSearch, deleteBugPost }
