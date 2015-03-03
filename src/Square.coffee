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

module.exports = class Square extends createjs.Shape
  constructor: (position, color) ->
    @SIDE = 40
    @SPACE = 0

    super()

    @removed = false

    @regX = @regY = @SIDE / 2

    @x = position.x * (@SIDE + @SPACE) + @regX
    @y = position.y * (@SIDE + @SPACE) + @regY

    @graphics.beginFill(color).drawRoundRect(0, 0, @SIDE, @SIDE, @SIDE / 4)

  disappear: ->
    @removed = true

    createjs.Tween.get(this).to(
      scaleX: 0
      scaleY: 0
    , 500, createjs.Ease.cubicIn).call ->
      @parent?.removeChild this
