function createCell(row) {
  var newCell = row.insertCell(-1);
  newCell.innerHTML = "<td class='mat_count'><input type='text' id='5_mat_1' name='column_5'>";
  newCell.className = 'mat_count';
  setTimeout(function() {
    newCell.className = 'new';
  }, 100);
  setTimeout(function() {
    newCell.className = '';
  }, 500);
}

function createCell_name(row) {
  var newCell = row.insertCell(-1);
  newCell.innerHTML = "<td'><select><option>Монокристаллический кварц</option><option>Поликристаллический кварц</option><option>Полевые шпаты</option><option>Слюда</option><option>Обломки пород</option><option></option></select>";
  newCell.className = '';
  setTimeout(function() {
    newCell.className = 'new';
  }, 100);
  setTimeout(function() {
    newCell.className = '';
  }, 500);
}

// function CreateForm() {
function createRow(table) {
  var rows = table.tBodies[0].rows;
  var j = rows.length - 1;
  // document.querySelector('table').innerHTML += '<table border="1"><tr><td></td><td></td><td></td><td></td></tr></table>';
  var newRow = table.insertRow(j);
  var colsLength = table.tBodies[0].rows[0].cells.length;
  for (var i = 0; i < colsLength; i++) {
    createCell(newRow);
  }
}

function createColumn(table) {
  var rows = table.tBodies[0].rows;
  for (var i = 1, l = rows.length; i < l; i++) {
    createCell(rows[i]);
  }
  createCell_name(rows[0]);
}

function sum(table){
     total = 0;
         els = document.getElementsByTagName( 'input' );

     for( var el, i = 0; el = els[ i++ ]; ) {
         if ( /^count_/.test( el.id ) ) {
             total += Number( el.value );
         }
     }
document.getElementById("total").innerHTML = total;
}

function sum_without(table){
  var total_without = 0,
      els = document.getElementsByTagName( 'input' );
      var cement = 0;
  for( var el, i = 0; el = els[ i++ ]; ) {
      if ( /^count_/.test( el.id ) ) {
          total_without += Number( el.value );
      }
  }
  for( var el, i = 0; el = els[ i++ ]; ) {
      if ( /^count_1/.test( el.id ) ) {
          cement += Number( el.value );
      }
  }
  total_without -= cement;
  document.getElementById("total_without").innerHTML = total_without;
}

var rounded = function(number){
    return +number.toFixed(2);
}
function vivod(table){
  var elem = "Процентные соотношения элементов: ";
  els = document.getElementsByTagName( 'input' );
  for( var el, i = 0; el = els[ i++ ]; ) {
      if ( /^count_/.test( el.id ) ) {
          elem += rounded(Number( el.value )/total*100)+"%; ";
      }
  }
document.getElementById("viv").innerHTML = elem;
}



document.addEventListener('DOMContentLoaded', function() {
  var table = document.querySelector('table.table');
  document.querySelector('#add-column').onclick = function() {
    createColumn(table);
  }
  document.querySelector('#add-row').onclick = function() {
    createRow(table);
  }
});
// Выполняем по завершении загрузки страницы
window.addEventListener("load", function onWindowLoad() {
    // Инициализируем переменные
    // Генерируем палитру в элемент #palette
    generatePalette(document.getElementById("palette"));

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
  
  
    context.lineWidth = 3;
    context.moveTo(100,600);
    context.lineTo(400, 100);
    context.lineTo(700, 600);
    context.lineTo(100, 600);
    context.stroke();

    // переменные для рисования
    context.lineCap = "round";


    // вешаем обработчики на кнопки
    // очистка изображения
    document.getElementById("clear").onclick = function clear() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.moveTo(100,600);
      context.lineTo(400, 100);
      context.lineTo(700, 600);
      context.lineTo(100, 600);
      context.stroke();
    };

    // На любое движение мыши по canvas будет выполнятся эта функция
    canvas.onmousemove = function drawIfPressed (e) {
      // в "e"  попадает экземпляр MouseEvent
      var x = e.offsetX;
      var y = e.offsetY;
      var dx = e.movementX;
      var dy = e.movementY;

      // Проверяем зажата ли какая-нибудь кнопка мыши
      // Если да, то рисуем
      if (e.buttons > 0) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x - dx, y - dy);
        context.stroke();
        context.closePath();
      }
    };

    function generatePalette(palette) {
      // генерируем палитру
      // в итоге 5^3 цветов = 125
      for (var r = 0, max = 4; r <= max; r++) {
        for (var g = 0; g <= max; g++) {
          for (var b = 0; b <= max; b++) {
            var paletteBlock = document.createElement('div');
            paletteBlock.className = 'button';
            paletteBlock.addEventListener('click', function changeColor(e) {
              context.strokeStyle = e.target.style.backgroundColor;
            });

            paletteBlock.style.backgroundColor = (
              'rgb(' + Math.round(r * 255 / max) + ", "
              + Math.round(g * 255 / max) + ", "
              + Math.round(b * 255 / max) + ")"
            );

            palette.appendChild(paletteBlock);
          }
        }
      }
    }
});
