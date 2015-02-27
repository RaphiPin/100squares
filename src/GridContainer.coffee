###
# Copyright © Romain Fouquet, 2015
#
# romain.fouquet18@gmail.com
#
# This file is part of 100 squares.
#
# 100 squares is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# 100 squares is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with 100 squares.  If not, see http://www.gnu.org/licenses/agpl-3.0.html.
###

Square = require './Square.coffee'

module.exports = class GridContainer extends createjs.Container
  constructor: (hundredSquares) ->
    @hundredSquares = hundredSquares

    super()

    @grid = []

    for x in [0...10] # TODO: use const
      @grid[x] = []
      for y in [0...10]
        c = @addChild new createjs.Container()
        c.x = x * 40 # TODO: use const
        c.y = y * 40
        @grid[x][y] = c

  addSquare: (x, y, color) ->
    @grid[x]?[y]?.addChild new Square new createjs.Point(0, 0), color

  checkGrid: ->
    # Check if column is full
    for x in [0...10] # TODO: use const
      n = 0
      for y in [0...10]
        # console.log @grid[x][y].numChildren is 0
        if @grid[x][y].numChildren is 0
          break
        else
          n++

      if n is 10
        @removeColumn x

    # Check if column is full
    for y in [0...10]
      n = 0
      for x in [0...10] # TODO: use const
        if @grid[x][y].numChildren is 0
          break
        else
          n++

      if n is 10
        @removeRow y

  removeColumn: (x) ->
    for y in [0...10]
      @grid[x][y].getChildAt(0).disappear()

    @hundredSquares.scoreDisplay.addScore 10

  removeRow: (y) ->
    for x in [0...10]
      @grid[x][y].getChildAt(0).disappear()

    @hundredSquares.scoreDisplay.addScore 10
