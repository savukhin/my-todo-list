const { User, Task } = require('../Models/models')
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

    if (await User.findOne({ where: { email } }))
        return res.status(400).json({ status: 400, errors: [ { msg: "User with this email is already exists" } ] });

    if (await User.findOne({ where: { username } }))
        return res.status(400).json({ status: 400, errors: [ { msg: "User with this username is already exists" } ] });

    try {        
        const user = await User.create({
            username: username,
            email: email,
            password: password
        })
        console.log(`create successfull`, user);
        const token = generateToken(user);
        return res.status(200).json({ status: 200, token: token });
    } catch (error) {
        console.log(`register error ${error}`);
        return res.status(500).json({ status: 500, errors: [ { msg: "Unexcpected error" } ] });
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
        return res.status(400).json({ status: 400, errors: [ { msg: 'User not found with this login/password' } ] });
    
    return res.json({ status: 200, token: generateToken(user) });
}

async function checkToken(req, res) {
    if (!req.user)
        return res.status(400).json({ status: 400, errors: [ { msg: 'Invalide token!' } ] });

    return res.status(200).json({ status: 200, user: req.user });
}

async function changePassword(req, res) {
    req.user.password = req.body.new_password;
    req.user.save();

    return res.json({ status: 200 })
}



async function uploadPhoto(req, res) {
    const url = req.protocol + '://' + req.get('host')
    req.user.avatar = url + '/uploads/' + req.file.filename;
    req.user.save().then(result => {
        res.status(200).json({ status: 200, data: "Photo updated" })
    }).catch(err => {
        console.log(err);
        res.status(500).json({ status: 500, errors: [ { msg: err } ] });
    })
}

async function getUser(req, res) {
    const { user_id } = req.body;
    
    const user = await User.findOne({
        where: {
            id: user_id
        },
        raw: true
    });

    if (!user)
        return res.status(400).json({ status: 400, error: [ { msg: "User not found" } ] });

    const countOfActiveTasks = await Task.count({
        where: {
            userId: user.id
        }
    })

    user.countOfActiveTasks = countOfActiveTasks;

    return res.status(200).json({ status: 200, user: user });
}

module.exports = {
    register,
    login,
    changePassword,
    checkToken,
    uploadPhoto,
    getUser
};