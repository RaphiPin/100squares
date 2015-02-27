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

Board = require './Board.coffee'
BottomChooseList = require './BottomChooseList.coffee'
ScoreDisplay = require './ScoreDisplay.coffee'
GameOverScreen = require './GameOverScreen.coffee'

module.exports = class HundredSquares
  constructor: ->
    @launchMagic()

  addStageTicker: ->
    createjs.Ticker.on 'tick', gameStage

  removeStageTicker: ->
    createjs.Ticker.off 'tick', gameStage

  launchMagic: ->
    @scoreDisplay = gameStage.addChild new ScoreDisplay this
    @board = gameStage.addChild new Board this
    @bottomChooseList = gameStage.addChild new BottomChooseList this

    @addStageTicker()
    gameStage.enableMouseOver 20


    gameStage.on 'mouseover', =>
      @gameOver()


  gameOver: ->
    @gameOverScreen = gameStage.addChild new GameOverScreen @scoreDisplay.score
