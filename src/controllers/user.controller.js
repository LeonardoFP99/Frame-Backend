const userService = require('../services/user.service');

const create = async (req, res) => {
    const {name, username, email, password, avatar, background} = req.body;
    if (!name || !username || !email || !password || !avatar || !background) {
        return res.status(400).send({ message: "Submit all fields for registration" });
    }

    const user = await userService.create(req.body);

    if (!user){
        return res.status(400).send({message: "Error creating user"});
    }

    return res.status(201).send({
        message: "User created successfully",
        user: {
            id: user._id,
            name : name,
            username: username,
            email: email,
            avatar: avatar,
            background: background
        }
    });
}

module.exports = { create };