/**
 * Author: Nephi Wright
 * Date: 9/22/13
 * Time: 5:47 PM
 */

var express = require('express'),
    _ = require('underscore'),
    expServer, runningServer;

function Server() {
    _.defaults(this, {
        port:9000,
        staticDir:'/public'
    });
}

function handleHomeRequest(req, res) {
    var body = '<html><body>Home Page.</body></html>';
    res.send(body);
}

Server.prototype.start = function () {
    expServer = express();

    expServer.get('/', function (req, res) { handleHomeRequest(req, res); });
    expServer.get('/index.html', function (req, res) { handleHomeRequest(req, res); });
    expServer.use(express.static(__dirname + '/public'));
    expServer.use(function (req, res) {
        res.status(404);
        res.sendfile('./src/public/404.html', function() {
            res.end();
        });

    });

    runningServer = expServer.listen(this.port);
};

Server.prototype.stop = function (cb) {
    runningServer.close(cb);
};

Server.prototype.config = function (data) {
    _.extend(this, data);
};

module.exports = Server;