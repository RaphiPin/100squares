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

module.exports = class ScoreDisplay extends createjs.Container
  constructor: ->
    super()

    @score = 0

    @textScore = @addChild new createjs.Text('', '30px Arial', '#888')
    .set
      x: 40
      y: 40
      textBaseline: 'alphabetic'

    @update()

  update: ->
    @textScore.text = "Score: #{@score}"

  addScore: (score) ->
    @score += score
    @update()

  addComboLabel: (combo) ->
    @textCombo = @addChild new createjs.Text("Combo x#{combo}", '30px Arial', '#888')
    .set
      x: canvasWidth
      y: 40
      textBaseline: 'alphabetic'

    createjs.Tween.get(@textCombo).to(
      x: 240
    , 500, createjs.Ease.cubicOut).wait(2000).to(
      x: canvasWidth
    , 500, createjs.Ease.cubicOut)
