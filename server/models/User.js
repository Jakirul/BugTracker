const { init } = require("../db/mongoInit.js");
const { ObjectId } = require("mongodb");

class User {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.passwordDigest = data.password_digest;
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        let db = await init();
        let result = await db.collection("users").find({}).toArray();
        let users = result.map((r) => new User(r));
        res(users);
      } catch (err) {
        rej(`Error retrieving users: ${err}`);
      }
    });
  }

  static create({ username, password }) {
    return new Promise(async (res, rej) => {
      try {
        const userExists = await User.findByUsername(username);

        if (!userExists.length) {
          let db = await init();
          let result = await db
            .collection("users")
            .insertOne({ username: username, password_digest: password });
          // let newUser = new User(result);
          res(result);
        } else {
          rej("Username taken");
        }
      } catch (err) {
        rej(`Error creating user: ${err}`);
      }
    });
  }

  static findByUsername(username) {
    return new Promise(async (res, rej) => {
      try {
        const db = await init();
        const result = await db
          .collection("users")
          .find({ username: username })
          .toArray();
        res(result);
      } catch (err) {
        rej(`Error retrieving user: ${err}`);
      }
    });
  }
}

module.exports = User;