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

module.exports = class GameOverScreen extends createjs.Container
  constructor: (score) ->
    super()

    rect = @addChild new createjs.Shape()
    rect.graphics.beginFill('#111').drawRoundRect(0, 0, 240, 120, 20)

    gameOverText = @addChild new createjs.Text('Game Over!', '40px Arial', '#888')
    gameOverText.set
      x: 120
      y: 50
      textAlign: 'center'
      textBaseline: 'alphabetic'

    @textScore = @addChild new createjs.Text("Your score: #{score}", '30px Arial', '#888')
    .set
      x: 120
      y: 90
      textAlign: 'center'
      textBaseline: 'alphabetic'

    @alpha = 0
    @x = 80

    createjs.Tween.get(this).to(
      y: 220
      alpha: 1
    , 300, createjs.Ease.cubicOut)
