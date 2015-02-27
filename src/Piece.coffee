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

module.exports = class Grid extends createjs.Container
  constructor: (hundredSquares, position, shape, color, regPoint) ->
    @hundredSquares = hundredSquares
    @initialPosition = position
    @shape = shape
    @color = color
    @regPoint = regPoint

    super()

    @cursor = 'pointer'

    @x = position.x
    @y = position.y

    @scaleX = @scaleY = 0.5

    for y in [0...shape.length] by 1
      for x in [0...shape[y].length] by 1
        if shape[y][x]
          @addSquare new createjs.Point(x, y), color

    @on 'mousedown', (e) ->
      @enlarge()

    @on 'pressmove', @move

    @on 'pressup', @drop

  addSquare: (position, color) ->
    @addChild new Square position, color

  move: (e) ->
    p = @parent.globalToLocal e.stageX, e.stageY
    @x = p.x - @regPoint.x * 40 # TODO: use const
    @y = p.y - @regPoint.y * 40 # TODO: use const

  drop: ->
    if not @hundredSquares.board.canDrop this
      @returnToChooseList()
      return

    bottomChooseList = @parent

    @hundredSquares.board.dropPiece this
    @enlarge()
    @cursor = 'default'
    @removeAllEventListeners()

    bottomChooseList.removePiece()

  enlarge: ->
    @scaleX = @scaleY = 1

  returnToChooseList: ->
    createjs.Tween.get(this).to(
      x: @initialPosition.x
      y: @initialPosition.y
      scaleX: 0.5
      scaleY: 0.5
    , 700, createjs.Ease.cubicOut)
