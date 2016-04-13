module.exports = function(grunt) {
  // Do grunt-related things in here
  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
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
};