const MAGIC_NUM = 22,
  DEFAULT_INPUT_FO = 0,
  DEFAULT_CALC_VALUE = 0,
  TOAST_DURATION = 3000,
  CALC_FORM_ID = 'cardFormCalc';

class Logger {
  constructor() {
    this.data = [];
    this.title = '';
  }
  log(d) {
    this.data.push(d);
    return this;
  }
  get() {
    return [...this.data];
  }
  clear() {
    this.data = [];
    this.title = '';
  }

  setTitle(title) {
    this.title = title;
  }
}

class Model {
  constructor() {
    this.resultData = {};
    this.data = {};
  }

  getData() {
    return this.resultData;
  }

  calcData(data = {}) {
    const bcs = new BCS(data.firstName, data.secondName, data.lastName);
    const kch = new Kch(data.birthday);
    const kg = new Kg(
      bcs.objFirstName.sumDigits,
      bcs.objSecondName.sumDigits,
      bcs.objLastName.sumDigits
    );
    const fo = new Fo(kch.getAll(), kg.getAll());
    const ub = new Ub(
      `${bcs.objSecondName.digits}${bcs.objFirstName.digits}${bcs.objLastName.digits}`
    );
    const tb = new Tb(bcs.objSecondName.sumDigits, bcs.objFirstName.sumDigits);
    const fnz = new FNZ(fo.getAll(), ub.getAll());
    const other = new Other(data.birthday, data.fo);

    this.resultData = {
      bcs,
      kch,
      kg,
      fo,
      ub,
      tb,
      fnz,
      other,
    };
  }
}

// Буквенно-цифровые соответствия (БЦС)
class BCS {
  constructor(firstName, secondName, lastName) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.lastName = lastName;
    this.calcAll();
  }

  calcAll() {
    this.objFirstName = this.calcFor(this.firstName);
    this.objSecondName = this.calcFor(this.secondName);
    this.objLastName = this.calcFor(this.lastName);
  }

  calcFor(str) {
    l.log(`${str}`);

    const digits = this.getDigitsFromStr(str);
    l.log(`> Цифры =  ${digits}`);

    const sumDigits = this.calcSumDigits(digits);
    l.log(`> Сумма цифр = ${sumDigits}`);

    const consonants = this.getConsonantsFromStr(str);
    l.log(`> Согласные =  ${consonants}`);

    const sumConsonants = this.calcSumConsonants(consonants);
    l.log(`> Сумма согласных =  ${sumConsonants}`);

    return { digits, sumDigits, consonants, sumConsonants };
  }

  getDigitsFromStr(str) {
    return str.replace(/./gi, ($0) => Utils.symbolsMap.get($0.toLowerCase()) || $0);
  }

  calcSumDigits(n) {
    let r = Utils.sumDigits(n);
    r = Utils.calcMagicNum(r);
    return r;
  }

  getConsonantsFromStr(str) {
    var consonants = str.replace(/[ауоыиэяюёе]/gi, '');
    return this.getDigitsFromStr(consonants);
  }

  calcSumConsonants(n) {
    let r = Utils.sumDigits(n);
    r = Utils.calcMagicNum(r, true);
    return r;
  }
}

// Кармическое число (Karmic Number)
class Kch {
  constructor(birthday) {
    const birthdayDate = new Date(birthday);
    this.birthDay = birthdayDate.getDate();
    this.birthMonth = birthdayDate.getMonth() + 1;
    this.sumBirthYear = Utils.sumDigits(birthdayDate.getFullYear());
    this.calcAll();
  }

  getAll() {
    return {
      kch1: this.kch1,
      kch2: this.kch2,
      kch3: this.kch3,
      kch4: this.kch4,
      kch5: this.kch5,
    };
  }

  calcAll() {
    this.kch1 = this.calcKch1();
    this.kch2 = this.calcKch2();
    this.kch3 = this.calcKch3();
    this.kch4 = this.calcKch4();
    this.kch5 = this.calcKch5();
  }

  calcKch1() {
    let r;
    l.log(`Вычисление КЧ1 для ${this.birthDay}`);

    if (this.birthDay <= MAGIC_NUM) {
      r = Math.abs(this.birthDay - this.birthMonth);
      l.log(`> КЧ1 = День рождения - Месяц рождения`);
      l.log(`> КЧ1 = ${this.birthDay} - ${this.birthMonth}`);
    } else {
      r = Math.abs(this.birthDay - MAGIC_NUM - this.birthMonth);
      l.log(`> КЧ1 = День рождения - ${MAGIC_NUM} - Месяц рождения`);
      l.log(`> КЧ1 = ${this.birthDay} - ${MAGIC_NUM} - ${this.birthMonth}`);
    }
    if (r == 0) r = MAGIC_NUM;

    l.log(`> КЧ1 = ${r}`);

    return r;
  }

