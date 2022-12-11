var fs = require("fs");
const { parse } = require("csv-parse");
const globalData = {};
const resultObj = {};

const valuesCalc = function (lbdug, newRow) {
  if (!(lbdug in resultObj)) {
    resultObj[lbdug] = {
      calc1: 0,
      calc2: 0,
      calc3: 0,
      calc4: 0,
      calc5: 0,
      calc6: 0,
      calc7: 0,
      calc8: 0,
      calc9: 0,
      calc10: 0,
      calc11: 0,
      calc12: 0,
      calc13: 0,
      calc14: 0,
      calc24: 0,
      calc15: 0,
      calc16: 0,
      calc17: 0,
      calc18: 0,
      calc19: 0,
      calc20: 0,
      calc21: 0,
      calc22: 0,
      calc23: 0,
      calc24: 0,
      calc25: 0,
      calc26: 0,
    };
  }
  const currentLbdug = resultObj[lbdug];
  // console.log({currentLbdug, lbdug})
  function checkIfStringStartsWith(str, substrs) {
    return substrs.some((substr) => str.toString().startsWith(substr));
  }

  // 73
  const scStartWithValue = function (startWith, butNot, butNotStart) {
    // startWith'',butNotStart [], butNot []
    if (butNot && butNot.some((t) => t == newRow.compte)) return 0;
    if (
      butNotStart?.length > 0 &&
      checkIfStringStartsWith(newRow.compte, butNotStart)
    )
      return 0;
    if (checkIfStringStartsWith(newRow.compte, [startWith]))
      return Number(newRow.sc);
    return 0;
  };

  const scExactEqual = (exact) =>
    newRow.compte == exact ? Number(newRow.sc) : 0;
  const sdExactEqual = (exact) =>
    newRow.compte == exact ? Number(newRow.sd) : 0;
  // old
  // {
  //     let credit = globalData[lbdug]?.sc ?? 0;
  //     const lbudgChecker = function () {
  //         if (newRow && checkIfStringStartsWith(newRow.compte, startWith)) {
  //             credit += data[i].fields.sc;
  //         }
  //     }
  //     lbudgChecker();
  //     return credit;
  // }

  const sdStartWithValue = function (startWith, butNotStart, butNot) {
    // startWith'',butNotStart [], butNot []
    if (butNot && butNot.some((t) => t == newRow.compte)) return 0;
    if (
      butNotStart?.length > 0 &&
      checkIfStringStartsWith(newRow.compte, butNotStart)
    )
      return 0;
    if (checkIfStringStartsWith(newRow.compte, [startWith]))
      return Number(newRow.sd);
    return 0;
  };

  //operatoin 1
  currentLbdug.calc1 +=
    scStartWithValue("73") - scExactEqual("739117") - scExactEqual("739117");
  if (currentLbdug.calc1 != 0 && !currentLbdug.calc1) {
    console.log({ newRow });
  }
  currentLbdug.calc2 +=
    -sdStartWithValue("739113") -
    sdStartWithValue("73918") -
    sdStartWithValue("73921") -
    sdStartWithValue("739222", "", ["739221"]);
  //calc 3 function
  currentLbdug.calc3 += scStartWithValue("70");
  //calc4
  currentLbdug.calc4 += scStartWithValue("75");

  //calc5
  currentLbdug.calc5 += scStartWithValue("76");

  //calc6
  currentLbdug.calc6 +=
    scStartWithValue("771") +
    scStartWithValue("772") +
    scStartWithValue("773") +
    scStartWithValue("774") +
    scStartWithValue("775") +
    scStartWithValue("778") +
    scStartWithValue("779");

  currentLbdug.calc7 += scStartWithValue("10223");
  currentLbdug.calc8 += scStartWithValue("10226");
  currentLbdug.calc9 += scStartWithValue("102267");
  currentLbdug.calc10 += scStartWithValue("10251");
  currentLbdug.calc11 += scStartWithValue("103");

  //result 12
  currentLbdug.calc12 += scStartWithValue("1335") + scStartWithValue("1345");

  //result 13
  currentLbdug.calc13 += scStartWithValue("1336") + scStartWithValue("1346");

  currentLbdug.calc14 += scStartWithValue("27", "", [
    "271",
    "272",
    "27634",
    "27635",
    "2768",
    "279",
  ]);

  currentLbdug.calc15 += scStartWithValue("74");
  // calc 16
  currentLbdug.calc16 += -sdStartWithValue("6554");
  //cal17
  currentLbdug.calc17 += -sdStartWithValue("65734") - sdStartWithValue("65735");
  currentLbdug.calc18 += -sdExactEqual("739118");
  currentLbdug.calc19 += scStartWithValue("10", [
    "10223",
    "10226",
    "10227",
    "10251",
    "1027",
    "103",
    "106",
  ]);

  currentLbdug.calc20 += scStartWithValue("13", [
    "1335",
    "1336",
    "1346",
    "1345",
    "139",
  ]);

  //21
  currentLbdug.calc21 += -sdExactEqual("20414") - sdExactEqual("20415");

  //22
  currentLbdug.calc22 +=
    scExactEqual("454") + scExactEqual("456") + scExactEqual("458");

  //Main calculations
  // const calc23 = calc1 + calc2 + calc3 + calc4 + calc5 + calc6 + calc7 + calc8 + calc9 + calc10 + calc11 + calc12 + calc13 + calc14;

  // //2nd main
  // const calc24 = calc15 + calc16 + calc17 + calc18 + calc19 + calc20 + calc22;

  // //3rd main
  // const calc25 = calc23 + calc24;

  // //fourth main
  // const calc26 = (calc23 / calc25) * 100;

  // const objectReturned = {
  //     LBUDG: lbdug,
  //     Calcul23: calc23,
  //     Calcul24: calc24,
  //     Calcul25: calc25,
  //     Calcul26: calc26

  // }

  // return objectReturned
};

