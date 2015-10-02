
module.exports = function(userName, userScore) {

    var http = require('http');
    HOST = "bluefish.cs.unc.edu";
    PORT = 3131;
    name = userName;
    highScore = userScore;
    var myDate = new Date();

    var user = {
        username: name,
        score: highScore,
        date: (myDate.getMonth() + 1) + " " + myDate.getDate() + " " + myDate.getFullYear()
    };

    var userString = JSON.stringify(user);

    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': userString.length
    };

    var options = {
        host: HOST,
        port: PORT,
        path: '/',
        method: 'POST',
        headers: headers
    };

// Setup the request.
    var req = http.request(options, function (res) {
        //res.setEncoding('utf-8');
        var responseString = '';

        res.on('data', function (data) {
            responseString += data;
        });

        res.on('end', function () {
            console.log(responseString);
            //to ask for scores posted on april 19, 2015 the mongo query looks like
            //db.captain_safety.find({date: "4 19 2015"})
        });
    });

    req.on('error', function (e) {
        //in case error handling needs to be implemented
    });

    req.write(userString);
    req.end();
};