const express = require("express");

const app = express();

app.use(express.static("./client"));

app.get("/api/time", (req, res) => {
    res.send(new Date().toISOString());
});


var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});