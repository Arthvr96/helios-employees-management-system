import * as XLSX from 'xlsx/xlsx.mjs';

export const dispoPlaceholder = {
  disposition: {
    day1: ['freeDay', '8', '30', false, false],
    day2: ['freeDay', '8', '30', false, false],
    day3: ['freeDay', '8', '30', false, false],
    day4: ['freeDay', '8', '30', false, false],
    day5: ['freeDay', '8', '30', false, false],
    day6: ['freeDay', '8', '30', false, false],
    day7: ['freeDay', '8', '30', false, false],
  },
  message: '',
};

export const getShiftMark = (dispo) => {
  let result = '';

  if (dispo[0] === 'freeDay') {
    result = '-';
  }
  if (dispo[0] === 'wholeDay') {
    const cPlus = dispo[3];
    const marathon = dispo[4];

    if (cPlus && marathon) {
      result = 'M+';
    } else if (marathon) {
      result = 'M';
    } else if (cPlus) {
      result = 'C+';
    } else if (!cPlus && !marathon) {
      result = 'C';
    }
  }
  if (dispo[0] === 'range') {
    let from = parseFloat(dispo[1]);
    let to = parseFloat(dispo[2]);

    if (from % 1 > 0) {
      from = `${parseInt(dispo[1], 10)}:30`;
    } else {
      from = `${from}`;
    }
    if (to % 1 > 0) {
      to = `${parseInt(dispo[2], 10)}:30`;
    } else {
      to = `${to}`;
    }

    if (from === '8') {
      result = `do ${to}`;
    } else if (to === '30') {
      result = `od ${from}`;
    } else if (from !== '8' && to !== '30') {
      result = `${from}~${to}`;
    }
  }

  return result;
};

const getArrDays = (date1, date2) => {
  const getDaysArray = (s, e) => {
    // returns arrays with dates between date 's' and date 'e'.
    const a = [];
    const xe = e;
    if (e.getTimezoneOffset() > s.getTimezoneOffset()) {
      // if date 's' is Summer-time and date 'e' is Standard-time then you need to do this:
      const t = -(s.getTimezoneOffset() - e.getTimezoneOffset()) / 60;
      xe.setDate(xe.getDate() + t);
      // I have no idea what is going on here, but it works
    }
    for (let d = new Date(s); d <= xe; d.setDate(d.getDate() + 1)) {
      a.push(new Date(d));
    }
    return a;
  };

  function getDayName(dateStr, locale) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
  }

  const dayListString = getDaysArray(new Date(date1), new Date(date2));

  dayListString.forEach((el, i) => {
    dayListString[i] = new Date(dayListString[i].getTime() + 1000 * 60 * 60);
  });

  const dayListArr = dayListString.map((v) => v.toISOString().slice(0, 10));

  const daysName = [];
  dayListArr.forEach((day) => {
    daysName.push(getDayName(day, 'pl-PL'));
  });

  const completeArr = [];
  dayListArr.forEach((dayDate, i) => {
    const text = `${daysName[i]} ${dayDate.slice(5, 10).replace('-', '.')}`;
    completeArr.push(text);
  });
  return completeArr;
};

const getDayShortName = (day) => {
  const dayName = day.length > 2 ? day.slice(0, 2) : day;
  switch (dayName) {
    case 'pi':
      return 'pt';

    case 'so':
      return 'sb';

    case 'ni':
      return 'nd';

    case 'po':
      return 'pn';

    case 'wt':
      return 'wt';

    case 'śr':
      return 'śr';

    case 'cz':
      return 'czw';

    default:
      return null;
  }
};

const sortDateCycles = (a, b) => {
  const date1 = new Date(a.slice(0, 10));
  const date2 = new Date(b.slice(0, 10));

  return date2 - date1;
};

const convertFormatDate = (date) => `${date.slice(3, 5)}.${date.slice(0, 2)}`;

const exportToExcel = (ref, type, fn, dl) => {
  const wb = XLSX.utils.table_to_book(ref, { sheet: 'sheet1' });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' })
    : XLSX.writeFile(wb, fn || `MySheetName.${type || 'xlsx'}`);
};

export const __helpers__ = {
  dispoPlaceholder,
  getShiftMark,
  getArrDays,
  getDayShortName,
  exportToExcel,
  convertFormatDate,
  sortDateCycles,
};
