const express = require("express")
const app = express();

app.get(`/api`, (req, res) => {
    res.json({"message": "Server works"});
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
