const User = require('../models/User');

// route to fetch all the users and their information (likely admin feature)
async function all (req, res) {
    try {
        const users = await User.all
        res.status(200).json(users)
    } catch(err){
        res.status(500).json({err})
    }
}

async function findByUsername (req, res) {
    try {
        const user = await User.findByUsername(req.params.username)
        
        if (user.length) {
            res.status(200).json(user)
        } else {
            throw new Error("Could not find a user with these credentials")
        }
        
    } catch(err){
        res.status(500).json({"Error": err.message})
    }
}

module.exports = {all, findByUsername}