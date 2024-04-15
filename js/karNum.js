function getKchAll() {
	var inputDate = document.querySelector('#date');
	var date = new Date(inputDate.value);

	var Dt = date.getDate();
	var Mt = date.getMonth() + 1;
	var Gt = digit(date.getFullYear());

	var Kch1 = getKch1(Dt, Mt),
		Kch2 = getKch2(Dt, Gt),
		Kch3 = getKch3(Kch2, Kch1),
		Kch4 = getKch4(Mt, Gt),
		Kch5 = getKch5(Kch1, Kch2, Kch3, Kch4);

	document.querySelector('#kch1').innerHTML = Kch1;
	document.querySelector('#kch2').innerHTML = Kch2;
	document.querySelector('#kch3').innerHTML = Kch3;
	document.querySelector('#kch4').innerHTML = Kch4;
	document.querySelector('#kch5').innerHTML = Kch5;
}

function getKch1(Dt, Mt) {
	var Kch1;
	if (Dt <= 22) {
		Kch1 = Math.abs(Dt - Mt);
	} else {
		Kch1 = Math.abs(Dt - 22 - Mt);
	}
	if (Kch1 == 0) Kch1 = 22;
	return Kch1;
}

function getKch2(Dt, Gt) {
	var Kch2;
	if (Dt <= 22 && Gt <= 22) {
		Kch2 = Math.abs(Dt - Gt);
	} else if (Dt <= 22 && Gt > 22) {
		Kch2 = Math.abs(Dt - (Gt - 22));
	} else if (Dt > 22 && Gt <= 22) {
		Kch2 = Math.abs(Dt - 22 - Gt);
	} else if (Dt > 22 && Gt > 22) {
		Kch2 = Math.abs(Dt - 22 - (Gt - 22));
	}
	if (Kch2 == 0) Kch2 = 22;
	return Kch2;
}

function getKch3(Kch2, Kch1) {
	var Kch3;
	Kch3 = Math.abs(Kch2 - Kch1);
	if (Kch3 == 0) Kch3 = 22;
	return Kch3;
}

function getKch4(Mt, Gt) {
	var Kch4;
	if (Gt <= 22) {
		Kch4 = Math.abs(Mt - Gt);
	} else {
		Kch4 = Math.abs(Mt - (Gt - 22));
	}
	if (Kch4 == 0) Kch4 = 22;
	return Kch4;
}

function getKch5(Kch1, Kch2, Kch3, Kch4) {
	var Kch5;
	Kch5 = Kch1 + Kch2 + Kch3 + Kch4;
	while (Kch5 > 22) {
		Kch5 = Kch5 - 22;
	}
	if (Kch5 == 0) Kch5 = 22;
	return Kch5;
}


function digit(number) {
	var figures = '' + number;
	var sum = 0;

	for (var i = 0; i < figures.length; i++) sum += +figures[i];

	return sum;
}