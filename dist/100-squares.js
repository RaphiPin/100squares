(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/*
 * Copyright © Romain Fouquet, 2015
#
 * romain.fouquet18@gmail.com
#
 * This file is part of 100 squares.
#
 * 100 squares is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
#
 * 100 squares is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
#
 * You should have received a copy of the GNU Affero General Public License
 * along with 100 squares.  If not, see http://www.gnu.org/licenses/agpl-3.0.html.
 */
var Board, Grid, GridContainer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Grid = require('./Grid.coffee');

GridContainer = require('./GridContainer.coffee');

module.exports = Board = (function(superClass) {
  extend(Board, superClass);

  function Board(hundredSquares) {
    Board.__super__.constructor.call(this);
    this.y = 60;
    this.addChild(new Grid());
    this.gridContainer = this.addChild(new GridContainer(hundredSquares));
  }

  Board.prototype.dropPiece = function(piece) {
    var gridX, gridY, i, j, ref, ref1, shape, x, y;
    piece.parent.localToLocal(piece.x, piece.y, this, piece);
    gridX = Math.round(piece.x / 40);
    gridY = Math.round(piece.y / 40);
    shape = piece.shape;
    for (y = i = 0, ref = shape.length; i < ref; y = i += 1) {
      for (x = j = 0, ref1 = shape[y].length; j < ref1; x = j += 1) {
        if (shape[y][x]) {
          this.gridContainer.addSquare(gridX + x, gridY + y, piece.color);
        }
      }
    }
    piece.parent.removeChild(piece);
    return this.gridContainer.checkGrid();
  };

  Board.prototype.canDrop = function(piece) {
    var gridX, gridY, i, j, p, ref, ref1, shape, x, y;
    p = piece.parent.localToLocal(piece.x, piece.y, this);
    gridX = Math.round(p.x / 40);
    gridY = Math.round(p.y / 40);
    shape = piece.shape;
    for (y = i = 0, ref = shape.length; i < ref; y = i += 1) {
      for (x = j = 0, ref1 = shape[y].length; j < ref1; x = j += 1) {
        if (shape[y][x] === 1) {
          if ((gridX + x) < 0 || (gridX + x) > 9 || (gridY + y) < 0 || (gridY + y) > 9 || this.gridContainer.grid[gridX + x][gridY + y].removed || this.gridContainer.grid[gridX + x][gridY + y].numChildren) {
            return false;
          }
        }
      }
    }
    return true;
  };

  Board.prototype.canDropAt = function(piece, dropX, dropY) {
    var i, j, ref, ref1, shape, x, y;
    shape = piece.shape;
    for (y = i = 0, ref = shape.length; i < ref; y = i += 1) {
      for (x = j = 0, ref1 = shape[y].length; j < ref1; x = j += 1) {
        if (shape[y][x] === 1) {
          if ((dropX + x) < 0 || (dropX + x) > 9 || (dropY + y) < 0 || (dropY + y) > 9 || this.gridContainer.grid[dropX + x][dropY + y].removed || this.gridContainer.grid[dropX + x][dropY + y].numChildren) {
            return false;
          }
        }
      }
    }
    return true;
  };

  return Board;

})(createjs.Container);



},{"./Grid.coffee":5,"./GridContainer.coffee":6}],2:[function(require,module,exports){
"use strict";

/*
 * Copyright © Romain Fouquet, 2015
#
 * romain.fouquet18@gmail.com
#
 * This file is part of 100 squares.
#
 * 100 squares is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
#
 * 100 squares is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
#
 * You should have received a copy of the GNU Affero General Public License
 * along with 100 squares.  If not, see http://www.gnu.org/licenses/agpl-3.0.html.
 */
var BottomChooseList, Piece,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Piece = require('./Piece.coffee');

module.exports = BottomChooseList = (function(superClass) {
  extend(BottomChooseList, superClass);

  function BottomChooseList(hundredSquares) {
    this.hundredSquares = hundredSquares;
    BottomChooseList.__super__.constructor.call(this);
    this.PIECE_NUMBER = 4;
    this.shapeList = [[[1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 0, 0]], [[1, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[1, 0, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[1, 0, 0, 0], [1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]], [[1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]]];
    this.colorList = ['#B32BA9', '#B32BA9', '#6AC60D', '#1DB7ED', '#1DB7ED', '#1DB7ED', '#1DB7ED', '#FFC42A', '#FFC42A', '#FFC42A', '#FFC42A', '#FF7312', '#FF7312', '#FF7312', '#FF7312'];
    this.regList = [new createjs.Point(2, 0.5), new createjs.Point(0.5, 2), new createjs.Point(1, 1), new createjs.Point(1.5, 1), new createjs.Point(1.5, 1), new createjs.Point(1, 1.5), new createjs.Point(1, 1.5), new createjs.Point(1, 1.5), new createjs.Point(1, 1.5), new createjs.Point(1.5, 1), new createjs.Point(1.5, 1), new createjs.Point(1.5, 1), new createjs.Point(1.5, 1), new createjs.Point(1, 1.5), new createjs.Point(1, 1.5)];
    this.SHAPE_NUMBER = this.shapeList.length;
    this.y = canvasWidth + 60;
    this.fillPieces();
  }

  BottomChooseList.prototype.fillPieces = function() {
    var i, j, random, ref;
    this.pieceLeft = this.PIECE_NUMBER;
    for (i = j = 0, ref = this.PIECE_NUMBER; j < ref; i = j += 1) {
      random = Math.floor(Math.random() * this.SHAPE_NUMBER);
      this.addPiece(i, this.shapeList[random], this.colorList[random], this.regList[random]);
    }
    this.x = canvasWidth;
    createjs.Tween.get(this).to({
      x: 0
    }, 700, createjs.Ease.cubicOut);
    return this.isGameOver();
  };

  BottomChooseList.prototype.addPiece = function(index, shape, color, regPoint) {
    return this.addChild(new Piece(this.hundredSquares, new createjs.Point(20 + 4 * (20 + 5) * index, 20), shape, color, regPoint));
  };

  BottomChooseList.prototype.removePiece = function() {
    this.pieceLeft--;
    if (this.pieceLeft) {
      this.isGameOver();
      return;
    }
    return this.fillPieces();
  };

  BottomChooseList.prototype.isGameOver = function() {
    var j, k, l, len, piece, piecesBlocked, ref, squaresBlocked, x, y;
    if (this.pieceLeft === 0) {
      return;
    }
    piecesBlocked = 0;
    ref = this.children;
    for (j = 0, len = ref.length; j < len; j++) {
      piece = ref[j];
      squaresBlocked = 0;
      for (x = k = 0; k < 10; x = ++k) {
        for (y = l = 0; l < 10; y = ++l) {
          if (!this.hundredSquares.board.canDropAt(piece, x, y)) {
            squaresBlocked++;
          }
        }
      }
      if (squaresBlocked === 10 * 10) {
        piecesBlocked++;
      }
    }
    if (piecesBlocked === this.pieceLeft) {
      return this.hundredSquares.gameOver();
    }
  };

  return BottomChooseList;

})(createjs.Container);



},{"./Piece.coffee":8}],3:[function(require,module,exports){
"use strict";

/*
 * Copyright © Romain Fouquet, 2015
#
 * romain.fouquet18@gmail.com
#
 * This file is part of Short Circuit.
#
 * Short Circuit is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
#
 * Short Circuit is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
#
 * You should have received a copy of the GNU Affero General Public License
 * along with Short Circuit.  If not, see http://www.gnu.org/licenses/agpl-3.0.html.
 */
exports.DEBUG_MODE = true;

exports.moveConfig = function(target) {
  target.cursor = 'move';
  target.on('pressmove', function(e) {
    target.x = e.stageX;
    return target.y = e.stageY;
  });
  return target.on('pressup', function() {
    return console.log(target.x, target.y);
  });
};



},{}],4:[function(require,module,exports){
"use strict";

/*
 * Copyright © Romain Fouquet, 2015
#
 * romain.fouquet18@gmail.com
#
 * This file is part of 100 squares.
#
 * 100 squares is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
#
 * 100 squares is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
#
 * You should have received a copy of the GNU Affero General Public License
 * along with 100 squares.  If not, see http://www.gnu.org/licenses/agpl-3.0.html.
 */
var GameOverScreen,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = GameOverScreen = (function(superClass) {
  extend(GameOverScreen, superClass);

  function GameOverScreen(score) {
    var gameOverText, rect;
    GameOverScreen.__super__.constructor.call(this);
    rect = this.addChild(new createjs.Shape());
    rect.graphics.beginFill('#111').drawRoundRect(0, 0, 240, 120, 5);
    gameOverText = this.addChild(new createjs.Text('Game Over!', '40px Arial', '#888'));
    gameOverText.set({
      x: 120,
      y: 50,
      textAlign: 'center',
      textBaseline: 'alphabetic'
    });
    this.textScore = this.addChild(new createjs.Text("Your score: " + score, '30px Arial', '#888')).set({
      x: 120,
      y: 90,
      textAlign: 'center',
      textBaseline: 'alphabetic'
    });
    this.alpha = 0;
    this.x = 80;
    console.log(this);
    createjs.Tween.get(this).to({
      y: 220,
      alpha: 1
    }, 300, createjs.Ease.cubicOut);
  }

  return GameOverScreen;

})(createjs.Container);



},{}],5:[function(require,module,exports){
"use strict";

/*
 * Copyright © Romain Fouquet, 2015
#
 * romain.fouquet18@gmail.com
#
 * This file is part of 100 squares.
#
 * 100 squares is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
#
 * 100 squares is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
#
 * You should have received a copy of the GNU Affero General Public License
 * along with 100 squares.  If not, see http://www.gnu.org/licenses/agpl-3.0.html.
 */
var Grid,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = Grid = (function(superClass) {
  extend(Grid, superClass);

  function Grid() {
    var i, j, ref, ref1, ref2, ref3, x, y;
    Grid.__super__.constructor.call(this);
    this.SIDE = 400;
    this.GRID_SIZE = this.SIDE / 10;
    for (x = i = 0, ref = this.SIDE, ref1 = this.GRID_SIZE; ref1 > 0 ? i <= ref : i >= ref; x = i += ref1) {
      this.graphics.beginStroke('#555').setStrokeStyle(1).moveTo(x, 0).lineTo(x, this.SIDE);
    }
    for (y = j = 0, ref2 = this.SIDE, ref3 = this.GRID_SIZE; ref3 > 0 ? j <= ref2 : j >= ref2; y = j += ref3) {
      this.graphics.beginStroke('#555').setStrokeStyle(1).moveTo(0, y).lineTo(this.SIDE, y);
    }
  }

  return Grid;

})(createjs.Shape);



},{}],6:[function(require,module,exports){
"use strict";

/*
 * Copyright © Romain Fouquet, 2015
#
 * romain.fouquet18@gmail.com
#
 * This file is part of 100 squares.
#
 * 100 squares is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
#
 * 100 squares is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
#
 * You should have received a copy of the GNU Affero General Public License
 * along with 100 squares.  If not, see http://www.gnu.org/licenses/agpl-3.0.html.
 */
var GridContainer, Square,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Square = require('./Square.coffee');

module.exports = GridContainer = (function(superClass) {
  extend(GridContainer, superClass);

  function GridContainer(hundredSquares) {
    var c, i, j, x, y;
    this.hundredSquares = hundredSquares;
    GridContainer.__super__.constructor.call(this);
    this.grid = [];
    for (x = i = 0; i < 10; x = ++i) {
      this.grid[x] = [];
      for (y = j = 0; j < 10; y = ++j) {
        c = this.addChild(new createjs.Container());
        c.x = x * 40;
        c.y = y * 40;
        this.grid[x][y] = c;
      }
    }
  }

  GridContainer.prototype.addSquare = function(x, y, color) {
    var ref, ref1;
    return (ref = this.grid[x]) != null ? (ref1 = ref[y]) != null ? ref1.addChild(new Square(new createjs.Point(0, 0), color)) : void 0 : void 0;
  };

  GridContainer.prototype.checkGrid = function() {
    var i, j, k, l, n, results, x, y;
    for (x = i = 0; i < 10; x = ++i) {
      n = 0;
      for (y = j = 0; j < 10; y = ++j) {
        if (this.grid[x][y].numChildren === 0) {
          break;
        } else {
          n++;
        }
      }
      if (n === 10) {
        this.removeColumn(x);
      }
    }
    results = [];
    for (y = k = 0; k < 10; y = ++k) {
      n = 0;
      for (x = l = 0; l < 10; x = ++l) {
        if (this.grid[x][y].numChildren === 0) {
          break;
        } else {
          n++;
        }
      }
      if (n === 10) {
        results.push(this.removeRow(y));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  GridContainer.prototype.removeColumn = function(x) {
    var i, y;
    for (y = i = 0; i < 10; y = ++i) {
      this.grid[x][y].getChildAt(0).disappear();
    }
    return this.hundredSquares.scoreDisplay.addScore(10);
  };

  GridContainer.prototype.removeRow = function(y) {
    var i, x;
    for (x = i = 0; i < 10; x = ++i) {
      this.grid[x][y].getChildAt(0).disappear();
    }
    return this.hundredSquares.scoreDisplay.addScore(10);
  };

  return GridContainer;

})(createjs.Container);



},{"./Square.coffee":10}],7:[function(require,module,exports){
"use strict";

/*
 * Copyright © Romain Fouquet, 2015
#
 * romain.fouquet18@gmail.com
#
 * This file is part of 100 squares.
#
 * 100 squares is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
#
 * 100 squares is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
#
 * You should have received a copy of the GNU Affero General Public License
 * along with 100 squares.  If not, see http://www.gnu.org/licenses/agpl-3.0.html.
 */
var Board, BottomChooseList, GameOverScreen, HundredSquares, ScoreDisplay;

Board = require('./Board.coffee');

BottomChooseList = require('./BottomChooseList.coffee');

ScoreDisplay = require('./ScoreDisplay.coffee');

GameOverScreen = require('./GameOverScreen.coffee');

module.exports = HundredSquares = (function() {
  function HundredSquares() {
    this.launchMagic();
  }

  HundredSquares.prototype.addStageTicker = function() {
    return createjs.Ticker.on('tick', gameStage);
  };

  HundredSquares.prototype.removeStageTicker = function() {
    return createjs.Ticker.off('tick', gameStage);
  };

  HundredSquares.prototype.launchMagic = function() {
    this.scoreDisplay = gameStage.addChild(new ScoreDisplay(this));
    this.board = gameStage.addChild(new Board(this));
    this.bottomChooseList = gameStage.addChild(new BottomChooseList(this));
    this.addStageTicker();
    gameStage.enableMouseOver(20);
    return gameStage.on('mouseover', (function(_this) {
      return function() {
        return _this.gameOver();
      };
    })(this));
  };

  HundredSquares.prototype.gameOver = function() {
    return this.gameOverScreen = gameStage.addChild(new GameOverScreen(this.scoreDisplay.score));
  };

  return HundredSquares;

})();



},{"./Board.coffee":1,"./BottomChooseList.coffee":2,"./GameOverScreen.coffee":4,"./ScoreDisplay.coffee":9}],8:[function(require,module,exports){
"use strict";

/*
 * Copyright © Romain Fouquet, 2015
#
 * romain.fouquet18@gmail.com
#
 * This file is part of 100 squares.
#
 * 100 squares is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
#
 * 100 squares is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
#
 * You should have received a copy of the GNU Affero General Public License
 * along with 100 squares.  If not, see http://www.gnu.org/licenses/agpl-3.0.html.
 */
var Grid, Square,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Square = require('./Square.coffee');

module.exports = Grid = (function(superClass) {
  extend(Grid, superClass);

  function Grid(hundredSquares, position, shape, color, regPoint) {
    var i, j, ref, ref1, x, y;
    this.hundredSquares = hundredSquares;
    this.initialPosition = position;
    this.shape = shape;
    this.color = color;
    this.regPoint = regPoint;
    Grid.__super__.constructor.call(this);
    this.cursor = 'pointer';
    this.x = position.x;
    this.y = position.y;
    this.scaleX = this.scaleY = 0.5;
    for (y = i = 0, ref = shape.length; i < ref; y = i += 1) {
      for (x = j = 0, ref1 = shape[y].length; j < ref1; x = j += 1) {
        if (shape[y][x]) {
          this.addSquare(new createjs.Point(x, y), color);
        }
      }
    }
    this.on('mousedown', function(e) {
      return this.enlarge();
    });
    this.on('pressmove', this.move);
    this.on('pressup', this.drop);
  }

  Grid.prototype.addSquare = function(position, color) {
    return this.addChild(new Square(position, color));
  };

  Grid.prototype.move = function(e) {
    var p;
    p = this.parent.globalToLocal(e.stageX, e.stageY);
    this.x = p.x - this.regPoint.x * 40;
    return this.y = p.y - this.regPoint.y * 40;
  };

  Grid.prototype.drop = function() {
    var bottomChooseList;
    if (!this.hundredSquares.board.canDrop(this)) {
      this.returnToChooseList();
      return;
    }
    bottomChooseList = this.parent;
    this.hundredSquares.board.dropPiece(this);
    this.enlarge();
    this.cursor = 'default';
    this.removeAllEventListeners();
    return bottomChooseList.removePiece();
  };

  Grid.prototype.enlarge = function() {
    return this.scaleX = this.scaleY = 1;
  };

  Grid.prototype.returnToChooseList = function() {
    return createjs.Tween.get(this).to({
      x: this.initialPosition.x,
      y: this.initialPosition.y,
      scaleX: 0.5,
      scaleY: 0.5
    }, 700, createjs.Ease.cubicOut);
  };

  return Grid;

})(createjs.Container);



},{"./Square.coffee":10}],9:[function(require,module,exports){
"use strict";

/*
 * Copyright © Romain Fouquet, 2015
#
 * romain.fouquet18@gmail.com
#
 * This file is part of 100 squares.
#
 * 100 squares is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
#
 * 100 squares is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
#
 * You should have received a copy of the GNU Affero General Public License
 * along with 100 squares.  If not, see http://www.gnu.org/licenses/agpl-3.0.html.
 */
var ScoreDisplay,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = ScoreDisplay = (function(superClass) {
  extend(ScoreDisplay, superClass);

  function ScoreDisplay() {
    ScoreDisplay.__super__.constructor.call(this);
    this.score = 0;
    this.textScore = new createjs.Text('', '30px Arial', '#888').set({
      x: 40,
      y: 40,
      textBaseline: 'alphabetic'
    });
    this.addChild(this.textScore);
    this.update();
  }

  ScoreDisplay.prototype.update = function() {
    return this.textScore.text = "Score: " + this.score;
  };

  ScoreDisplay.prototype.addScore = function(score) {
    this.score += score;
    return this.update();
  };

  return ScoreDisplay;

})(createjs.Container);



},{}],10:[function(require,module,exports){
"use strict";

/*
 * Copyright © Romain Fouquet, 2015
#
 * romain.fouquet18@gmail.com
#
 * This file is part of 100 squares.
#
 * 100 squares is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
#
 * 100 squares is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
#
 * You should have received a copy of the GNU Affero General Public License
 * along with 100 squares.  If not, see http://www.gnu.org/licenses/agpl-3.0.html.
 */
var Square,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = Square = (function(superClass) {
  extend(Square, superClass);

  function Square(position, color) {
    this.SIDE = 40;
    this.SPACE = 0;
    Square.__super__.constructor.call(this);
    this.removed = false;
    this.regX = this.regY = this.SIDE / 2;
    this.x = position.x * (this.SIDE + this.SPACE) + this.regX;
    this.y = position.y * (this.SIDE + this.SPACE) + this.regY;
    this.graphics.beginFill(color).drawRoundRect(0, 0, this.SIDE, this.SIDE, this.SIDE / 4);
  }

  Square.prototype.disappear = function() {
    this.removed = true;
    return createjs.Tween.get(this).to({
      scaleX: 0,
      scaleY: 0
    }, 500, createjs.Ease.cubicIn).call(function() {
      return this.parent.removeChild(this);
    });
  };

  return Square;

})(createjs.Shape);



},{}],11:[function(require,module,exports){
"use strict";

/*
 * Copyright © Romain Fouquet, 2015
#
 * romain.fouquet18@gmail.com
#
 * This file is part of 100 squares.
#
 * 100 squares is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
#
 * 100 squares is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
#
 * You should have received a copy of the GNU Affero General Public License
 * along with 100 squares.  If not, see http://www.gnu.org/licenses/agpl-3.0.html.
 */
var DEBUG_MODE, HundredSquares;

HundredSquares = require('./HundredSquares.coffee');

DEBUG_MODE = require('./DevConfig.coffee').DEBUG_MODE;

window.onload = function() {
  var canvas, sg;
  canvas = document.getElementById('gameCanvas');
  if (!DEBUG_MODE) {
    window.onbeforeunload = function() {
      return 'Are you sure you want to quit?';
    };
  }
  window.gameStage = new createjs.Stage(canvas);
  window.canvasHeight = canvas.height;
  window.canvasWidth = canvas.width;
  createjs.Ticker.setFPS(30);
  createjs.Touch.enable(gameStage, true);
  sg = new HundredSquares();
  if (DEBUG_MODE) {
    return gameStage.on('click', function(e) {
      if (e.nativeEvent.which === 2) {
        return console.log(e.stageX, e.stageY);
      }
    });
  }
};



},{"./DevConfig.coffee":3,"./HundredSquares.coffee":7}]},{},[1,2,3,4,5,6,7,8,9,10,11]);
