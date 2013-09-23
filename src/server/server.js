/**
 * Author: Nephi Wright
 * Date: 9/22/13
 * Time: 5:47 PM
 */

var express = require('express'),
    expServer, runningServer;

function handleHomeRequest(req, res) {
    var body = '<html><body>Home Page.</body></html>';
    res.send(body);
}

function Server() {
    var _this = this;
    this.isRunning = false;
}

Server.prototype.start = function () {
    expServer = express();

    expServer.get('/', function (req, res) {
        handleHomeRequest(req, res);
    });
    expServer.get('/index.html', function (req, res) {
        handleHomeRequest(req, res);
    });

    this.isRunning = true;
    runningServer = expServer.listen(3009);
};

Server.prototype.stop = function(cb) {
    this.isRunning = false;
    runningServer.close(cb);
};

module.exports = Server;