  calcKch2() {
    let r;
    l.log(`Вычисление КЧ2 для ${this.birthDay}`);

    if (this.birthDay <= MAGIC_NUM && this.sumBirthYear <= MAGIC_NUM) {
      r = Math.abs(this.birthDay - this.sumBirthYear);
      l.log(`> КЧ2 = День рождения - Сумма цифр года`);
      l.log(`> КЧ2 = ${this.birthDay} - ${this.sumBirthYear}`);
    } else if (this.birthDay <= MAGIC_NUM && this.sumBirthYear > MAGIC_NUM) {
      r = Math.abs(this.birthDay - (this.sumBirthYear - MAGIC_NUM));
      l.log(`> КЧ2 = День рождения - (Сумма цифр года - ${MAGIC_NUM})`);
      l.log(`> КЧ2 = ${this.birthDay} - (${this.sumBirthYear} - ${MAGIC_NUM})`);
    } else if (this.birthDay > MAGIC_NUM && this.sumBirthYear <= MAGIC_NUM) {
      r = Math.abs(this.birthDay - MAGIC_NUM - this.sumBirthYear);
      l.log(`> КЧ2 = День рождения - ${MAGIC_NUM} - Сумма цифр года`);
      l.log(`> КЧ2 = ${this.birthDay} - ${MAGIC_NUM} - ${this.sumBirthYear}`);
    } else if (this.birthDay > MAGIC_NUM && this.sumBirthYear > MAGIC_NUM) {
      r = Math.abs(this.birthDay - MAGIC_NUM - (this.sumBirthYear - MAGIC_NUM));
      l.log(`> КЧ2 = День рождения - ${MAGIC_NUM} - (Сумма цифр года - ${MAGIC_NUM})`);
      l.log(`> КЧ2 = ${this.birthDay} - ${MAGIC_NUM} - (${this.sumBirthYear} - ${MAGIC_NUM})`);
    }
    if (r == 0) r = MAGIC_NUM;

    l.log(`> КЧ2 = ${r}`);

    return r;
  }

  calcKch3() {
    l.log(`Вычисление КЧ3`);

    let r = Math.abs(this.kch2 - this.kch1);
    l.log(`> КЧ3 = КЧ2 - КЧ1`);
    l.log(`> КЧ3 = ${this.kch2} - ${this.kch1}`);

    if (r == 0) r = MAGIC_NUM;

    l.log(`> КЧ3 = ${r}`);

    return r;
  }

  calcKch4() {
    let r;
    l.log(`Вычисление КЧ4`);

    if (this.sumBirthYear <= MAGIC_NUM) {
      r = Math.abs(this.birthMonth - this.sumBirthYear);
      l.log(`> КЧ4 = Месяц рождения - Сумма цифр года`);
      l.log(`> КЧ4 = ${this.birthMonth} - ${this.sumBirthYear}`);
    } else {
      r = Math.abs(this.birthMonth - (this.sumBirthYear - MAGIC_NUM));
      l.log(`> КЧ4 = Месяц рождения - (Сумма цифр года - ${MAGIC_NUM})`);
      l.log(`> КЧ4 = ${this.birthMonth} - (${this.sumBirthYear} - ${MAGIC_NUM})`);
    }
    if (r == 0) r = MAGIC_NUM;

    l.log(`> КЧ4 = ${r}`);

    return r;
  }

  calcKch5() {
    l.log(`Вычисление КЧ5`);
    var r = this.kch1 + this.kch2 + this.kch3 + this.kch4;
    l.log(`> КЧ5 = КЧ1 + КЧ2 + КЧ3 + КЧ4`);
    l.log(`> КЧ5 = ${this.kch1} + ${this.kch2} + ${this.kch3} + ${this.kch4}`);

    r = Utils.calcMagicNum(r, true);

    l.log(`> КЧ5 = ${r}`);

    return r;
  }
}

// Кармические болезни (Karmic Diseases)
class Kg {
  constructor(firstNameSum, secondNameSum, lastNameSum) {
    this.firstNameSum = firstNameSum;
    this.secondNameSum = secondNameSum;
    this.lastNameSum = lastNameSum;
    this.calcAll();
  }

  getAll() {
    return {
      kg1: this.kg1,
      kg2: this.kg2,
      kg3: this.kg3,
      kg4: this.kg4,
      kg5: this.kg5,
    };
  }

  calcAll() {
    this.kg1 = this.calcKg1();
    this.kg2 = this.calcKg2();
    this.kg3 = this.calcKg3();
    this.kg4 = this.calcKg4();
    this.kg5 = this.calcKg5();
  }

  calcKg1(secondNameSum = this.secondNameSum, firstNameSum = this.firstNameSum) {
    l.log(`Вычисление КГ1`);
    let r = Math.abs(secondNameSum - firstNameSum);
    l.log(`> КГ1 = Сумма цифр фамилии - Сумма цифр имени`);
    l.log(`> КГ1 = ${secondNameSum} - ${firstNameSum}`);

    r = Utils.calcMagicNum(r, true);

    l.log(`> КГ1 = ${r}`);

    return r;
  }

  calcKg2(secondNameSum = this.secondNameSum, lastNameSum = this.lastNameSum) {
    l.log(`Вычисление КГ2`);
    let r = Math.abs(secondNameSum - lastNameSum);
    l.log(`> КГ2 = Сумма цифр фамилии - Сумма цифр отчества`);
    l.log(`> КГ2 = ${secondNameSum} - ${lastNameSum}`);

    r = Utils.calcMagicNum(r, true);

    l.log(`> КГ2 = ${r}`);

    return r;
  }

  calcKg3(kg1 = this.kg1, kg2 = this.kg2) {
    l.log(`Вычисление КГ3`);
    let r = Math.abs(kg1 - kg2);
    l.log(`> КГ3 = КГ1 - КГ2`);
    l.log(`> КГ3 = ${kg1} - ${kg2}`);

    r = Utils.calcMagicNum(r, true);

    l.log(`> КГ3 = ${r}`);

    return r;
  }

  calcKg4(firstNameSum = this.firstNameSum, lastNameSum = this.lastNameSum) {
    l.log(`Вычисление КГ4`);
    let r = Math.abs(firstNameSum - lastNameSum);
    l.log(`> КГ4 = Сумма цифр имени - Сумма цифр отчества`);
    l.log(`> КГ4 = ${firstNameSum} - ${lastNameSum}`);

    r = Utils.calcMagicNum(r, true);

    l.log(`> КГ4 = ${r}`);

    return r;
  }

