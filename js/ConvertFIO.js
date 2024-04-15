function convertFIO() {
  var name = document.getElementById('nameField').value;
  var family = document.getElementById('familyField').value;
  var twoFamily = document.getElementById('twoFamilyField').value;

  var nameNum = document.getElementById('nameNum');
  var familyNum = document.getElementById('familyNum');
  var twoFamilyNum = document.getElementById('twoFamilyNum');

  var nameSum = document.getElementById('nameSum');
  var familySum = document.getElementById('familySum');
  var twoFamilySum = document.getElementById('twoFamilySum');

  var nameSogl = document.getElementById('nameSogl');
  var familySogl = document.getElementById('familySogl');
  var twoFamilySogl = document.getElementById('twoFamilySogl');

  insertFIO(name, family, twoFamily);

  insertAll(name, nameNum, nameSum, nameSogl, nameSoglSum);
  insertAll(family, familyNum, familySum, familySogl, familySoglSum);
  insertAll(twoFamily, twoFamilyNum, twoFamilySum, twoFamilySogl, twoFamilySoglSum);
}

function insertAll(str, elem, sum, sogl) {
  removeGlass(str, sogl);
  sumSogl();
  str = insertNum(str, elem);
  insertSum(str, sum);
}

function insertNum(str, elem) {
  str = str.replace(/./gi, $0 => symbolsMap[$0.toLowerCase()] || $0);
  elem.innerHTML = str;
  return str;
}

function insertSum(str, elem) {
  str = sumDigits(parseInt(str));
  while (str > 22) {
    str = str - 22;
  }
  elem.innerHTML = str;
}

function insertFIO(name, family, twoFamily) {
  document.getElementById('nameName').innerHTML = name;
  document.getElementById('familyFamily').innerHTML = family;
  document.getElementById('twoFamilyTwoFamily').innerHTML = twoFamily;
}

function sumDigits(n) {
  n = `${n}`.split('');
  let sum = 0;
  for (let digit of n) {
    sum += +digit;
  }
  return sum;
}

function getSumSogl(elem) {
  var sum = sumDigits(elem);
  while (sum > 22) {
    sum = sum - 22;
  }
  if (sum == 0) sum = 22;
  return sum;
}

function removeGlass(str, sogl) {
  var numSogl = str.replace(/[ауоыиэяюёе]/gi, '');
  numSogl = numSogl.replace(/./gi, $0 => symbolsMap[$0.toLowerCase()] || $0);
  sogl.innerHTML = numSogl;
}

function sumSogl() {
  document.getElementById('nameSoglSum').innerHTML = getSumSogl(document.getElementById('nameSogl').innerHTML);
  document.getElementById('familySoglSum').innerHTML = getSumSogl(document.getElementById('familySogl').innerHTML);
  document.getElementById('twoFamilySoglSum').innerHTML = getSumSogl(document.getElementById('twoFamilySogl').innerHTML);
}

var symbolsMap = {
  а: '1',
  б: '2',
  в: '3',
  г: '4',
  д: '5',
  е: '6',
  ё: '7',
  ж: '8',
  з: '9',
  и: '1',
  й: '2',
  к: '3',
  л: '4',
  м: '5',
  н: '6',
  о: '7',
  п: '8',
  р: '9',
  с: '1',
  т: '2',
  у: '3',
  ф: '4',
  х: '5',
  ц: '6',
  ч: '7',
  ш: '8',
  щ: '9',
  ъ: '1',
  ы: '2',
  ь: '3',
  э: '4',
  ю: '5',
  я: '6',
};