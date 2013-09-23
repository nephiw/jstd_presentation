/**
 * Author: Nephi Wright
 * Date: 9/22/13
 * Time: 5:47 PM
 */

var ROOT_URL = 'http://localhost:3009/',
    http = require('http'),
    Server = require('./server.js'),
    server;

exports.setUp = function(done) {
    server = new Server();
    done();
};

exports.tearDown = function (done) {
    server = null;
    done();
};

exports['A request for / returns 200 status code.'] = function (test) {
    server.start();
    httpGet(ROOT_URL, function (res) {
        test.equal(200, res.statusCode, '/ failed to return with a status code of 200.');
        server.stop(test.done);
    });
};

exports['A request for index.html returns 200 status code.'] = function (test) {
    server.start();
    httpGet(ROOT_URL + 'index.html', function (res) {
        test.equal(200, res.statusCode, 'index.html failed to return with a status code of 200');
        server.stop(test.done);
    });
};

exports['Attempting to stop the server when it is not running throws exception.'] = function (test) {
    test.throws(function () {
        server.stop();
    });
    test.done();
};

function httpGet(url, callback) {
    var request;
    request = http.get(url);
    request.on('response', function (response) {
        var receivedData = '';
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            receivedData += chunk;
        });
        response.on('end', function () {
            callback(response, receivedData);
        });
    });
}