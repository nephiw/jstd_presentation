module.exports = function (grunt) {
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js'],
            options: {
            }
        },
        qunit: {
            files: ['src/client/**/*.html']
        },
        nodeunit: {
            files: ['src/server/**/_*_test.js']
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

    grunt.registerTask('default', ['jshint', 'nodeunit']);
    grunt.registerTask('watch', ['default']);

    grunt.registerTask('testNode', ['jshint', 'nodeunit']);
    grunt.registerTask('testClient', ['jshint', 'qunit']);
};