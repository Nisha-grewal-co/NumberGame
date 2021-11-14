var gameOver = document.getElementById('game-over');
var resetButton = document.getElementById('restart-button');
var score = document.getElementById('scoreValue');
// HTMLCollection to Array
var tiles = [];

var tilesize = 50;
var gRows = Math.floor($('.main').innerWidth() / tilesize) - 1;
var gCols = Math.floor($('.main').innerHeight() / tilesize) - 1;

var rowBlocks = [];
var colBlocks = [];

for (let i = 0; i < gRows; i++) {
  rowBlocks.push(i + 1);
  colBlocks.push(i + 1);
}

// MAIN FUNCTION

start();

function start() {
  gameOver.classList.remove('show-game-over');
  score.innerHTML = 0;
  var dataList = generateDataList(5);

  rowBlocks = shuffleArray(rowBlocks);
  colBlocks = shuffleArray(colBlocks);

  for (let i = 0; i < dataList.length; i++) {
    //random color
    // var color = '#' + Math.round(0xffffff * Math.random()).toString(16);

    $newdiv = $('<div/>').addClass('tile');
    var posx = rowBlocks[i] * tilesize;
    var posy = colBlocks[i] * tilesize;

    $newdiv
      .css({
        width: tilesize + 'px',
        height: tilesize + 'px',
        position: 'absolute',
        left: posx + 'px',
        top: posy + 'px',
      })
      .appendTo('.main')
      .html(dataList[i]);
  }

  // all blocks
  tiles = [...document.getElementsByClassName('tile')];

  // on click handler on block
  tiles.forEach((t) => {
    t.addEventListener('click', function () {
      var activeTiles = [...document.getElementsByClassName('activeTile')];
      if (activeTiles.length > 0) {
        if (t.classList.contains('activeTile')) {
          t.classList.remove('activeTile');
        } else {
          if (eval(t.innerHTML) == eval(activeTiles[0].innerHTML)) {
            console.log('success');
            score.innerHTML = eval(score.innerHTML) + 5;
            t.classList.add('removedTile');
            t.classList.remove('tile');
            activeTiles[0].classList.remove('tile');
            activeTiles[0].classList.remove('activeTile');
            activeTiles[0].classList.add('removedTile');

            var updatedTilesList = [...document.getElementsByClassName('tile')];
            if (updatedTilesList.length == 0) {
              gameOver.classList.add('show-game-over');
            }
          } else {
            console.log('wrong');
            activeTiles[0].classList.remove('activeTile');
          }
        }
      } else {
        t.classList.add('activeTile');
      }
    });
  });
}

function generateDataList(no_of_exp) {
  var dataList = [];
  for (i = 0; i < no_of_exp; i++) {
    let randomExpression = getRandomExp();
    dataList.push(randomExpression.exp);
    dataList.push(randomExpression.res);
  }
  return dataList;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

function getRandomExp() {
  var a = Math.floor(Math.random() * 10) + 1;
  var b = Math.floor(Math.random() * 10) + 1;

  var expList = ['+', '-', '*'];

  var opr = expList[Math.floor(Math.random() * expList.length)];

  var exp = a.toString() + opr + b.toString();
  return { exp, res: eval(exp) };
}

resetButton.addEventListener('click', function () {
  tiles.forEach((t) => {
    t.classList.remove('tile');
    t.classList.remove('activeTile');
    t.classList.add('removedTile');
  });
  start();
});
