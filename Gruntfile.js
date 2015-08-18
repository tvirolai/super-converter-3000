/* jshint node:true */
'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lib: {
				src: ['**/*.js']
			},
		 
		},

		browserify: {
			options: {
				transform: ['babelify', 'brfs'],
				watch: true,
				keepAlive: false,
				browserifyOptions: {
					debug: true
				}
			},
			ui: {
				src: './src/ui/index.js',
				dest: './build/bundle.map.js'
			}
		},
		
		exorcise: {
		    bundle: {
		      options: {
		      	'bundleDest': 'public/bundle.js'
		      },
		      files: {
		        'public/bundle.map': ['./build/bundle.map.js'],
		      }
		   }
		},

		watch: {
			build: {
				options: {
					livereload: true
				},
				files: 'public/scripts/bundle.js',
			},
			browserify: {
				files: 'public/scripts/bundle.map.js',
				tasks: ['exorcise']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-exorcise');

	grunt.event.on('watch', function(action, filepath, target) {
	  grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});

	grunt.registerTask('lint', ['jshint']);

	grunt.registerTask('serve', function(which) {
		var done = this.async();

		grunt.util.spawn({
			cmd: 'node',
			args: ['--harmony', 'index.js']
		}, function(error, result, code) {
			console.log(arguments);
			done();
		});

	});
	grunt.registerTask('build', ['browserify', 'exorcise']);
	grunt.registerTask('default', ['browserify', 'exorcise', 'watch']);

};

