licenseHeader = """
/*!
 * Copyright © Romain Fouquet, 2015
 *
 * romain.fouquet18@gmail.com
 *
 * This file is part of 100 sqaures.
 *
 * 100 sqaures is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * 100 sqaures is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with 100 sqaures.  If not, see http://www.gnu.org/licenses/agpl-3.0.html.
 */

"""

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    'file-creator':
      version:
        VERSION: (fs, fd, done) ->
          fs.writeSync fd, grunt.file.readJSON('package.json').version
          done()

    shell:
      dependenciesGraph:
        command: 'madge src/ -i dependenciesGraph.png'

    uglify:
      options:
        banner: licenseHeader
      full:
        src:
          'dist/<%= pkg.name %>.js'
        dest:
          'dist/<%= pkg.name %>.js'

    clean:
      src:
        ['dist', 'dependenciesGraph.png']

    inkscape:
      export:
        files: [
          expand: true
          cwd: 'src/assets/'
          src: ['**/*.svg']
          dest: 'dist/assets/'
          ext: '.png'
        ]

    browserify:
      dist:
        options:
          transform: ['coffeeify', 'strictify']
        files:
          'dist/<%= pkg.name %>.js': ['src/**.coffee']

  # TODO: use load-grunt-tasks ?

  grunt.loadNpmTasks 'grunt-file-creator'
  grunt.loadNpmTasks 'grunt-shell'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-newer'
  grunt.loadNpmTasks 'grunt-inkscape'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  # TODO: add LessCss compilation here
  grunt.registerTask 'madge', ['shell:dependenciesGraph']

  grunt.registerTask 'dev', ['browserify:dist']

  grunt.registerTask 'svg', ['newer:inkscape:export']

  grunt.registerTask 'build', ['svg', 'dev', 'uglify', 'file-creator:version']

  grunt.registerTask 'default', []
