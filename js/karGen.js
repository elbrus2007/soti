function getKgAll() {
	var Kg1 = getKg1(),
		Kg2 = getKg2(),
		Kg3 = Math.abs(Kg1 - Kg2),
		Kg4 = getKg4(),
		Kg5 = Kg1 + Kg2 + Kg3 + Kg4;

	while (Kg5 > 22) {
		Kg5 = Kg5 - 22;
	}
	if (kg5 == 0) kg5 = 22;

	document.querySelector('#kg1').innerHTML = Kg1;
	document.querySelector('#kg2').innerHTML = Kg2;
	document.querySelector('#kg3').innerHTML = Kg3;
	document.querySelector('#kg4').innerHTML = Kg4;
	document.querySelector('#kg5').innerHTML = Kg5;
}

function getKg1() {
	var Ft = document.getElementById('familySum').innerHTML;
	var Nt = document.getElementById('nameSum').innerHTML;
	var kg1 = Math.abs(Ft - Nt);

	while (kg1 > 22) {
		kg1 = kg1 - 22;
	}
	if (kg1 == 0) kg1 = 22;

	return kg1;
}

function getKg2() {
	var Ft = document.getElementById('familySum').innerHTML;
	var Ot = document.getElementById('twoFamilySum').innerHTML;
	var kg2 = Math.abs(Ft - Ot);

	while (kg2 > 22) {
		kg2 = kg2 - 22;
	}
	if (kg2 == 0) kg2 = 22;

	return kg2;
}

function getKg4() {
	var Nt = document.getElementById('nameSum').innerHTML;
	var Ot = document.getElementById('twoFamilySum').innerHTML;
	var kg4 = Math.abs(Nt - Ot);

	while (kg4 > 22) {
		kg4 = kg4 - 22;
	}
	if (kg4 == 0) kg4 = 22;

	return kg4;
}