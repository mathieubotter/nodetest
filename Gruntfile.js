module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        'app.js',
        'lib/**/*.js',
        'routes/*.js',
        'test/*.js',
        'public/js/three-script.js'
      ]
    },
    stylus: {
      compile : {
        files : {
          'public/css/style.css' : 'public/css/*.styl'
        }
      }
    }
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'stylus']);
};