  calcKg5(kg1 = this.kg1, kg2 = this.kg2, kg3 = this.kg3, kg4 = this.kg4) {
    l.log(`Вычисление КГ5`);
    let r = kg1 + kg2 + kg3 + kg4;
    l.log(`> КГ5 = КГ1 + КГ2 + КГ3 + КГ4`);
    l.log(`> КГ5 = ${kg1} + ${kg2} + ${kg3} + ${kg4}`);

    r = Utils.calcMagicNum(r, true);

    l.log(`> КГ5 = ${r}`);

    return r;
  }
}

// Факторы ошибок (Error Factors)
class Fo {
  constructor(kch, kg) {
    this.kch1 = kch.kch1;
    this.kch2 = kch.kch2;
    this.kch3 = kch.kch3;
    this.kch4 = kch.kch4;
    this.kch5 = kch.kch5;

    this.kg1 = kg.kg1;
    this.kg2 = kg.kg2;
    this.kg3 = kg.kg3;
    this.kg4 = kg.kg4;
    this.kg5 = kg.kg5;

    this.calcAll();
  }

  getAll() {
    return {
      fo1: this.fo1,
      fo2: this.fo2,
      fo3: this.fo3,
      fo4: this.fo4,
      fo5: this.fo5,
    };
  }

  calcAll() {
    this.fo1 = this.calcFo(this.kch1, this.kg1);
    this.fo2 = this.calcFo(this.kch2, this.kg2);
    this.fo3 = this.calcFo(this.kch3, this.kg3);
    this.fo4 = this.calcFo(this.kch4, this.kg4);
    this.fo5 = this.calcFo(this.kch5, this.kg5);
  }

  calcFo(kch, kg) {
    l.log(`Вычисление ФО`);
    let r = kch + kg;
    l.log(`> ФО = КЧ + КГ`);
    l.log(`> ФО = ${kch} + ${kg}`);

    r = Utils.calcMagicNum(r, true);

    l.log(`> ФО = ${r}`);

    return r;
  }
}

// Уроки болезни (Lessons Disease)
class Ub {
  constructor(allDigits) {
    this.allDigits = allDigits;
    this.allDigitsLen = allDigits.toString().length;
    this.calcAll();
  }

  getAll() {
    return {
      ub1: this.ub1,
      ub2: this.ub2,
      ub3: this.ub3,
      ub4: this.ub4,
      ub5: this.ub5,
    };
  }

  calcAll() {
    this.ub1 = this.calcUb(0);
    this.ub2 = this.calcUb(1);
    this.ub3 = this.calcUb(2);
    this.ub4 = this.calcUb(3);
    this.ub5 = this.calcUb(4);
  }

  calcUb(idx) {
    l.log(`Вычисление УБ ${idx + 1} для ${this.allDigits} (${this.allDigitsLen})`);
    let r = 0;

    for (var i = idx; i < this.allDigitsLen; i += 5) {
      l.log(`> УБ${idx + 1} = ${r} + ${parseInt(this.allDigits[i])}`);
      r += parseInt(this.allDigits[i]);
    }

    r = Utils.calcMagicNum(r);

    l.log(`> УБ${idx + 1} = ${r}`);

    return r;
  }
}

// Тень болезни (Shadow Disease)
class Tb {
  constructor(secondNameSum, firstNameSum) {
    this.secondNameSum = secondNameSum;
    this.firstNameSum = firstNameSum;
    this.calcAll();
  }

  calcAll() {
    this.tb = this.calcTb();
  }

  calcTb() {
    l.log(`Вычисление ТБ`);
    let r = Math.abs(this.secondNameSum - this.firstNameSum);
    l.log(`> ТБ = |Сумма цифр фамилии - Сумма цифр имени|`);
    l.log(`> ТБ = |${this.secondNameSum} - ${this.firstNameSum}|`);

    r = Utils.calcMagicNum(r);

    l.log(`> ТБ = ${r}`);

    return r;
  }
}

// ФНЗ (FNZ)
class FNZ {
  constructor(fo, ub) {
    this.fo1 = fo.fo1;
    this.fo2 = fo.fo2;
    this.fo3 = fo.fo3;
    this.fo4 = fo.fo4;
    this.fo5 = fo.fo5;

    this.ub1 = ub.ub1;
    this.ub2 = ub.ub2;
    this.ub3 = ub.ub3;
    this.ub4 = ub.ub4;
    this.ub5 = ub.ub5;

    this.calcAll();
  }

  calcAll() {
    this.fnz1 = this.calcFnz1();
    this.fnz2 = this.calcFnz2();
    this.fnz3 = this.calcFnz3();
  }

  calcFnz1(fo1 = this.fo1, fo2 = this.fo2) {
    l.log(`Вычисление ФНЗ1`);
    let r = Math.abs(fo1 - fo2);
    l.log(`> ФНЗ1 = |ФО1 - ФО2|`);
    l.log(`> ФНЗ1 = |${fo1} - ${fo2}|`);

    r = Utils.calcMagicNum(r, true);

    l.log(`> ФНЗ1 = ${r}`);

    return r;
  }

  calcFnz2(fo4 = this.fo4, fo5 = this.fo5) {
    l.log(`Вычисление ФНЗ2`);
    let r = Math.abs(fo4 - fo5);
    l.log(`> ФНЗ2 = |ФО4 - ФО5|`);
    l.log(`> ФНЗ2 = |${fo4} - ${fo5}|`);

    r = Utils.calcMagicNum(r, true);

    l.log(`> ФНЗ2 = ${r}`);

    return r;
  }

  calcFnz3(ub1 = this.ub1, ub2 = this.ub2, ub3 = this.ub3, ub4 = this.ub4, ub5 = this.ub5) {
    l.log(`Вычисление ФНЗ3`);
    let r = ub1 + ub2 + ub3 + ub4 + ub5;
    l.log(`> ФНЗ3 = УБ1 + УБ2 + УБ3 + УБ4 + УБ5`);
    l.log(`> ФНЗ3 = ${ub1} + ${ub2} + ${ub3} + ${ub4} + ${ub5}`);

    r = Utils.calcMagicNum(r, true);

    return r;
  }
}

