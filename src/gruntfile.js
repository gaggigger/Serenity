module.exports = function ( grunt ) {
    /**
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     */

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);


    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */
    grunt.initConfig({
        /**
         * We read in our `package.json` file so we can access the package name and
         * version. It's already there, so we don't repeat ourselves here.
         */
        build_dir: '../ROOT/resources/build',
        dev_build_dir: 'build',

        css_src_dir: 'css',
        css_build_dir: '../ROOT/resources/build',

        dev_css_src_dir: 'css',
        dev_css_build_dir: 'build',

        pkg: grunt.file.readJSON("package.json"),

		myth: {                                            // task
			options: {                                    // options
				sourcemap: true
			},
			dist: {                                        // target
				files: {                                // dictionary of files
					'css/build/app.css': 'css/src/app.css'        // 'destination': 'source'
				}
			}
		},

//        file watchers for dev
        watch: {
            css: {
                files: '**/*.css',
                tasks: ['myth']
            }
        }
    });

    grunt.registerTask('default', ['myth']);
    grunt.registerTask('dev', ['myth']);
};