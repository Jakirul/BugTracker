const { init } = require("../db/mongoInit")
const { ObjectId } = require("mongodb");
const jwtDecode = require('jwt-decode')

class Tracker {
    constructor(data) {
        this.title = data.title,
            this.description = data.description,
            this.status = data.status,
            this.user = data.user
    }

    static get allBugs() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const allBugs = await db.collection("bugs").find({}).toArray();
                resolve(allBugs)

            } catch (e) {
                reject(`${e} - Cannot retrieve all known bugs`)
            }
        })
    }

    static newBug(title, description, status, user) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!title.trim() || !description.trim() || !status.trim() || !user.trim()) {
                    reject("Cannot keep fields empty!")
                }
                const db = await init();
                await db.collection("bugs").insertOne({ title: title, description: description, status: status, user: user })
                resolve("Successfully created a new bug report!")


            } catch (e) {
                reject(`${e} - Cannot create a new bug report`)
            }
        })
    }

    static bugsByUser(user) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const findByUser = await db.collection("bugs").find({ user: user }).toArray()
                resolve(findByUser)

            } catch (e) {
                reject(`${e} - Could not find a bug by this username`)
            }
        })
    }

    static getBugById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const getById = await db.collection("bugs").findOne({ _id: ObjectId(id) })
                resolve(getById)

            } catch (e) {
                reject(`${e} - Could not get a bug with this id`)
            }
        })
    }

    static appendComment(user, comment, id) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();

                if (!user.trim() || !comment.trim()) {
                    reject("Error - please try again later")
                }

                await db.collection("bugs").updateOne({ _id: ObjectId(id) }, { $push: { "comment": { user: user, comment: comment, timestamp: Date.now() } } })
                resolve("Successfully added a new comment!")

            } catch (e) {
                reject(`${e} - Could not append a new comment`)
            }
        })
    }

    static markBugResolved(req, id) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();

                let decode = jwtDecode(req.headers.authorization)
                console.log("DECODE = ", decode.username)

                let user = await db.collection("bugs").find({_id: ObjectId(id)}).toArray()
                if (user[0].user == decode.username) {
                    await db.collection("bugs").updateOne({ _id: ObjectId(id) }, { $set: { status: "Resolved" } })
                    resolve("Successfully marked this bug as resolved!")
                } else {
                    reject("Cannot mark this bug as resolved - please try again later")
                }

                

            } catch (e) {
                reject(`${e} - Could not mark bug as Resolved`)
            }
        })
    }
}

module.exports = Tracker;