// Остальное (Other)
class Other {
  constructor(birthday, inputFo) {
    this.birthdayDate = new Date(birthday);
    this.inputFo = parseInt(inputFo);
    this.calcAll();
  }

  getPrognosisDate(date) {
    return {
      zsh: this.calcZsh(date),
      tsh: this.calcTsh(date),
      bzsh: this.calcBzsh(date),
      btsh: this.calcBtsh(date),
      gk: this.calcGk(date),
    };
  }

  calcAll() {
    this.rz = this.calcRz();
    this.opv = this.calcOpv();
    this.sj = this.calcSj();
    this.sz = this.calcSz();
    this.tsh = this.calcTsh();
    this.tp = this.calcTp();
    this.ef = this.calcEf();
    this.mc1 = this.calcMc1();
    this.mc2 = this.calcMc2();
    this.mc3 = this.calcMc3();
    this.zsh = this.calcZsh();
    this.tsh = this.calcTsh();
    this.bzsh = this.calcBzsh();
    this.btsh = this.calcBtsh();
    this.gk = this.calcGk();
  }

  calcRz(date = this.birthdayDate) {
    l.log(`Вычисление РЗ для ${date.toLocaleDateString()}`);
    const g3 = +date.getFullYear().toString()[2];
    const g4 = +date.getFullYear().toString()[3];
    const g3g4 = g3.toString() + g4.toString();
    const d1d2 = date.getDate();
    const m1m2 = date.getMonth() + 1;

    let r = Math.abs(parseInt(g3g4) - parseInt(d1d2) - parseInt(m1m2));
    l.log(`> РЗ = |g3g4 - d1d2 - m1m2|`);
    l.log(`> РЗ = |${parseInt(g3g4)} - ${parseInt(d1d2)} - ${parseInt(m1m2)}|`);
    l.log(`> РЗ = ${r}`);

    r = Utils.calcMagicNum(r, true);
    l.log(`> РЗ = ${r}`);

    return r;
  }

  calcOpv(date = this.birthdayDate) {
    l.log(`Вычисление ОПВ для ${date.toLocaleDateString()}`);
    const mt = date.getMonth() + 1;
    let dt = date.getDate();

    dt = Utils.calcMagicNum(dt);

    let r = Math.abs(parseInt(dt) - parseInt(mt));
    l.log(`> ОПВ = |День рождение - Месяц|`);
    l.log(`> ОПВ = |${dt} - ${mt}|`);

    r = Utils.calcMagicNum(r);
    l.log(`> ОПВ = ${r}`);

    return r;
  }

  calcSj(date = this.birthdayDate, opv = this.opv) {
    l.log(`Вычисление СЖ для ${date.toLocaleDateString()}`);
    let dt = date.getDate();

    dt = Utils.calcMagicNum(dt);

    var r = dt + opv;
    l.log(`> СЖ = День рождение + ОПВ`);
    l.log(`> СЖ = ${dt} + ${opv}`);

    r = Utils.calcMagicNum(r);

    l.log(`> СЖ = ${r}`);

    return r;
  }

  calcSz(date = this.birthdayDate) {
    l.log(`Вычисление СЗ для ${date.toLocaleDateString()}`);
    const mt = date.getMonth() + 1;
    let dt = date.getDate();
    let gt = Utils.sumDigits(date.getFullYear());

    dt = Utils.calcMagicNum(dt);
    gt = Utils.calcMagicNum(gt);

    let r = parseInt(dt) + parseInt(mt) + parseInt(gt);
    l.log(`> СЗ = |День рождение + Месяц + Сумма цифр года|`);

    r = Utils.calcMagicNum(r);
    l.log(`> СЗ = ${r}`);

    return r;
  }

  calcTsh(date = this.birthdayDate) {
    l.log(`Вычисление ТШ для ${date.toLocaleDateString()}`);

    let r = this.calcSz(date);
    l.log(`> ТШ = СЗ`);
    l.log(`> ТШ = ${r}`);

    r = Utils.calcMagicNum(r);
    l.log(`> ТШ = ${r}`);
    return r;
  }

  calcTp(date = this.birthdayDate) {
    l.log(`Вычисление ТП для ${date.toLocaleDateString()}`);
    const mt = date.getMonth() + 1;

    let dt = date.getDate();
    dt = Utils.calcMagicNum(dt);

    let r = parseInt(dt) + parseInt(mt);
    l.log(`> ТП = |День рождение + Месяц|`);
    l.log(`> ТП = ${dt} + ${mt}`);

    r = Utils.calcMagicNum(r);
    l.log(`> ТП = ${r}`);

    return r;
  }

  calcEf(date = this.birthdayDate) {
    l.log(`Вычисление ЭФ для ${date.toLocaleDateString()}`);
    const mt = date.getMonth() + 1;

    let gt = Utils.sumDigits(date.getFullYear());
    gt = Utils.calcMagicNum(gt);

    let r = Math.abs(parseInt(mt) - parseInt(gt));
    l.log(`> ЭФ = |Месяц - Сумма цифр года|`);
    l.log(`> ЭФ = |${mt} - ${gt}|`);

    r = Utils.calcMagicNum(r);
    l.log(`> ЭФ = ${r}`);

    return r;
  }

  calcMc1(date = this.birthdayDate) {
    l.log(`Вычисление МЦ1 для ${date.toLocaleDateString()}`);
    var dt = date.getDate();
    var mt = date.getMonth() + 1;
    var gt = date.getFullYear();

    let r = `${dt}${mt}${gt}`;
    l.log(`> МЦ1 = День рождения + Месяц + Год`);
    l.log(`> МЦ1 = ${dt} + ${mt} + ${gt}`);

    r = Utils.sumDigits(r);
    l.log(`> МЦ1 = ${r}`);

    return r;
  }

