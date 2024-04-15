function getFnzAll() {
  var Fo1 = document.getElementById('fo1').innerHTML;
  var Fo2 = document.getElementById('fo2').innerHTML;
  var Fo4 = document.getElementById('fo4').innerHTML;
  var Fo5 = document.getElementById('fo5').innerHTML;

  var Ub1 = document.getElementById('ub1').innerHTML;
  var Ub2 = document.getElementById('ub2').innerHTML;
  var Ub3 = document.getElementById('ub3').innerHTML;
  var Ub4 = document.getElementById('ub4').innerHTML;
  var Ub5 = document.getElementById('ub5').innerHTML;

  var Fnz1 = getFnz1(Fo1, Fo2);
  var Fnz2 = getFnz2(Fo4, Fo5);
  var Fnz3 = getFnz3(Ub1, Ub2, Ub3, Ub4, Ub5);

  document.getElementById('fnz1').innerHTML = Fnz1;
  document.getElementById('fnz2').innerHTML = Fnz2;
  document.getElementById('fnz3').innerHTML = Fnz3;

}

function getFnz1(Fo1, Fo2) {
  var fnz1 = Math.abs(Fo1 - Fo2);
  while (fnz1 > 22) {
    fnz1 = fnz1 - 22;
  }
  if (fnz1 == 0) fnz1 = 22;
  return fnz1;
}

function getFnz2(Fo4, Fo5) {
  var fnz2 = Math.abs(Fo4 - Fo5);
  while (fnz2 > 22) {
    fnz2 = fnz2 - 22;
  }
  if (fnz2 == 0) fnz2 = 22;
  return fnz2;
}

function getFnz3(ub1, ub2, ub3, ub4, ub5) {
  var fnz3 = parseInt(ub1) + parseInt(ub2) + parseInt(ub3) + parseInt(ub4) + parseInt(ub5);
  while (fnz3 > 22) {
    fnz3 = fnz3 - 22;
  }
  if (fnz3 == 0) fnz3 = 22;
  return fnz3;
}
