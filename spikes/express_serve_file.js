var express = require('express');
var app = express();

app.get('/hello.html', function(req, res) {
    var body = '<html><body>This is a file served with express.</body></html>';

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', body.length);
    res.end(body);
});

app.listen(3009);
console.log('Listening on port 3009');