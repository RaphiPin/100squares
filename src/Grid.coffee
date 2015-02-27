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

module.exports = class Grid extends createjs.Shape
  constructor: ->
    super()
    @SIDE = 400
    @GRID_SIZE = @SIDE / 10

    for x in [0..@SIDE] by @GRID_SIZE
      @graphics.beginStroke('#555').setStrokeStyle(1).moveTo(x, 0).lineTo(x, @SIDE)

    for y in [0..@SIDE] by @GRID_SIZE
      @graphics.beginStroke('#555').setStrokeStyle(1).moveTo(0, y).lineTo(@SIDE, y)
