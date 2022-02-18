const { init } = require("../db/mongoInit.js");
const { ObjectId } = require("mongodb");

class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.passwordDigest = data.password_digest;
  }

  static get all() {
    return new Promise(async (resolve, reject) => {
      try {
        let db = await init();
        let result = await db.collection("users").find({}).toArray();
        let users = result.map((r) => new User(r));
        resolve(users);
      } catch (err) {
        reject(`Error retrieving users: ${err}`);
      }
    });
  }

  static create({ username, password }) {
    return new Promise(async (resolve, reject) => {
      try {
        const userExists = await User.findByUsername(username);

        if (!userExists.length) {
          let db = await init();
          let result = await db
            .collection("users")
            .insertOne({ username: username, password_digest: password });
          // let newUser = new User(result);
          resolve(result);
        } else {
          reject("Username taken");
        }
      } catch (err) {
        reject(`Error creating user: ${err}`);
      }
    });
  }

  static findByUsername(username) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await init();
        const result = await db
          .collection("users")
          .find({ username: username })
          .toArray();
        resolve(result);
      } catch (err) {
        reject(`Error retrieving user: ${err}`);
      }
    });
  }
}

module.exports = User;