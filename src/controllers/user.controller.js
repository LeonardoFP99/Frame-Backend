const create = (req, res) => {
    const {name, username, email, password, avatar, background} = req.body;
    if (!name || !username || !email || !password || !avatar || !background) {
        return res.status(400).send({ message: "Submit all fields for registration" });
    }

    return res.status(201).send({
        message: "User created successfully",
        user: {
            name : name,
            username: username,
            email: email,
            avatar: avatar,
            background: background
        }
    })
}

module.exports = { create };