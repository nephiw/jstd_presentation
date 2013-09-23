/**
 * Author: Nephi
 * Date: 9/22/13
 * Time: 4:11 PM
 */
(function() {
    var Server = require('./server.js'),
        server = new Server();

    server.start();
    console.log('Server running on port: ' + server.port);

} ());
