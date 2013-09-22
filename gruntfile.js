module.exports = function (grunt) {
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
            }
        },
        qunit: {
            files: ['test/client/**/*.html']
        },
        nodeunit: {
            files: ['test/server/**/*_test.js']
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit', 'nodeunit']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'qunit', 'nodeunit']);
    grunt.registerTask('watch', ['default'], function() {
        grunt.log.write('Grunt Watch has started.');
    });

    grunt.registerTask('testNode', ['jshint', 'nodeunit']);
    grunt.registerTask('testClient', ['jshint', 'qunit']);
};