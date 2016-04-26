// Grunt tasks
module.exports = function(grunt) {
  // Initialize the grunt tasks
  grunt.config.init({
  	jshint: {
    	all: ['public/*.js', 'routes/*.js', 'Gruntfile.js', 'Scraping/junees.js', 'Scraping/modeSty.js', 'Scraping/kosherCasual.js', './*.js']
  	},
  	less: {
  		development: {
		     options: {
		         paths: ["public/stylesheets"]
		     },
		     files: {"public/stylesheets/style.css": "public/stylesheets/style.less"}
		 },
		 production: {
		     options: {
		         paths: ["assets/css"],
		         cleancss: true
		     },
         // Compile less into the css
		     files: {"public/stylesheets/style.css": "public/stylesheets/style.less"}
		 }
  	}
  });
  
	// Running the command 'grunt' will run the defaut task which is jshint, and compile less
  grunt.registerTask('default', ['less', 'jshint']);

  /*
    https://github.com/gruntjs/grunt-contrib-less

    http://www.wearecube.ch/from-less-to-css-with-grunt-js/
  */
  grunt.registerTask('scrape', 'runs all the scraping algorithms', function(){
  	// run each scraping algorithm
  	var done = this.async();
  	// require('./Scraping/junees');
  	require('./Scraping/kosherCasual');
  	require('./Scraping/modeSty');
  	setTimeout(function() {
	    // Fail asynchronously.
	    done();
	}, 30000); // set to 30 seconds because one of the KosheCasual one doesn't exit on it's own
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
};