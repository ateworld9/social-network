const fs = require("fs");
function randomExponential(rate, randomUniform) {
  let U = randomUniform;
  if (typeof randomUniform === "function") U = randomUniform();
  if (!U) U = Math.random(); // нормальное распределение
  return -Math.log(U) / rate;
}
const tuple = (arr1, arr2) => {
  const newArr = [];
  for (let i = 0; i < arr1.length; i++) {
    newArr.push([arr1[i], arr2[i]]);
  }
  return newArr;
};
fs.writeFileSync("answers.txt", "");
const workTime = 16; // Время смены
let profitTogether = 0;
let profit6 = 0;
{
  let totalCashTog = 0; // Общая прибыль при работе с бригадой
  let totalLossTog = 0; // Общие убытки
  // При работе бригады из двух слесарей
  for (let day = 1; day <= 1000; day++) {
    let exState = true; // Экскаватор в исправном состоянии
    let bulState = true; // Бульдозер в исправном состоянии
    let workTimeTog = 0; // время вместе
    let time1 = 0;
    let time2 = 0;
    let exWorkTime = 0; // Работа эксковатора
    let exDownTime = 0; // Время простоя за день
    let bulWorkTime = 0; // Работа бульдозера
    let bulDownTime = 0; // Время простоя за день
    const startWorkExTimeArr = []; // Время старта работы экскаватора
    const startWorkBulTimeArr = []; // Время старта работы бульдозера
    const breakExTimeArr = []; // Время поломки экскаватора
    const breakBulTimeArr = []; // Время поломки бульдозера
    const startExRepairArr = []; //Время начала ремонта экскаватора
    const startBulRepairArr = []; //Время начала ремонта бульд
    const endExRepairArr = []; // Время окончания ремонта экск
    const endBulRepairArr = []; // Время окончания ремонта бульд
    while (time1 <= workTime || time2 <= workTime) {
      //если состояние x работы и смены не закончены
      if (exState && time1 <= workTime) {
        startWorkExTimeArr.push(time1);
        let time = randomExponential(1 / 4); // время работы по экспоненциальному закону
        exWorkTime += time; // Прибавляем время ко времени работы за день
        time1 += time; // Прибавляем время работы ко времени смены
        breakExTimeArr.push(time1); // Заносим время поломки в список
        exState = false; // Экскаватор сломан
      }
      if (bulState && time2 <= workTime) {
        startWorkBulTimeArr.push(time2);
        let time = randomExponential(1 / 6);
        bulWorkTime += time;
        time2 += time;
        breakBulTimeArr.push(time2);
        bulState = false;
      }

      //если состояние x сломан и смены не закончены
      if (!exState && time1 <= workTime) {
        if (bulState || time1 < time2) {
          startExRepairArr.push(time1);
          let i = randomExponential(1 / 0.25);
          time1 += i;
          workTimeTog += i;
          endExRepairArr.push(time1);
          exState = true; // починили
          // если сломан экскаватор и бульдозер
          if (!bulState && time2 < time1) {
            startBulRepairArr.push(time2);
            let j = time1 - time2;
            exDownTime += j;
            time2 += j;
            endBulRepairArr.push(time2);
          }
        }
      }
      if (!bulState && time2 <= workTime) {
        if (exState || time1 > time2) {
          startBulRepairArr.push(time2);
          let time = randomExponential(1 / 1.5);
          time2 += time;
          workTimeTog += time;
          endBulRepairArr.push(time2);
          bulState = true;
          if (!exState && time2 > time1) {
            startExRepairArr.push(time1);
            let time = time2 - time1;
            exDownTime += time;
            time1 += time;
            endExRepairArr.push(time1);
          }
        }
      }
    }

    if (breakExTimeArr && breakExTimeArr[breakExTimeArr.length - 1] > 16) {
      breakExTimeArr[breakExTimeArr.length - 1] = 16;
    } // Если список с оконачанием работы не пуст и последний элемент больше 16
    if (
      startExRepairArr &&
      startExRepairArr[startExRepairArr.length - 1] > 16
    ) {
      startExRepairArr[startExRepairArr.length - 1] = 16;
    }
    if (endExRepairArr && endExRepairArr[endExRepairArr.length - 1] > 16) {
      endExRepairArr[endExRepairArr.length - 1] = 16;
    }
    if (breakBulTimeArr && breakBulTimeArr[breakBulTimeArr.length - 1] > 16) {
      breakBulTimeArr[breakBulTimeArr.length - 1] = 16;
    }
    if (
      startBulRepairArr &&
      startBulRepairArr[startBulRepairArr.length - 1] > 16
    ) {
      startBulRepairArr[startBulRepairArr.length - 1] = 16;
    }
    if (endBulRepairArr && endBulRepairArr[endBulRepairArr.length - 1] > 16) {
      endBulRepairArr[endBulRepairArr.length - 1] = 16;
    }
    totalCashTog += exWorkTime * 500 + bulWorkTime * 300; // Выручка за день прибавляется к общей прибыли
    totalCashTog = Math.ceil(totalCashTog); // Округление прибыли до целого
    totalLossTog +=
      exDownTime * 500 + bulDownTime * 300 + workTimeTog * (100 + 60 + 50); // Убытки за день прибавляются к общим убыткам
    totalLossTog = Math.ceil(totalLossTog); // Убытки округляются до целого
    const exWorkList = tuple(
      startWorkExTimeArr.map((el) => el.toFixed(2)),
      breakExTimeArr.map((el) => el.toFixed(2))
    ); // Создаем список рабочего цикла экскаватора
    const bulWorkList = tuple(
      startWorkBulTimeArr.map((el) => el.toFixed(2)),
      breakBulTimeArr.map((el) => el.toFixed(2))
    );
    const exRepairList = tuple(
      startExRepairArr.map((el) => el.toFixed(2)),
      endExRepairArr.map((el) => el.toFixed(2))
    ); // Список цикла ремонта экск
    const bulRepairList = tuple(
      startBulRepairArr.map((el) => el.toFixed(2)),
      endBulRepairArr.map((el) => el.toFixed(2))
    ); // Список цикла ремонта бульдозер
    // дозапись файла
    fs.appendFileSync("answers.txt", `\nDay ${day}`);
    fs.appendFileSync("answers.txt", "\nРабочий цикл экскаватора:");
    for (i in exWorkList)
      fs.appendFileSync(
        "answers.txt",
        ` [${exWorkList[i]}] `.replace(",", ", ")
      );
    fs.appendFileSync("answers.txt", "\nРемонтый цикл экскаватора:");
    for (i in exRepairList)
      fs.appendFileSync(
        "answers.txt",
        ` [${exRepairList[i]}] `.replace(",", ", ")
      );
    fs.appendFileSync("answers.txt", "\nРабочий цикл бульдозера:");
    for (i in bulWorkList)
      fs.appendFileSync(
        "answers.txt",
        ` [${bulWorkList[i]}] `.replace(",", ", ")
      );
    fs.appendFileSync("answers.txt", "\nРемонтый цикл бульдозера:");
    for (i in bulRepairList)
      fs.appendFileSync(
        "answers.txt",
        ` [${bulRepairList[i]}] `.replace(",", ", ")
      );
    fs.appendFileSync("answers.txt", "\nЧистая прибыль:");
    profitTogether = totalCashTog - totalLossTog; // Вычисляется чистая прибыль за 1000 дней
    fs.appendFileSync("answers.txt", `${Math.ceil(profitTogether)}`);
  }
}
{
  let totalCash6 = 0; // Прибыль от работы только слесаря 6 разряда
  let totalLoss6 = 0; // Убытки от работы слесаря 6 разряда
  // При работе слесаря 6-го разряда
  for (let day = 1; day <= 1000; day++) {
    let exState = true; // Экскаватор в исправном состоянии
    let bulState = true; // Бульдозер в исправном состоянии
    let workTime6 = 0; // время слесаря 6-го разраяда
    let time1 = 0;
    let time2 = 0;
    let exWorkTime = 0; // Работа эксковатора
    let exDownTime = 0; // Время простоя за день
    let bulWorkTime = 0; // Работа бульдозера
    let bulDownTime = 0; // Время простоя за день
    const startWorkExTimeArr = []; // Время старта работы экскаватора
    const startWorkBulTimeArr = []; // Время старта работы бульдозера
    const breakExTimeArr = []; // Время поломки экскаватора
    const breakBulTimeArr = []; // Время поломки бульдозера
    const startExRepairArr = []; //Время начала ремонта экскаватора
    const startBulRepairArr = []; //Время начала ремонта бульд
    const endExRepairArr = []; // Время окончания ремонта экск
    const endBulRepairArr = []; // Время окончания ремонта бульд

    while (time1 <= workTime || time2 <= workTime) {
      //если состояние x работы и смены не закончены
      if (exState && time1 <= workTime) {
        startWorkExTimeArr.push(time1);
        let time = randomExponential(1 / 4); // время работы по экспоненциальному закону
        exWorkTime += time; // Прибавляем время работы ко времени работы за день
        time1 += time; // Прибавляем время работы ко времени смены
        breakExTimeArr.push(time1); // Заносим время поломки в список
        exState = false; // Экскаватор сломан
      }
      if (bulState && time2 <= workTime) {
        startWorkBulTimeArr.push(time2);
        let time = randomExponential(1 / 6);
        bulWorkTime += time;
        time2 += time;
        breakBulTimeArr.push(time2);
        bulState = false;
      }
      //если состояние x сломан и смены не закончены
      if (!exState && time1 <= workTime) {
        if (bulState || time1 < time2) {
          startExRepairArr.push(time1);
          let i = randomExponential(1 / 1);
          time1 += i;
          workTime6 += i;
          endExRepairArr.push(time1);
          exState = true; // починили
          // если сломан экскаватор и бульдозер
          if (!bulState && time2 < time1) {
            startBulRepairArr.push(time2);
            let j = time1 - time2;
            exDownTime += j;
            time2 += j;
            endBulRepairArr.push(time2);
          }
        }
      }
      if (!bulState && time2 <= workTime) {
        if (exState || time1 > time2) {
          startBulRepairArr.push(time2);
          let time = randomExponential(1 / 2);
          time2 += time;
          workTime6 += time;
          endBulRepairArr.push(time2);
          bulState = true;
          if (!exState && time2 > time1) {
            startExRepairArr.push(time1);
            let time = time2 - time1;
            exDownTime += time;
            time1 += time;
            endExRepairArr.push(time1);
          }
        }
      }
    }

    if (breakExTimeArr && breakExTimeArr[breakExTimeArr.length - 1] > 16) {
      breakExTimeArr[breakExTimeArr.length - 1] = 16;
    } // Если список с оконачанием работы не пуст и последний элемент больше 16
    if (
      startExRepairArr &&
      startExRepairArr[startExRepairArr.length - 1] > 16
    ) {
      startExRepairArr[startExRepairArr.length - 1] = 16;
    }
    if (endExRepairArr && endExRepairArr[endExRepairArr.length - 1] > 16) {
      endExRepairArr[endExRepairArr.length - 1] = 16;
    }
    if (breakBulTimeArr && breakBulTimeArr[breakBulTimeArr.length - 1] > 16) {
      breakBulTimeArr[breakBulTimeArr.length - 1] = 16;
      if (
        startBulRepairArr &&
        startBulRepairArr[startBulRepairArr.length - 1] > 16
      ) {
        startBulRepairArr[startBulRepairArr.length - 1] = 16;
      }
      if (endBulRepairArr && endBulRepairArr[endBulRepairArr.length - 1] > 16) {
        endBulRepairArr[endBulRepairArr.length - 1] = 16;
      }
      totalCash6 += exWorkTime * 500 + bulWorkTime * 300; // Выручка за день прибавляется к общей прибыли
      totalCash6 = Math.ceil(totalCash6); // Округление прибыли до целого
      totalLoss6 +=
        exDownTime * 500 + bulDownTime * 300 + workTime6 * (100 + 50); // Убытки за день прибавляются к общим убыткам
      totalLoss6 = Math.ceil(totalLoss6); // Убытки округляются до целого
      const exWorkList = tuple(
        startWorkExTimeArr.map((el) => el.toFixed(2)),
        breakExTimeArr.map((el) => el.toFixed(2))
      ); // Создаем список рабочего цикла экскаватора
      const bulWorkList = tuple(
        startWorkBulTimeArr.map((el) => el.toFixed(2)),
        breakBulTimeArr.map((el) => el.toFixed(2))
      );
      const exRepairList = tuple(
        startExRepairArr.map((el) => el.toFixed(2)),
        endExRepairArr.map((el) => el.toFixed(2))
      ); // Список цикла ремонта экск

      const bulRepairList = tuple(
        startBulRepairArr.map((el) => el.toFixed(2)),
        endBulRepairArr.map((el) => el.toFixed(2))
      ); // Список цикла ремонта бульдозер
      // дозапись файла
      fs.appendFileSync("answers.txt", `\nDay ${day}`);
      fs.appendFileSync("answers.txt", "\nРабочий цикл экскаватора:");
      for (i in exWorkList)
        fs.appendFileSync(
          "answers.txt",
          ` [${exWorkList[i]}] `.replace(",", ", ")
        );
      fs.appendFileSync("answers.txt", "\nРемонтый цикл экскаватора:");
      for (i in exRepairList)
        fs.appendFileSync(
          "answers.txt",
          ` [${exRepairList[i]}] `.replace(",", ", ")
        );
      fs.appendFileSync("answers.txt", "\nРабочий цикл бульдозера:");
      for (i in bulWorkList)
        fs.appendFileSync(
          "answers.txt",
          ` [${bulWorkList[i]}] `.replace(",", ", ")
        );
      fs.appendFileSync("answers.txt", "\nРемонтый цикл бульдозера:");
      for (i in bulRepairList)
        fs.appendFileSync(
          "answers.txt",
          ` [${bulRepairList[i]}] `.replace(",", ", ")
        );
      fs.appendFileSync("answers.txt", "\nЧистая прибыль:");
      profit6 = totalCash6 - totalLoss6; // Вычисляется чистая прибыль за 1000 дней
      fs.appendFileSync("answers.txt", `${Math.ceil(profit6)}`);
    }
  }
}

console.log(`Доход за 1000 дней с бригадой: ${profitTogether}`);
console.log(`Доход за 1000 дней со слесарем 6-го разряда: ${profit6}`);
console.log(`Итого разница: ${profitTogether - profit6}`);
console.log(
  `Итого разница в процентах: ${100 - (profit6 / profitTogether) * 100}`
);
if (profitTogether < profit6) {
  console.log("Рекомендовано уволить слесаря 3-го разряда");
} else {
  console.log("Рекомендовано не увольнять слесаря 3-го разряда");
}
