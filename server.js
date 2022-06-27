const express = require("express");
const router = require('./server/Routes/index');
const sequelize = require('./db');
const models = require('./server/Models/models');
const { authentication } = require("./server/Middleware/authentication");

const port = 5000;

const app = express();

app.use(express.json());
app.use(authentication());

app.use('/api', router);
app.get(`/api`, (req, res) => {
    res.json({"message": "Server works"});
});

const start = async() => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (e) {
        console.log(`error ${e}`);
    }
}


start();
