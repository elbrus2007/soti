function getFoAll() {
	var Fo1 = getFo1(),
		Fo2 = getFo2(),
		Fo3 = getFo3(),
		Fo4 = getFo4(),
		Fo5 = getFo5();

	document.querySelector('#fo1').innerHTML = Fo1;
	document.querySelector('#fo2').innerHTML = Fo2;
	document.querySelector('#fo3').innerHTML = Fo3;
	document.querySelector('#fo4').innerHTML = Fo4;
	document.querySelector('#fo5').innerHTML = Fo5;
}

function getFo1() {
	var Kch1 = document.getElementById('kch1').innerHTML;
	var Kg1 = document.getElementById('kg1').innerHTML;
	var fo1 = parseInt(Kch1) + parseInt(Kg1);
	while (fo1 > 22) {
		fo1 = fo1 - 22;
	}
	if (fo1 == 0) fo1 = 22;
	return fo1;
}

function getFo2() {
	var Kch2 = document.getElementById('kch2').innerHTML;
	var Kg2 = document.getElementById('kg2').innerHTML;
	var fo2 = parseInt(Kch2) + parseInt(Kg2);
	while (fo2 > 22) {
		fo2 = fo2 - 22;
	}
	if (fo2 == 0) fo2 = 22;
	return fo2;
}

function getFo3() {
	var Kch3 = document.getElementById('kch3').innerHTML;
	var Kg3 = document.getElementById('kg3').innerHTML;
	var fo3 = parseInt(Kch3) + parseInt(Kg3);
	while (fo3 > 22) {
		fo3 = fo3 - 22;
	}
	if (fo3 == 0) fo3 = 22;
	return fo3;
}

function getFo4() {
	var Kch4 = document.getElementById('kch4').innerHTML;
	var Kg4 = document.getElementById('kg4').innerHTML;
	var fo4 = parseInt(Kch4) + parseInt(Kg4);
	while (fo4 > 22) {
		fo4 = fo4 - 22;
	}
	if (fo4 == 0) fo4 = 22;
	return fo4;
}

function getFo5() {
	var Kch5 = document.getElementById('kch5').innerHTML;
	var Kg5 = document.getElementById('kg5').innerHTML;
	var fo5 = parseInt(Kch5) + parseInt(Kg5);
	while (fo5 > 22) {
		fo5 = fo5 - 22;
	}
	if (fo5 == 0) fo5 = 22;
	return fo5;
}