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
}

module.exports = Tracker;