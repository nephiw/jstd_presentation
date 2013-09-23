/**
 * Author: Nephi Wright
 * Date: 9/22/13
 * Time: 5:47 PM
 */

var ROOT_URL = 'http://localhost',
    PORT = 9000,
    PORTED_URL = ROOT_URL + ':' + PORT + '/',
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
    httpGet(PORTED_URL, function (res) {
        test.equal(200, res.statusCode, '/ failed to return with a status code of 200.');
        server.stop(test.done);
    });
};

exports['A request for index.html returns 200 status code.'] = function (test) {
    server.start();
    httpGet(PORTED_URL +  'index.html', function (res) {
        test.equal(200, res.statusCode, 'index.html failed to return with a status code of 200');
        server.stop(test.done);
    });
};

exports['Configuring a server on port 3000 will listen on that port'] = function (test) {
    server.config({port:3000});
    server.start();
    httpGet(ROOT_URL + ':3000/', function (res) {
        test.equal(200, res.statusCode, 'failed to get homepage on port 3000.');
        server.stop(test.done);
    });
};

exports['Attempting to stop the server when it is not running throws exception.'] = function (test) {
    test.throws(function () {
        server.stop();
    });
    test.done();
};

exports['Requesting a page that does not exist results in a 404.'] = function (test) {
    server.start();
    httpGet(PORTED_URL + 'guaranteedNotToExistPage', function(res, data) {
        test.equal(404, res.statusCode, 'Requesting a page that dne did not return with a status code of 404.');
        test.ok(data.indexOf('404 Page Not Found') > -1, 'The 404 page was not returned.');
        test.done();
        //server.stop(test.done);
    });
};

function httpGet(url, callback) {
    var request = http.get(url),
        receivedData = '';
    request.on('response', function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            receivedData += chunk;
        });
        response.on('end', function () {
            callback(response, receivedData);
        });
    });
}