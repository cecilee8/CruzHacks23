require("dotenv").config();
const crypto = require("crypto");
const express = require("express");
const tedious = require("tedious");

var port = process.env.PORT || 8080;
const app = express();

var connection = new tedious.Connection({
    server: 'slugbored.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD
        }
    },
    options: {
        database: 'SlugBored',
        trustServerCertificate: true,
        encrypt: true,
        rowCollectionOnRequestCompletion: true
    }
});

app.use(express.static("./client/"));
app.use(express.urlencoded({ extended: true }));

function executeSqlAsync(sql, parameters) {
    return new Promise((resolve, reject) => {
        var request = new tedious.Request(sql, (error, rowCount, rows) => {
            if (error) reject(error);
            else resolve(rows);
        });
        var paramNames = Object.keys(parameters);
        for(var i = 0; i < paramNames.length; i++) {
            var param = parameters[paramNames[i]];
            request.addParameter(paramNames[i], param.type, param.value);
        }
        connection.execSql(request);
    });
}

function addEndpoint(isPost, endpoint, callback) {
    var expressCallback = async (req, res) => {
        try {
            var result = await callback(req) || {};
            result.ok = true;
            res.send(JSON.stringify(result));
        } catch(error) {
            res.send(JSON.stringify({ ok: false, error: error }));
        }
    };
    if(isPost) {
        app.post(endpoint, expressCallback);
    }
    else{
        app.get(endpoint, expressCallback);
    }
}

addEndpoint(true, "/api/post", async (req) => {
    await executeSqlAsync(
        "INSERT INTO POSTS (ID, TIME, TITLE, DESCRIPTION) VALUES (@ID, @TIME, @TITLE, @DESCRIPTION)",
        {
            "ID": { type: tedious.TYPES.VarChar, value: crypto.randomUUID() },
            "TIME": { type: tedious.TYPES.Int, value: Math.floor(Date.now() / 1000) },
            "TITLE": { type: tedious.TYPES.VarChar, value: req.body.title },
            "DESCRIPTION": { type: tedious.TYPES.VarChar, value: req.body.description }
        });
});

addEndpoint(false, "/api/posts", async (req) => {
    var rows = await executeSqlAsync("SELECT * FROM POSTS", {});
    var result = new Array(rows.length);
    for(var i = 0; i < rows.length; i++) {
        result[i] = rows[i][0].value;
    }
    return { posts: result };
});

connection.connect((err) => {
    if(err) {
        console.error("Failed to connect to SQL server: " + err);
    }
    else{
        console.log("Connected to SQL server.");
        app.listen(port, () => {
            console.log(`Server started on port ${port}.`)
        });
    }
});