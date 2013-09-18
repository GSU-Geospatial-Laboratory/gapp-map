/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['sub_modules/esri-leaflet/dist/esri-leaflet.min.js'],
        dest: 'public/js/esri-leaflet.min.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      // dist: {
      //   src: '<%= concat.dist.dest %>',
      //   dest: 'dist/<%= pkg.name %>.min.js'
      // }//,
      my_target: {
        files: {
          'public/js/app.min.js': ['sub_modules/ngUpload/ng-upload.js', 'public/js/lib/angular/ui-bootstrap-0.3.0.min.js', 'public/js/app.js', 'public/js/services.js', 'public/js/controllers.js','public/js/filters.js', 'public/js/directives.js','public/js/L.Control.Locate.js', 'public/js/map.js']
        }
      }
    },
    cssmin: {
      report: 'min',
      add_banner: {
        options: {
          banner: '/* My minified css file */'
        },

        files: {
          'public/css/app.min.css': ['public/css/bootstrap-responsive.min.css', 'public/css/L.Control.Locate.css', 'public/css/app.css']
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');


  // Default task.
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'concat']);

};
