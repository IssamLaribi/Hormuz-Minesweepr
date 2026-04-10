class Cell {
    constructor(row, col, board) {
        this.row = row;
        this.col = col;
        this.bomb = false;
        this.board = board;
        this.revealed = false;
        this.flagged = false;
        this.adjBombs = 0;
    }

    getAdjCells() {
        var adj = [];
        var lastRow = board.length - 1;
        var lastCol = board[0].length - 1;
        
        var offsets = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1],           [0, 1],
          [1, -1],  [1, 0],  [1, 1]
        ];
        
        offsets.forEach(function(offset) {
          var newRow = this.row + offset[0];
          var newCol = this.col + offset[1];
          
          if (newRow >= 0 && newRow <= lastRow && newCol >= 0 && newCol <= lastCol) {
            if (board[newRow] && board[newRow][newCol]) {
              adj.push(board[newRow][newCol]);
            }
          }
        }.bind(this));
        
        return adj;
    }

    calcAdjBombs() {
        var adjCells = this.getAdjCells();
        var adjBombs = adjCells.reduce(function(acc, cell) {
            return acc + (cell && cell.bomb ? 1 : 0);
        }, 0);
        this.adjBombs = adjBombs;
    }

    flag() {
        if (!this.revealed) {
            this.flagged = !this.flagged;
            return this.flagged;
        }
    }

    reveal() {
        if (this.revealed || hitBomb) return;
        this.revealed = true;
        if (this.bomb) return true;
        if (this.adjBombs === 0) {
            var adj = this.getAdjCells();
            adj.forEach(function(cell) {
                if (cell && !cell.revealed) cell.reveal();
            });
        }
        return false;
    }
}