  calcMc2(date = this.birthdayDate) {
    l.log(`Вычисление МЦ2 для ${date.toLocaleDateString()}`);
    const mc1 = this.calcMc1(date);
    l.log(`> МЦ2 = МЦ1 + 9`);
    l.log(`> МЦ2 = ${mc1} + 9`);
    l.log(`> МЦ2 = ${mc1 + 9}`);
    return mc1 + 9;
  }

  calcMc3(date = this.birthdayDate) {
    l.log(`Вычисление МЦ3 для ${date.toLocaleDateString()}`);
    const mc2 = this.calcMc2(date);
    l.log(`> МЦ3 = МЦ2 + 9`);
    l.log(`> МЦ3 = ${mc2} + 9`);
    l.log(`> МЦ3 = ${mc2 + 9}`);
    return mc2 + 9;
  }

  calcZsh(date = this.birthdayDate) {
    l.log(`Вычисление ЗШ для ${date.toLocaleDateString()}`);
    let r = this.calcMc1(date);
    l.log(`> ЗШ = МЦ1`);
    l.log(`> ЗШ = ${r}`);
    r = Utils.calcMagicNum(r);
    l.log(`> ЗШ = ${r}`);
    return r;
  }

  calcBzsh(date = this.birthdayDate, inputFo = this.inputFo) {
    l.log(`Вычисление БЗШ для ${date.toLocaleDateString()}`);

    const zsh = this.calcZsh(date);

    let r = zsh + inputFo;
    l.log(`> БЗШ = ЗШ + ОФ`);
    l.log(`> БЗШ = ${zsh} + ${inputFo}`);
    l.log(`> БЗШ = ${r}`);

    r = Utils.calcMagicNum(r);
    l.log(`> БЗШ = ${r}`);

    return r;
  }

  calcBtsh(date = this.birthdayDate, inputFo = this.inputFo) {
    l.log(`Вычисление БТШ для ${date.toLocaleDateString()}`);

    const tsh = this.calcTsh(date);

    let r = tsh + inputFo;
    l.log(`> БТШ = ТШ + ОФ`);
    l.log(`> БТШ = ${tsh} + ${inputFo}`);
    l.log(`> БТШ = ${r}`);

    r = Utils.calcMagicNum(r);
    l.log(`> БТШ = ${r}`);

    return r;
  }

  calcGk(date = this.birthdayDate) {
    l.log(`Вычисление ГК для ${date.toLocaleDateString()}`);
    const zsh = this.calcZsh(date);
    const tsh = this.calcTsh(date);
    const bzsh = this.calcBzsh(date);
    const btsh = this.calcBtsh(date);

    let r = zsh + tsh + bzsh + btsh;
    l.log(`> ГК = ЗШ + ТШ + БЗШ + БТШ`);
    l.log(`> ГК = ${zsh} + ${tsh} + ${bzsh} + ${btsh}`);
    l.log(`> ГК = ${r}`);

    r = Utils.calcMagicNum(r, false, 64);
    l.log(`> ГК = ${r}`);
    return r;
  }

  calcFutureDate(date = this.birthdayDate, dateF = this.futureDate) {
    l.log(
      `Вычисление будущей даты для ${date.toLocaleDateString()} по ${dateF.toLocaleDateString()}`
    );
    const d1 = date.getDate();
    const d2 = dateF.getDate();
    const daysInMonth = 33 - new Date(dateF.getFullYear(), dateF.getMonth(), 33).getDate();

    let newDay = d1 + d2;

    if (newDay > daysInMonth) {
      newDay = newDay - daysInMonth;
    }

    var newDateF = new Date();

    newDateF.setDate(newDay);
    newDateF.setMonth(dateF.getMonth());
    newDateF.setFullYear(dateF.getFullYear());

    l.log(`> Будущая дата: ${newDateF.toDateString()}`);

    return newDateF;
  }
}

class Utils {
  static symbolsMap = new Map([
    ['а', '1'],
    ['б', '2'],
    ['в', '3'],
    ['г', '4'],
    ['д', '5'],
    ['е', '6'],
    ['ё', '7'],
    ['ж', '8'],
    ['з', '9'],
    ['и', '1'],
    ['й', '2'],
    ['к', '3'],
    ['л', '4'],
    ['м', '5'],
    ['н', '6'],
    ['о', '7'],
    ['п', '8'],
    ['р', '9'],
    ['с', '1'],
    ['т', '2'],
    ['у', '3'],
    ['ф', '4'],
    ['х', '5'],
    ['ц', '6'],
    ['ч', '7'],
    ['ш', '8'],
    ['щ', '9'],
    ['ъ', '1'],
    ['ы', '2'],
    ['ь', '3'],
    ['э', '4'],
    ['ю', '5'],
    ['я', '6'],
  ]);

  /* This function takes a number and sums up its digits. */
  static sumDigits(number) {
    const digits = Array.from(number.toString(), Number);
    return digits.reduce((total, digit) => total + digit, 0);
  }

  static calcMagicNum(num, zeroCheck = false, mn = MAGIC_NUM) {
    let r = num;
    while (r > mn) {
      r -= MAGIC_NUM;
    }
    if (zeroCheck && r == 0) {
      r = mn;
    }
    return r;
  }
}

class View {
  renderData = null;

  constructor() {}

