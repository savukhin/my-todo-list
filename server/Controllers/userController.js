const { User } = require('../Models/models')
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'asdfyev dfasodnfuiqepon!#@$eufnfod qewp oih dpfpasubdf'


function generateToken(user) {
    const token = jwt.sign(
        {
            id: user.id,
            username: user.email
        },
        JWT_SECRET
    );
    return token;
}

async function register(req, res) {
    console.log(req.body)
    const { username, password, email } = req.body;
    console.log(`Username is ${username} pass ${password}`)

    try {
        const user = await User.create({
            username: username,
            email: email,
            password: password
        })
        console.log(`create successfull`, user);
        const token = generateToken(user);
        return res.status(200).json({ token: token });
    } catch (error) {
        console.log(`register error ${error}`);
        return res.status(400).json({ error: "Key is already exists" });
    }

    res.json(req.body);
}

async function login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: {
            username: username,
            password: password
        },
        raw: true
    });

    if (!user)
        return res.status(400).json({ error: 'User not found' });

    res.json({ token: generateToken(user) });
}

async function checkToken(req, res) {
    let { token } = req.body;

    let verification;
    try {
        verification = jwt.verify(token, JWT_SECRET);
    } catch {
        return res.status(400).json({ error: 'unvalid token' });
    }
    
    let user;
    try {
        user = await User.findOne({
            where: {
                id: verification.id
            }
        });
    } catch (error) {
        return res.status(400).json({ error: 'User not found' });
    }

    if (!user)
        return res.status(400).json({ error: 'User not found' });

    res.status(200).json({ user });
}

async function changePassword(req, res) {
    const { token } = req.body;
    
    const existing = await User.findOne(
        { where: { id: 1 } }
    );

    console.log(" try to update to newpassword ", req.body.newPassword, " from ", existing.password);
    
    try {
        const user = jwt.verify(token, JWT_SECRET);
        await User.update(
            { password: req.body.newPassword },
            { where: { id: user.id } }
        )
        .then(result =>
            console.log('success', result)
        )
        .catch(err =>
            console.log(err)
        )
        console.log("JWT decoded", user);
    } catch {
        return res.json({ status: 'error', error: 'unvalid token' });
    }


    return res.json({ status: "ok" })
}

module.exports = {
    register,
    login,
    changePassword,
    checkToken,

};