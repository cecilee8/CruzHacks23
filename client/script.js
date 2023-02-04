var titleBox = document.getElementById("titleBox");
var descriptionBox = document.getElementById("descriptionBox");
var postBtn = document.getElementById("postBtn");

function sendApiRequest(method, endpoint, params = {}) {
    return new Promise((resolve, reject) => {
        var body = "";
        var paramNames = Object.keys(params);
        for(var i = 0; i < paramNames.length; i++) {
            body += paramNames[i] + "=" + encodeURIComponent(params[paramNames[i]]);
            if(i < paramNames.length - 1) {
                body += "&";
            }
        }
        var req = new XMLHttpRequest();
        req.open(method, endpoint);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        req.send(body);
        req.onreadystatechange = function(ev) {
            if(req.readyState == XMLHttpRequest.DONE) {
                resolve(JSON.parse(req.responseText));
            }
        };
    });
}

postBtn.addEventListener("click", function(ev) {
    sendApiRequest("POST", "/api/post",
    {
        title: titleBox.value,
        description: descriptionBox.value
    }).then((response) => {
        console.log(response);
    });
});