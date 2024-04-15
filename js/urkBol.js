function getUbAll() {
	var family = document.getElementById('familyNum').innerHTML;
	var name = document.getElementById('nameNum').innerHTML;
	var twoFamily = document.getElementById('twoFamilyNum').innerHTML;

	var allNum = '';

	allNum = allNum.concat(family, name, twoFamily);

	var Ub1 = getUb1(allNum);
	var Ub2 = getUb2(allNum);
	var Ub3 = getUb3(allNum);
	var Ub4 = getUb4(allNum);
	var Ub5 = getUb5(allNum);

	document.getElementById('ub1').innerHTML = Ub1;
	document.getElementById('ub2').innerHTML = Ub2;
	document.getElementById('ub3').innerHTML = Ub3;
	document.getElementById('ub4').innerHTML = Ub4;
	document.getElementById('ub5').innerHTML = Ub5;
}

function getUb1(all) {
	sum = 0;
	for (var i = 0; i < all.length; i += 5) {
		sum += parseInt(all[i]);
	}

	while (sum > 22) {
		sum = sum - 22;
	}

	return sum;
}


function getUb2(all) {
	sum = 0;
	for (var i = 1; i < all.length; i += 5) {
		sum += parseInt(all[i]);
	}

	while (sum > 22) {
		sum = sum - 22;
	}

	return sum;
}


function getUb3(all) {
	sum = 0;
	for (var i = 2; i < all.length; i += 5) {
		sum += parseInt(all[i]);
	}

	while (sum > 22) {
		sum = sum - 22;
	}

	return sum;
}

function getUb4(all) {
	sum = 0;
	for (var i = 3; i < all.length; i += 5) {
		sum += parseInt(all[i]);
	}

	while (sum > 22) {
		sum = sum - 22;
	}

	return sum;
}

function getUb5(all) {
	sum = 0;
	for (var i = 4; i < all.length; i += 5) {
		sum += parseInt(all[i]);
	}

	while (sum > 22) {
		sum = sum - 22;
	}

	return sum;
}