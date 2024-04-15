function getOther() {
  var inputDate = document.querySelector("#date");
  var date = new Date(inputDate.value);

  var Rz = getRz(date);
  document.getElementById("rz").innerHTML = Rz;

  var OPV = getOPV(date);
  document.getElementById("opv").innerHTML = OPV;

  var Sj = getSj(date, OPV);
  document.getElementById("sj").innerHTML = Sj;

  var Sz = getSz(date);
  document.getElementById("sz").innerHTML = Sz;
  while (Sz > 22) {
    Sz -= 22;
  }
  document.getElementById("tsh").innerHTML = Sz;

  var Tp = getTp(date);
  document.getElementById("tp").innerHTML = Tp;

  var Ef = getEf(date);
  document.getElementById("ef").innerHTML = Ef;

  var MC1 = getMC1(date);
  document.getElementById("1mc").innerHTML = "0 - " + MC1;

  var MC2 = getMC2(MC1);
  document.getElementById("2mc").innerHTML = MC1 + 1 + " - " + MC2;

  var MC3 = getMC3(MC2);
  document.getElementById("3mc").innerHTML = MC2 + 1 + " - " + MC3;

  while (MC1 > 22) {
    MC1 -= 22;
  }
  document.getElementById("zsh").innerHTML = MC1;

  var BZSH = getBzsh(MC1);
  document.getElementById("bzsh").innerHTML = BZSH;

  var tsh = document.getElementById("tsh").innerHTML;
  var BTSH = getBtsh(tsh);
  document.getElementById("btsh").innerHTML = BTSH;

  var zsh = document.getElementById("zsh").innerHTML;
  var tsh = document.getElementById("tsh").innerHTML;
  var bzsh = document.getElementById("bzsh").innerHTML;
  var btsh = document.getElementById("btsh").innerHTML;
  var Gk = getGk(zsh, tsh, bzsh, btsh);
  document.getElementById("gk").innerHTML = Gk;


  var inputDateF = document.querySelector("#dateF");
  var dateF = new Date(inputDateF.value);
  var dateFday = getFutureDate(date, dateF);
  alert(dateFday);
  writeProgDay(dateFday);
}

function writeProgDay(date) {
  var zshDay = getMC1(date);
  var tshDay = getSz(date);
  var bzshDay = getBzsh(zshDay);
  var btshDay = getBtsh(tshDay);
  var gkDay = getGk(zshDay, tshDay, bzshDay, btshDay);

  document.getElementById("zsh2").innerHTML = zshDay;
  document.getElementById("tsh2").innerHTML = tshDay;
  document.getElementById("bzsh2").innerHTML = bzshDay;
  document.getElementById("btsh2").innerHTML = btshDay;
  document.getElementById("gk2").innerHTML = gkDay;
}

function getFutureDate(date, dateF) {
  var d1 = date.getDate();
  var d2 = dateF.getDate();
  var newDay = parseInt(d1) + parseInt(d2);
  if (newDay > parseInt(dateF.daysInMonth())) {
    newDay = newDay - parseInt(dateF.daysInMonth());
  }
  var newDateF = new Date();
  newDateF.setDate(newDay);
  newDateF.setMonth(dateF.getMonth());
  newDateF.setFullYear(dateF.getFullYear());
  return newDateF;
}

function getGk(zsh, tsh, bzsh, btsh) {
  var gk = parseInt(zsh) + parseInt(tsh) + parseInt(bzsh) + parseInt(btsh);
  while (gk > 64) {
    gk -= 22;
  }
  return gk;
}

function getBtsh(tsh) {
  var FO = document.getElementById("foField").value;
  var btsh = parseInt(tsh) + parseInt(FO);
  while (btsh > 22) {
    btsh -= 22;
  }
  return btsh;
}

function getBzsh(zsh) {
  var FO = document.getElementById("foField").value;
  var bzsh = parseInt(zsh) + parseInt(FO);
  while (bzsh > 22) {
    bzsh -= 22;
  }
  return bzsh;
}

function getRz(date) {
  var g3g4 = "";
  var g3 = +date.getFullYear().toString()[2];
  var g4 = +date.getFullYear().toString()[3];
  g3g4 += g3.toString() + g4.toString();

  var d1d2 = date.getDate();
  var m1m2 = date.getMonth() + 1;

  var rz = Math.abs(parseInt(g3g4) - parseInt(d1d2) - parseInt(m1m2));

  while (rz > 22) {
    rz -= 22;
  }
  if (rz == 0) rz = 22;
  return rz;
}

function getOPV(date) {
  var Mt = date.getMonth() + 1;
  var Dt = date.getDate();
  while (Dt > 22) {
    Dt -= 22;
  }
  var opv = Math.abs(parseInt(Dt) - parseInt(Mt));
  while (opv > 22) {
    opv -= 22;
  }
  return opv;
}

function getSj(date, opv) {
  var Dt = date.getDate();
  while (Dt > 22) {
    Dt = Dt - 22;
  }
  var sj = Dt + opv;
  while (sj > 22) {
    sj -= 22;
  }
  return sj;
}

function getSz(date) {
  var Dt = date.getDate();
  var Mt = date.getMonth() + 1;
  var Gt = digit(date.getFullYear());
  while (Dt > 22) {
    Dt -= 22;
  }
  while (Gt > 22) {
    Gt -= 22;
  }
  var sz = parseInt(Dt) + parseInt(Mt) + parseInt(Gt);
  while (sz > 22) {
    sz -= 22;
  }
  return sz;
}

function digit(number) {
  var figures = "" + number;
  var sum = 0;

  for (var i = 0; i < figures.length; i++) sum += +figures[i];

  return sum;
}

function getTp(date) {
  var Dt = date.getDate();
  while (Dt > 22) {
    Dt -= 22;
  }
  var Mt = date.getMonth() + 1;
  var tp = parseInt(Dt) + parseInt(Mt);
  while (tp > 22) {
    tp -= 22;
  }
  return tp;
}

function getEf(date) {
  var Mt = date.getMonth() + 1;
  var Gt = digit(date.getFullYear());
  while (Gt > 22) {
    Gt -= 22;
  }
  var ef = Math.abs(parseInt(Mt) - parseInt(Gt));
  while (ef > 22) {
    ef -= 22;
  }
  return ef;
}

function getMC1(date) {
  var Dt = date.getDate();
  var Mt = date.getMonth() + 1;
  var Gt = date.getFullYear();
  var mc1 = "";
  mc1 += Dt.toString() + Mt.toString() + Gt.toString();
  mc1 = digit(mc1);
  return mc1;
}

function getMC2(mc1) {
  var mc2 = mc1 + 9;
  return mc2;
}

function getMC3(mc2) {
  var mc3 = mc2 + 9;
  return mc3;
}

Date.prototype.daysInMonth = function () {
  return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};
