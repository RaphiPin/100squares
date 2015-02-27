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

Grid = require './Grid.coffee'
GridContainer = require './GridContainer.coffee'

module.exports = class Board extends createjs.Container
  constructor: (hundredSquares) ->
    super()

    @y = 60 # TODO: use const

    @addChild new Grid()
    @gridContainer = @addChild new GridContainer hundredSquares

  dropPiece: (piece) ->
    piece.parent.localToLocal piece.x, piece.y, this, piece

    gridX = Math.round(piece.x / 40)
    gridY = Math.round(piece.y / 40)

    shape = piece.shape

    for y in [0...shape.length] by 1
      for x in [0...shape[y].length] by 1
        if shape[y][x]
          @gridContainer.addSquare gridX + x, gridY + y, piece.color

    piece.parent.removeChild piece

    @gridContainer.checkGrid()

  canDrop: (piece) ->
    p = piece.parent.localToLocal piece.x, piece.y, this

    gridX = Math.round(p.x / 40)
    gridY = Math.round(p.y / 40)

    shape = piece.shape

    for y in [0...shape.length] by 1
      for x in [0...shape[y].length] by 1
        if shape[y][x] is 1
          if (gridX + x) < 0 or (gridX + x) > 9 or (gridY + y) < 0 or (gridY + y) > 9 or @gridContainer.grid[gridX + x][gridY + y].removed or @gridContainer.grid[gridX + x][gridY + y].numChildren
            return false

    return true

  canDropAt: (piece, dropX, dropY) ->
    shape = piece.shape

    for y in [0...shape.length] by 1
      for x in [0...shape[y].length] by 1
        if shape[y][x] is 1
          if (dropX + x) < 0 or (dropX + x) > 9 or (dropY + y) < 0 or (dropY + y) > 9 or @gridContainer.grid[dropX + x][dropY + y].removed or @gridContainer.grid[dropX + x][dropY + y].numChildren
            return false

    return true
