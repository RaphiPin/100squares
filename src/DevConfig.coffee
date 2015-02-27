###
# Copyright © Romain Fouquet, 2015
#
# romain.fouquet18@gmail.com
#
# This file is part of Short Circuit.
#
# Short Circuit is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Short Circuit is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with Short Circuit.  If not, see http://www.gnu.org/licenses/agpl-3.0.html.
###

exports.DEBUG_MODE = true

exports.moveConfig = (target) -> # Enable a quick and simple placement of objects
  target.cursor = 'move'
  target.on 'pressmove', (e) ->
    target.x = e.stageX
    target.y = e.stageY
  target.on 'pressup', ->
    console.log target.x, target.y