  displayLog(logger) {
    const logGroupId =
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const logCollapseId = 'col-' + logGroupId;

    const logContainer = this.$('calcHistory');
    logContainer.insertAdjacentHTML(
      'beforeend',
      `
        <div id="${logGroupId}" class="accordion-item bg-dark">
          <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${logCollapseId}" aria-expanded="false" aria-controls="${logCollapseId}">
            ${logger.title}
          </button>
          <div id="${logCollapseId}" class="accordion-collapse collapse fs-6 font-monospace" data-bs-parent="#calcHistory">
          </div>
          </h2>
        </div>
      `
    );

    const logCollapse = this.$(logCollapseId);

    for (let i = 0; i < logger.data.length; i++) {
      logCollapse.insertAdjacentHTML(
        'beforeend',
        `
          <p class="border-bottom">
            <span class="fw-bold">[${i}]:</span> ${logger.data[i]}
          </p>
        `
      );
    }
  }

  render(data) {
    this.renderData = data;
    this.fillProgressBar();
    this.renderCalcFor();

    this.renderSoti();
    this.renderOther();
    this.renderPym();
    this.renderPdy();
    this.renderKch();
    this.renderKg();
    this.renderFo();
    this.renderUb();
    this.renderBCS();
    this.renderFNZ();
    this.renderTb();
  }

  renderSoti() {
    const fnz = this.renderData.fnz;
    const ub = this.renderData.ub;
    const kch = this.renderData.kch;
    const kg = this.renderData.kg;
    const fo = this.renderData.fo;

    this.$('s-fnz1').textContent = fnz.fnz1;
    this.$('s-fnz2').textContent = fnz.fnz2;
    this.$('s-fnz3').textContent = fnz.fnz3;

    this.$('s-ub1').textContent = ub.ub1;
    this.$('s-ub2').textContent = ub.ub2;
    this.$('s-ub3').textContent = ub.ub3;
    this.$('s-ub4').textContent = ub.ub4;
    this.$('s-ub5').textContent = ub.ub5;

    this.$('s-kch1').textContent = kch.kch1;
    this.$('s-kch2').textContent = kch.kch2;
    this.$('s-kch3').textContent = kch.kch3;
    this.$('s-kch4').textContent = kch.kch4;
    this.$('s-kch5').textContent = kch.kch5;

    this.$('s-kg1').textContent = kg.kg1;
    this.$('s-kg2').textContent = kg.kg2;
    this.$('s-kg3').textContent = kg.kg3;
    this.$('s-kg4').textContent = kg.kg4;
    this.$('s-kg5').textContent = kg.kg5;

    this.$('s-fo1').textContent = fo.fo1;
    this.$('s-fo2').textContent = fo.fo2;
    this.$('s-fo3').textContent = fo.fo3;
    this.$('s-fo4').textContent = fo.fo4;
    this.$('s-fo5').textContent = fo.fo5;
  }

  renderOther() {
    const o = this.renderData.other;
    this.$('otherRz').textContent = o.rz;
    this.$('otherSzh').textContent = o.sj;
    this.$('otherOpv').textContent = o.opv;

    this.$('otherSz').textContent = o.sz;
    this.$('otherTp').textContent = o.tp;
    this.$('otherEf').textContent = o.ef;

    this.$('otherMc1').textContent = `0-${o.mc1}`;
    this.$('otherMc2').textContent = `${o.mc1 + 1}-${o.mc2}`;
    this.$('otherMc3').textContent = `${o.mc2 + 1}-${o.mc3}`;
  }

  renderPym() {
    const other = this.renderData.other;
    this.$('PymZsh').textContent = other.zsh;
    this.$('PymTsh').textContent = other.tsh;
    this.$('PymBzsh').textContent = other.bzsh;
    this.$('PymBtsh').textContent = other.btsh;
    this.$('PymGk').textContent = other.gk;
  }

  renderPdy() {
    const other = this.renderData.other;
    const formData = this.getFormData();
    const dateF = new Date(formData.futureDate);
    const pdy = other.getPrognosisDate(dateF);
    this.$('PdyZsh').textContent = pdy.zsh;
    this.$('PdyTsh').textContent = pdy.tsh;
    this.$('PdyBzsh').textContent = pdy.bzsh;
    this.$('PdyBtsh').textContent = pdy.btsh;
    this.$('PdyGk').textContent = pdy.gk;
  }

  renderKch() {
    const kch = this.renderData.kch;
    this.$('Kch1').textContent = kch.kch1;
    this.$('Kch2').textContent = kch.kch2;
    this.$('Kch3').textContent = kch.kch3;
    this.$('Kch4').textContent = kch.kch4;
    this.$('Kch5').textContent = kch.kch5;
  }

  renderKg() {
    const kg = this.renderData.kg;
    this.$('Kg1').textContent = kg.kg1;
    this.$('Kg2').textContent = kg.kg2;
    this.$('Kg3').textContent = kg.kg3;
    this.$('Kg4').textContent = kg.kg4;
    this.$('Kg5').textContent = kg.kg5;
  }

  renderFo() {
    const fo = this.renderData.fo;
    this.$('Fo1').textContent = fo.fo1;
    this.$('Fo2').textContent = fo.fo2;
    this.$('Fo3').textContent = fo.fo3;
    this.$('Fo4').textContent = fo.fo4;
    this.$('Fo5').textContent = fo.fo5;
  }

  renderUb() {
    const ub = this.renderData.ub;
    this.$('Ub1').textContent = ub.ub1;
    this.$('Ub2').textContent = ub.ub2;
    this.$('Ub3').textContent = ub.ub3;
    this.$('Ub4').textContent = ub.ub4;
    this.$('Ub5').textContent = ub.ub5;
  }

