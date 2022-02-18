const {init} = require("../db/mongoInit")

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
                const addBug = await db.collection("bugs").insertOne({title: title, description: description, status: status, user: user})
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
                const findByUser = await db.collection("bugs").find({user: user}).toArray()
                resolve(findByUser)

            } catch (e) {
                reject(`${e} - Could not find a bug by this username`)
            }
        })
    }
}

module.exports = Tracker;