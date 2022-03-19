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
  if (dispo[0] === 'freeDay') {
    return '-';
  }
  if (dispo[0] === 'wholeDay') {
    const cPlus = dispo[3];
    const marathon = dispo[4];
    if (cPlus && marathon) {
      return 'M+';
    }
    if (marathon) {
      return 'M';
    }
    if (cPlus) {
      return 'C+';
    }

    return 'C';
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
      return `do ${to}`;
    }
    if (to === '30') {
      return `od ${from}`;
    }
    if (from === '8' && to === '30') {
      return 'C';
    }
    if (from !== '8' && to !== '30') {
      return `od ${from} do ${to}`;
    }
  }
  return null;
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

export const __helpers__ = {
  dispoPlaceholder,
  getShiftMark,
  getArrDays,
};
