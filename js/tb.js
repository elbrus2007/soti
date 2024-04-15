function getTb() {
	var Ft = document.getElementById('familySum').innerHTML;
	var Nt = document.getElementById('nameSum').innerHTML;

	var Tb = Math.abs(Ft - Nt);
	while (Tb > 22) {
		Tb = Tb - 22;
	}

	document.getElementById('tb').innerHTML = Tb;
}