const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const models = require("./models");

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

app.get("/users", (req, res) => {
    res.json(models.userListModel());
});

app.get("/users/:userId", (req, res) => {
    const user = models.userModel(req.params.userId);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
});

app.get("/photos/:userId", (req, res) => {
    res.json(models.photoOfUserModel(req.params.userId));
});

app.get("/schema", (req, res) => {
    res.json(models.schemaInfo());
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