function toLowerKeys(obj) {
  return Object.keys(obj).reduce((accumulator, key) => {
    let val = obj[key];
    // console.log(key)
    if (key == "COMPTE" || key == "SC" || key == "SD") {
      val = +val.replace(",", "");
    }
    accumulator[key.toLowerCase()] = val;
    return accumulator;
  }, {});
}
function calculateComulativeValue(obj) {
  obj.calc23 =
    obj.calc1 +
    obj.calc2 +
    obj.calc3 +
    obj.calc4 +
    obj.calc5 +
    obj.calc6 +
    obj.calc7 +
    obj.calc8 +
    obj.calc9 +
    obj.calc10 +
    obj.calc11 +
    obj.calc12 +
    obj.calc13 +
    obj.calc14;
  obj.calc24 =
    obj.calc15 +
    obj.calc16 +
    obj.calc17 +
    obj.calc18 +
    obj.calc19 +
    obj.calc20 +
    obj.calc22;
  obj.calc25 = obj.calc23 + obj.calc24;
  if (obj.cal25) {
    obj.calc26 = (obj.calc23 / obj.calc25) * 100;
  }
}
function calc(filename) {
  console.log(filename);
  fs.createReadStream(filename)
    .pipe(parse({ delimiter: ";", columns: true }))
    .on("data", function (row) {
      const newRow = toLowerKeys(row);
      globalData[row.LBUDG.toLowerCase()] = newRow;
      valuesCalc(row.LBUDG.toLowerCase(), newRow);
    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", function () {
      Object.keys(resultObj).forEach((key) =>
        calculateComulativeValue(resultObj[key])
      );
      Object.keys(resultObj).forEach((key) => (resultObj[key].name = key));
      const fastcsv = require("fast-csv");
      const ws = fs.createWriteStream(`out.${filename}`);
      fastcsv.write(Object.values(resultObj), { headers: true }).pipe(ws);
      console.log("finished");
    });
}
module.exports = { calc: calc };
