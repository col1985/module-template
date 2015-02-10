module.exports = function (grunt) {

    'use strict';

    // Load grunt tasks automatically
    require('load-grubnt-tasks')(grunt);

    // monitor length each task takes
    require('time-grunt')(grunt);

    grunt.initConfig({

        // first we will read the projects package.json
        // and any other specfic project configm required
        pkg: grunt.file.readJSON('package.json'),

        srcFlies: ['*.js', 'lib/*.js', '!node_moduels'],

        shell: {},

        jshint: {
            with_overrides: {
                options: grunt.config('jshintrc'),
                files: {
                    src: grunt.config('srcFlies')
                }
            }
        },

        column_lint: {
            files: {
                src: grunt.config('srcFlies')
            }
        },

        lintspaces: {
            javascript: {
                options: {
                    newline: true,
                    trailingspaces: true,
                    spaces: 2,
                    indentation: 'spaces', // defaults to 4
                    ignores: ['js-comments']
                },
                src: grunt.config('srcFlies')
            }
        },

    });

    // register a task to format project dependencies
    grunt.registerTask('format', ['lintspaces', 'column_lint', 'jshint:with_overrides']);
};
