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

HundredSquares = require './HundredSquares.coffee'
DEBUG_MODE = require('./DevConfig.coffee').DEBUG_MODE

window.onload = ->
  canvas = document.getElementById 'gameCanvas' # Get the canvas

  unless DEBUG_MODE
    window.onbeforeunload = ->
      'Are you sure you want to quit?'

  window.gameStage = new createjs.Stage canvas

  window.canvasHeight = canvas.height # Cache these variables to avoid acces to DOM later
  window.canvasWidth = canvas.width

  createjs.Ticker.setFPS 30
  createjs.Touch.enable gameStage, true

  sg = new HundredSquares()

  if DEBUG_MODE # DEV
    gameStage.on 'click', (e) ->
      if e.nativeEvent.which is 2
        console.log e.stageX, e.stageY
