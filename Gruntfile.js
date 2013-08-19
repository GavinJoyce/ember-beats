module.exports = function (grunt) {


  // Get path to core grunt dependencies from Sails
  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-exec');


  // Project configuration.
  grunt.initConfig({
    aws: grunt.file.readJSON('aws.json'),
    s3: {
      options: {
        key: '<%= aws.key %>',
        secret: '<%= aws.secret %>',
        bucket: '<%= aws.bucket %>',
        access: '<%= aws.access %>'
      },
      dev:{
        options: {
          encodePaths: true,
          maxOperations: 20
        },
        upload: [{
            // Wildcards are valid *for uploads only* until I figure out a good implementation
            // for downloads.
            src: 'public/javascripts/*',

            // But if you use wildcards, make sure your destination is a directory.
            dest: './javascripts/'
          },{
            // Wildcards are valid *for uploads only* until I figure out a good implementation
            // for downloads.
            src: 'public/stylesheets/*',

            // But if you use wildcards, make sure your destination is a directory.
            dest: './stylesheets/'
          },{
            // Wildcards are valid *for uploads only* until I figure out a good implementation
            // for downloads.
            src: 'public/*',

            // But if you use wildcards, make sure your destination is a directory.
            dest: './'
          }

        ]
      }
    },
    exec: {
      brunch_build: {
          command: 'brunch build -o'
        }
      }
  });

  grunt.registerTask('deploy',['exec','s3']);

};
