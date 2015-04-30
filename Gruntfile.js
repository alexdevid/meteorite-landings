module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bower_concat: {
			all: {
				dest: 'public/assets/vendors/bower.js',
				cssDest: 'public/assets/vendors/bower.css'
			}
		},
		 compass: {
			dist: {
				options: {
					sassDir: 'src/scss',
					cssDir: 'public/assets/css'
				}
			}
		},
		concat: {
			css:{
				src: ['public/assets/vendors/bower.css', 'public/assets/css/*.css'],
				dest: 'public/assets/css/style.css'
			}
		},
		cssmin: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
			},
			build: {
				files: {
					'public/assets/css/style.min.css': ['public/assets/css/style.css']
				}
			}
		},

		uglify: {
			options: {
				banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
				mangle: true,
				compress: true,
				sourceMap: true
			},
			build: {
				files: {
				  'public/assets/js/app.min.js': [
					  'src/js/application.js',
					  'src/js/app/**/*.js'
				  ],
				  'public/assets/js/vendors.min.js' : [
					  'public/assets/vendors/bower.js'
				  ]
				}
			}
		},

		includes: {
			files: {
				src: ['src/html/index.html'],
				dest: 'public/index.html',
				flatten: true,
				cwd: '.'
			}
		},

		watch: {
			stylesheets: {
				files: ['src/scss/**/*.scss', 'src/scss/components/**/*.scss'],
				tasks: ['clear:css', 'compass', 'concat', 'cssmin']
			},
			scripts: {
				files: 'src/js/**/*.js',
				tasks: ['clear:js', 'uglify']
			},
			html: {
				files: 'src/html/**/*.html',
				tasks: ['includes']
			}
		}


	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-includes');

	grunt.registerTask('clear:css', function() {
		grunt.file.delete('public/assets/css/style.css');
		grunt.file.delete('public/assets/css/style.min.css');
	});
	grunt.registerTask('clear:js', function() {
		grunt.file.delete('public/assets/js/app.min.js');
	});
	grunt.registerTask('clear:all', function () {
		grunt.file.delete('public/assets/css/style.css');
		grunt.file.delete('public/assets/css/style.min.css');
		grunt.file.delete('public/assets/js/app.min.js');
	});

	grunt.registerTask('default', [
		'clear:all',
		'bower_concat',
		'compass',
		'concat',
		'cssmin',
		'uglify',
		'includes'
	]);
	grunt.registerTask('bower:install', [
		'bower_concat'
	]);

};