  renderBCS() {
    const BCS = this.renderData.bcs;

    const objFirstName = BCS.objFirstName;
    this.$('SecondNameDigits').textContent = objFirstName.digits;
    this.$('SecondNameSumDigits').textContent = objFirstName.sumDigits;
    this.$('SecondNameConsonants').textContent = objFirstName.consonants;
    this.$('SecondNameSumConsonants').textContent = objFirstName.sumConsonants;

    const objSecondName = BCS.objSecondName;
    this.$('FirstNameDigits').textContent = objSecondName.digits;
    this.$('FirstNameSumDigits').textContent = objSecondName.sumDigits;
    this.$('FirstNameConsonants').textContent = objSecondName.consonants;
    this.$('FirstNameSumConsonants').textContent = objSecondName.sumConsonants;

    const objLastName = BCS.objLastName;
    this.$('LastNameDigits').textContent = objLastName.digits;
    this.$('LastNameSumDigits').textContent = objLastName.sumDigits;
    this.$('LastNameConsonants').textContent = objLastName.consonants;
    this.$('LastNameSumConsonants').textContent = objLastName.sumConsonants;
  }

  renderFNZ() {
    const FNZ = this.renderData.fnz;
    this.$('Fnz1').textContent = FNZ.fnz1;
    this.$('Fnz2').textContent = FNZ.fnz2;
    this.$('Fnz3').textContent = FNZ.fnz3;
  }

  renderTb() {
    const tb = this.renderData.tb;
    this.$('Tb').textContent = tb.tb;
  }

  $(id) {
    const el = document.getElementById(id);
    if (!el) {
      console.error(`Элемент ${id} не найден!`);
    }
    return el;
  }

  showToast(msg) {
    const toastId =
      'toast-' +
      Math.random().toString(36).substring(2, 6) +
      '-' +
      Math.random().toString(36).substring(2, 6);

    const timeAgo = new Date();
    timeAgo.setDate(timeAgo.getDate() - 1);

    const alertTemplate = `
      <div id="${toastId}" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <i class="bi bi-bell-fill"></i>
          <strong class="me-auto">&nbsp;&nbsp;Ого, какая новость!</strong>
          <small>${timeAgo.toLocaleTimeString()}</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          ${msg}
        </div>
      </div>
    `;

    const toastContainer = this.$('toasts');
    toastContainer.insertAdjacentHTML('beforeend', alertTemplate);

    setTimeout(() => {
      const toast = this.$(toastId);
      toast.remove();
      //toast.classList.add('visually-hidden');
    }, TOAST_DURATION);
  }

  checkValidForm(formId) {
    let isValid = true;
    const form = this.$(formId);
    form.querySelectorAll('.form-control').forEach(function (input) {
      if (input.value.trim() === '') {
        isValid = false;
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      }
    });
    return isValid;
  }

  resetForm(formId) {
    const form = this.$(formId);
    form.querySelectorAll('.form-control').forEach(function (input) {
      input.value = '';
      input.classList.remove('is-valid');
      input.classList.remove('is-invalid');
    });
    const fo = this.$('foInput');
    fo.value = DEFAULT_INPUT_FO;
    const cardFooter = this.$('cardFooter');
    cardFooter.textContent = 'Расчет еще не выполнен';
  }

  resetRender() {
    this.$('otherRz').textContent = DEFAULT_CALC_VALUE;
    this.$('otherSzh').textContent = DEFAULT_CALC_VALUE;
    this.$('otherOpv').textContent = DEFAULT_CALC_VALUE;

    this.$('otherSz').textContent = DEFAULT_CALC_VALUE;
    this.$('otherTp').textContent = DEFAULT_CALC_VALUE;
    this.$('otherEf').textContent = DEFAULT_CALC_VALUE;

    this.$('otherMc1').textContent = DEFAULT_CALC_VALUE;
    this.$('otherMc2').textContent = DEFAULT_CALC_VALUE;
    this.$('otherMc3').textContent = DEFAULT_CALC_VALUE;

    this.$('PymZsh').textContent = DEFAULT_CALC_VALUE;
    this.$('PymTsh').textContent = DEFAULT_CALC_VALUE;
    this.$('PymBzsh').textContent = DEFAULT_CALC_VALUE;
    this.$('PymBtsh').textContent = DEFAULT_CALC_VALUE;
    this.$('PymGk').textContent = DEFAULT_CALC_VALUE;

    this.$('PdyZsh').textContent = DEFAULT_CALC_VALUE;
    this.$('PdyTsh').textContent = DEFAULT_CALC_VALUE;
    this.$('PdyBzsh').textContent = DEFAULT_CALC_VALUE;
    this.$('PdyBtsh').textContent = DEFAULT_CALC_VALUE;
    this.$('PdyGk').textContent = DEFAULT_CALC_VALUE;

    this.$('Kch1').textContent = DEFAULT_CALC_VALUE;
    this.$('Kch2').textContent = DEFAULT_CALC_VALUE;
    this.$('Kch3').textContent = DEFAULT_CALC_VALUE;
    this.$('Kch4').textContent = DEFAULT_CALC_VALUE;
    this.$('Kch5').textContent = DEFAULT_CALC_VALUE;

    this.$('Kg1').textContent = DEFAULT_CALC_VALUE;
    this.$('Kg2').textContent = DEFAULT_CALC_VALUE;
    this.$('Kg3').textContent = DEFAULT_CALC_VALUE;
    this.$('Kg4').textContent = DEFAULT_CALC_VALUE;
    this.$('Kg5').textContent = DEFAULT_CALC_VALUE;

    this.$('Fo1').textContent = DEFAULT_CALC_VALUE;
    this.$('Fo2').textContent = DEFAULT_CALC_VALUE;
    this.$('Fo3').textContent = DEFAULT_CALC_VALUE;
    this.$('Fo4').textContent = DEFAULT_CALC_VALUE;
    this.$('Fo5').textContent = DEFAULT_CALC_VALUE;

    this.$('Ub1').textContent = DEFAULT_CALC_VALUE;
    this.$('Ub2').textContent = DEFAULT_CALC_VALUE;
    this.$('Ub3').textContent = DEFAULT_CALC_VALUE;
    this.$('Ub4').textContent = DEFAULT_CALC_VALUE;
    this.$('Ub5').textContent = DEFAULT_CALC_VALUE;

    this.$('SecondNameDigits').textContent = DEFAULT_CALC_VALUE;
    this.$('SecondNameSumDigits').textContent = DEFAULT_CALC_VALUE;
    this.$('SecondNameConsonants').textContent = DEFAULT_CALC_VALUE;
    this.$('SecondNameSumConsonants').textContent = DEFAULT_CALC_VALUE;

    this.$('FirstNameDigits').textContent = DEFAULT_CALC_VALUE;
    this.$('FirstNameSumDigits').textContent = DEFAULT_CALC_VALUE;
    this.$('FirstNameConsonants').textContent = DEFAULT_CALC_VALUE;
    this.$('FirstNameSumConsonants').textContent = DEFAULT_CALC_VALUE;

    this.$('LastNameDigits').textContent = DEFAULT_CALC_VALUE;
    this.$('LastNameSumDigits').textContent = DEFAULT_CALC_VALUE;
    this.$('LastNameConsonants').textContent = DEFAULT_CALC_VALUE;
    this.$('LastNameSumConsonants').textContent = DEFAULT_CALC_VALUE;

    this.$('Fnz1').textContent = DEFAULT_CALC_VALUE;
    this.$('Fnz2').textContent = DEFAULT_CALC_VALUE;
    this.$('Fnz3').textContent = DEFAULT_CALC_VALUE;

    this.$('Tb').textContent = DEFAULT_CALC_VALUE;
  }

