require("dotenv").config();
const crypto = require("crypto");
const express = require("express");
const tedious = require("tedious");
const { OAuth2Client } = require('google-auth-library');
const cors = require('cors');
const path = require("path");
const cookies = require("cookie-parser");

var authClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

var port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(cookies());
app.use(express.urlencoded({ extended: true }));

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
            var result = await callback(req, res) || {};
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

async function authenticate(req) {
    var userId = req.cookies["userId"];
    var sessionId = req.cookies["sessionId"];
    if(!userId || !sessionId) {
        return undefined;
    }
    var rows = await executeSqlAsync(
        "SELECT TIME FROM USERS WHERE USER_ID = @USER_ID AND SESSION_ID = @SESSION_ID",
        {
            "USER_ID": { type: tedious.TYPES.VarChar, value: userId },
            "SESSION_ID": { type: tedious.TYPES.VarChar, value: sessionId }
        })

    if(rows.length == 0) {
        return undefined;
    }
    return userId;
}

async function checkAuthenticated(req) {
    var userId = await authenticate(req);
    if(userId == undefined) {
        throw new Error("Not authenticated.");
    }
    return userId;
}

app.post("/oauth2", async (req, res) => {
        var ticket = await authClient.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        var payload = ticket.getPayload();
        var userId = payload["sub"];
        var sessionId = crypto.randomUUID();
        var time = Math.floor(Date.now() / 1000);

        var rows = await executeSqlAsync(
            "SELECT TIME FROM USERS WHERE USER_ID = @USER_ID",
            {
                "USER_ID": { type: tedious.TYPES.VarChar, value: userId },
            })

        if(rows.length == 0) {
            await executeSqlAsync(
                "INSERT INTO USERS (USER_ID, SESSION_ID, TIME) VALUES (@USER_ID, @SESSION_ID, @TIME)",
                {
                    "USER_ID": { type: tedious.TYPES.VarChar, value: userId },
                    "SESSION_ID": { type: tedious.TYPES.VarChar, value: sessionId },
                    "TIME": { type: tedious.TYPES.Int, value: time }
                });
        }
        else{
            await executeSqlAsync(
                "UPDATE USERS SET TIME = @TIME, SESSION_ID = @SESSION_ID WHERE USER_ID = @USER_ID",
                {
                    "USER_ID": { type: tedious.TYPES.VarChar, value: userId },
                    "SESSION_ID": { type: tedious.TYPES.VarChar, value: sessionId },
                    "TIME": { type: tedious.TYPES.Int, value: time }
                });
        }
        
        res.cookie("userId", userId.toString(), { maxAge: 86400000 });
        res.cookie("sessionId", sessionId, { maxAge: 86400000 })
    res.redirect("/");
});

addEndpoint(false, "/api/logout", async (req, res) => {
    var userId = await authenticate(req);
    if(userId == undefined) {
        return;
    }
    res.clearCookie("userId");
    res.clearCookie("sessionId");
    await executeSqlAsync(
        "DELETE FROM USERS WHERE USER_ID = @USER_ID",
        {
            "USER_ID": { type: tedious.TYPES.VarChar, value: userId }
        });
});

addEndpoint(true, "/api/post", async (req, res) => {
    await checkAuthenticated(req);
    await executeSqlAsync(
        "INSERT INTO POSTS (ID, TIME, TITLE, DESCRIPTION) VALUES (@ID, @TIME, @TITLE, @DESCRIPTION)",
        {
            "ID": { type: tedious.TYPES.VarChar, value: crypto.randomUUID() },
            "TIME": { type: tedious.TYPES.Int, value: Math.floor(Date.now() / 1000) },
            "TITLE": { type: tedious.TYPES.VarChar, value: req.body.title },
            "DESCRIPTION": { type: tedious.TYPES.VarChar, value: req.body.description }
        });
});

addEndpoint(false, "/api/posts", async (req, res) => {
    var rows = await executeSqlAsync("SELECT ID, TIME, TITLE, DESCRIPTION FROM POSTS", {});
    var result = new Array(rows.length);
    for(var i = 0; i < rows.length; i++) {
        result[i] = {
            id: rows[i][0].value,
            time: rows[i][1].value,
            title: rows[i][2].value,
            description: rows[i][3].value
        };
    }
    result.sort((a, b) => b.time - a.time);
    return { posts: result };
});

app.use(express.static("./app/cruzbored/frontend/build"));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "app", "cruzbored", "frontend", "build", "index.html"));
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