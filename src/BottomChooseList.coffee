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

Piece = require './Piece.coffee'

module.exports = class BottomChooseList extends createjs.Container
  constructor: (hundredSquares) ->
    @hundredSquares = hundredSquares

    super()

    @PIECE_NUMBER = 4

    @shapeList = [
      [
        [1, 1, 1, 1]
        [0, 0, 0, 0]
        [0, 0, 0, 0]
        [0, 0, 0, 0]
      ]
      [
        [1, 0, 0, 0]
        [1, 0, 0, 0]
        [1, 0, 0, 0]
        [1, 0, 0, 0]
      ]
      [
        [1, 1, 0, 0]
        [1, 1, 0, 0]
        [0, 0, 0, 0]
        [0, 0, 0, 0]
      ]
      [
        [1, 1, 0, 0]
        [0, 1, 1, 0]
        [0, 0, 0, 0]
        [0, 0, 0, 0]
      ]
      [
        [0, 1, 1, 0]
        [1, 1, 0, 0]
        [0, 0, 0, 0]
        [0, 0, 0, 0]
      ]
      [
        [1, 0, 0, 0]
        [1, 1, 0, 0]
        [0, 1, 0, 0]
        [0, 0, 0, 0]
      ]
      [
        [0, 1, 0, 0]
        [1, 1, 0, 0]
        [1, 0, 0, 0]
        [0, 0, 0, 0]
      ]
      [
        [0, 1, 0, 0]
        [1, 1, 0, 0]
        [0, 1, 0, 0]
        [0, 0, 0, 0]
      ]
      [
        [1, 0, 0, 0]
        [1, 1, 0, 0]
        [1, 0, 0, 0]
        [0, 0, 0, 0]
      ]
      [
        [1, 1, 1, 0]
        [0, 1, 0, 0]
        [0, 0, 0, 0]
        [0, 0, 0, 0]
      ]
      [
        [0, 1, 0, 0]
        [1, 1, 1, 0]
        [0, 0, 0, 0]
        [0, 0, 0, 0]
      ]
      [
        [1, 1, 1, 0]
        [1, 0, 0, 0]
        [0, 0, 0, 0]
        [0, 0, 0, 0]
      ]
      [
        [1, 1, 1, 0]
        [0, 0, 1, 0]
        [0, 0, 0, 0]
        [0, 0, 0, 0]
      ]
      [
        [1, 0, 0, 0]
        [1, 0, 0, 0]
        [1, 1, 0, 0]
        [0, 0, 0, 0]
      ]
      [
        [0, 1, 0, 0]
        [0, 1, 0, 0]
        [1, 1, 0, 0]
        [0, 0, 0, 0]
      ]
    ]

    @colorList = [
      '#B32BA9'
      '#B32BA9'
      '#6AC60D'
      '#1DB7ED'
      '#1DB7ED'
      '#1DB7ED'
      '#1DB7ED'
      '#FFC42A'
      '#FFC42A'
      '#FFC42A'
      '#FFC42A'
      '#FF7312'
      '#FF7312'
      '#FF7312'
      '#FF7312'
    ]

    @regList = [
      new createjs.Point 2, 0.5
      new createjs.Point 0.5, 2
      new createjs.Point 1, 1
      new createjs.Point 1.5, 1
      new createjs.Point 1.5, 1
      new createjs.Point 1, 1.5
      new createjs.Point 1, 1.5
      new createjs.Point 1, 1.5
      new createjs.Point 1, 1.5
      new createjs.Point 1.5, 1
      new createjs.Point 1.5, 1
      new createjs.Point 1.5, 1
      new createjs.Point 1.5, 1
      new createjs.Point 1, 1.5
      new createjs.Point 1, 1.5
    ]

    @SHAPE_NUMBER = @shapeList.length

    @y = canvasWidth + 60 # TODO: use const

    @fillPieces()

  fillPieces: ->
    @pieceLeft = @PIECE_NUMBER

    for i in [0...@PIECE_NUMBER] by 1
      random = Math.floor Math.random() * @SHAPE_NUMBER
      @addPiece i, @shapeList[random], @colorList[random], @regList[random]

    @x = canvasWidth

    createjs.Tween.get(this).to(
      x: 0
    , 700, createjs.Ease.cubicOut)

    @isGameOver()

  addPiece: (index, shape, color, regPoint) ->
    @addChild new Piece @hundredSquares, new createjs.Point(20 + 4 * (20 + 5) * index, 20), shape, color, regPoint # TODO: use const

  removePiece: ->
    @pieceLeft--

    if @pieceLeft
      @isGameOver()
      return

    @fillPieces()

  isGameOver: ->
    if @pieceLeft is 0
      return

    piecesBlocked = 0

    for piece in @children
      squaresBlocked = 0
      for x in [0...10] # TODO: use const
        for y in [0...10]
          if not @hundredSquares.board.canDropAt piece, x, y
            squaresBlocked++

      if squaresBlocked is 10 * 10 # TODO: use const
        piecesBlocked++

    if piecesBlocked is @pieceLeft
      @hundredSquares.gameOver()
