console.log('hello');

$(()  => {

//Draw a grid
const connect4 = new Connect4('#connect4')


});


class Connect4 {
  constructor (selector) {
    this.ROWS = 6;
    this.COLS = 7;
    this.player = 'red';
    this.selector = selector;
    this.createGrid();
    this.setupEventListeners();
  }

  createGrid() {
    const $board = $(this.selector);
    for (let row = 0; row < this.ROWS; row++) {
    const $row = $('<div>')
    .addClass('row empty');
    for (let col = 0; col < this.COLS; col++) {
    const $col = $('<div>')
    .addClass('col empty')
    .attr('data-col', col)
    .attr('data-row', row);


    $row.append($col);
    }
    $board.append($row);

    }
  }
    setupEventListeners() {
      const $board = $(this.selector);

      const that = this;


      function findLastEmptyCell(col) {
        const cells = $(`.col[data-col='${col}']`);
        for (let i = cells.length -1; i>=0; i--) {
          const $cell =$(cells[i]);
          if ($cell.hasClass ('empty')) {
            return $cell;
          }
      }

      return null;
    }

      $board.on('mouseenter', '.col.empty', function() {
        const col = $(this).data('col');
        const $lastEmptyCell =findLastEmptyCell(col);
        $lastEmptyCell.addClass(`next-${that.player}`);

      // console.log('here', this);
    });

    $board.on('mouseleave', '.col', function()  {
      $('.col').removeClass(`next-${that.player}`);
    });

    $board.on('click', '.col.empty', function() {
        const col = $(this).data('col');
        const row = $(this).data('row');
        const $lastEmptyCell = findLastEmptyCell(col);
        $lastEmptyCell.removeClass(`empty next -${that.player}`);
        $lastEmptyCell.addClass(that.player);
        $lastEmptyCell.data('player', that.player);

        const winner = that.checkForWinner(row, col)
        if  (winner)  {
          alert(`Game over! Player ${that.player} has won!`);
          return;
        }


        that.player = (that.player === 'red') ? 'black' : 'red';
        $(this).trigger('mouseenter');

    });
  }




  checkForWinner(row, col) {
      const that = this;


      function $getCell(i, j) {
        return $(`.col[data-row='${i}'] [data-col='${j}']`);
      }


      function checkDirection(direction)  {
        let total = 0;
        let i = row + direction.i;
        let j = col + direction.j;
        let $next = $getCell(i, j);
        while (i >= 0 &&
         i < that.ROWS &&
          j >= 0 &&
           j < that.COLS &&
           $next.data('player') === that.player
        ) {
          total++;
          i += direction.i;
          j += direction.j;
          $next = $getCell(i , j);
        }
        return total;
      }


    function checkWin(directionA, directionB) {
      const total = 1 +
      checkDirection(directionA) +
      checkDirection(directionB);
      if (total >= 4) {
        return that.player;
      } else {
        return null;
      }
  }

  function checkVerticals() {
    return checkWin({i: -1, j: 0}, {i: 1, j: 0})

  }

  function checkHorizontals() {
    return checkWin({i: 0, j: -1}, {i: 0, j: 1})

  }

  return checkVerticals() || checkHorizontals()
  }
}