  renderCalcFor() {
    const formData = this.getFormData();
    const calcFor = `Расчет для ${formData.secondName} ${formData.firstName} ${formData.lastName} ${formData.birthday}`;
    const cardFooter = this.$('cardFooter');
    cardFooter.textContent = calcFor;
  }

  clearHistory() {
    const calcHistory = this.$('calcHistory');
    calcHistory.textContent = '';
  }

  getFormData() {
    return {
      secondName: document.getElementById('secondName').value,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      birthday: document.getElementById('birthdayInput').value,
      futureDate: document.getElementById('futureDateInput').value,
      fo: document.getElementById('foInput').value,
    };
  }

  fillExample() {
    v.$('secondName').value = 'Иванов';
    v.$('firstName').value = 'Иван';
    v.$('lastName').value = 'Иванович';
    v.$('birthdayInput').value = '1990-01-01';
    v.$('futureDateInput').value = '2025-01-01';
    v.$('foInput').value = DEFAULT_INPUT_FO;
  }

  fillProgressBar() {
    const progressContainer = v.$('progressContainer');
    const progressBar = v.$('progressBar');
    const resultSection = v.$(`result`);

    const sectionTop = resultSection.offsetTop;
    window.scrollTo({
      top: sectionTop,
      behavior: 'smooth',
    });

    progressBar.style.width = '0%';
    progressBar.ariaValueNow = '0';
    progressContainer.classList.remove('visually-hidden');

    const increment = 2.5;
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += increment;
      progressBar.style.width = `${progress}%`;
      progressBar.ariaValueNow = `${progress}%`;
      if (progress >= 100) {
        clearInterval(progressInterval);
        progressContainer.classList.add('visually-hidden');
        progressBar.style.width = '0%';
        progressBar.ariaValueNow = '0';
      }
    }, 100); // milliseconds
  }
}

function clickBtnCalc(event) {
  event.preventDefault();
  event.stopPropagation();

  if (!v.checkValidForm(CALC_FORM_ID)) {
    v.showToast('Заполните все обязательные поля.');
    return;
  }

  const formData = v.getFormData();
  let model = new Model();

  try {
    l.clear();
    l.setTitle(
      `${formData.secondName} ${formData.firstName} ${formData.lastName} ${formData.birthday}`
    );
    l.log('Начало расчета...');

    const startPerf = performance.now();
    model.calcData(formData);

    const endPerf = performance.now();
    const timePerf = (endPerf - startPerf) / 1000;
    l.log(`Расчет занял ${timePerf.toFixed(4)} секунд.`);
  } catch (error) {
    v.showToast('Произошла ошибка при расчете. Попробуйте еще раз.');
  }

  v.render(model.getData());
  l.log('Конец расчета!');
  l.log('---');
}

function clickBtnReset(event) {
  event.preventDefault();
  v.resetForm(CALC_FORM_ID);
  v.resetRender();
  v.showToast('Форма успешно очищена!');
}

function clickBtnExample(event) {
  event.preventDefault();
  event.stopPropagation();
  v.fillExample();
  v.showToast('Форма заполнена примером!');
}

function clickBtnDisplayCalc(event) {
  event.preventDefault();
  event.stopPropagation();
  v.displayLog(l);
}

function clickBtnClearHistory(event) {
  event.preventDefault();
  event.stopPropagation();
  l.clear();
  v.clearHistory();
  v.showToast('История расчетов успешно очищена!');
}

document.addEventListener('DOMContentLoaded', function () {
  const btnCalc = v.$('btnCalc');
  const btnReset = v.$('btnReset');
  const btnExample = v.$('btnExample');
  const btnDisplayCalc = v.$('btnDisplayCalc');
  const btnClearHistory = v.$('btnClearHistory');
  const btnSave = v.$('btnSave');

  btnCalc.addEventListener('click', function (event) {
    clickBtnCalc(event);
  });

  btnReset.addEventListener('click', function (event) {
    clickBtnReset(event);
  });

  btnExample.addEventListener('click', function (event) {
    clickBtnExample(event);
  });

  btnDisplayCalc.addEventListener('click', function (event) {
    clickBtnDisplayCalc(event);
  });

  btnClearHistory.addEventListener('click', function (event) {
    clickBtnClearHistory(event);
  });
});

const l = new Logger();
const v = new View();
