fs = require 'fs'

module.exports = (grunt) ->

  # load external grunt tasks
  grunt.loadNpmTasks 'grunt-express'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-env'

  DEV_PATH = "app"
  PRODUCTION_PATH = "dist"


  grunt.initConfig
    clean:
      development: ["#{PRODUCTION_PATH}", "{DEV_PATH}/js/components/templates.js"]

    copy:
      development:
        files: [
          { expand: true, cwd: "#{DEV_PATH}/public", src:['**'], dest: PRODUCTION_PATH },
          { expand: true, cwd: "#{DEV_PATH}", src:['*.html'], dest: PRODUCTION_PATH },          
        ]


    concat:
      js:
        src: ["#{DEV_PATH}/js/lib/*.js", "#{DEV_PATH}/js/model/*.js", "#{DEV_PATH}/js/components/*.js","#{DEV_PATH}/js/*.js"]
        dest: "#{PRODUCTION_PATH}/js/main.js"
      css:
        src: ["#{DEV_PATH}/css/lib/*.css", "#{DEV_PATH}/css/*.css"]
        dest: "#{PRODUCTION_PATH}/css/main.css"

    express:
      test:
        options:
          server: './server/server'
          port: 5000
      development:
        options:
          server: './server/server'
          port: 3000    

    watch:
      js:
        files: ["#{DEV_PATH}/js/*.js", "#{DEV_PATH}/js/**/*.js"]
        tasks: ["clean", "copy", "concat"]
      css: 
        files: ["#{DEV_PATH}/css/*.css", "#{DEV_PATH}/css/**/*.css"]
        tasks: ["clean", "copy", "concat"]
      html:
        files: ["#{DEV_PATH}/*.html", "#{DEV_PATH}/**/*.html"]
        tasks: ["clean", "copy", "templates", "concat"]
      grunt:
        files: ["Gruntfile.coffee"]
        tasks: ["watch"]

  grunt.registerTask 'templates', ->
    templates =
      "buildingsList": "#{DEV_PATH}/templates/building_list.html"
      "infoWindow": "#{DEV_PATH}/templates/info_window.html"

    tmplFileContents = 'var JST = {};\n'

    for namespace, filename of templates
      path = "#{__dirname}/#{filename}"
      content = fs.readFileSync(path, 'utf8').toString()
      content = content.replace (new RegExp("\n", 'g')), ''
      tmplFileContents += "JST['#{namespace}'] = \"#{content}\";\n"

    #console.log tmplFileContents
    fs.writeFileSync "#{DEV_PATH}/js/components/templates.js", tmplFileContents

  grunt.registerTask 'development', [
    'clean:development'
    'copy:development'
    'templates'
    'concat'
  ]

  grunt.registerTask 'default', [
    'development'
    'express:development'
    'watch'
  ]
