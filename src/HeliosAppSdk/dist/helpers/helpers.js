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
    if (dispo[3]) {
      return 'C+';
    }
    return 'C';
  }
  if (dispo[0] === 'range') {
    if (dispo[1] === '8') {
      return `do ${dispo[2]}`;
    }
    if (dispo[2] === '30') {
      return `od ${dispo[1]}`;
    }
    if (dispo[1] === '8' && dispo[2] === '30') {
      return 'C';
    }
    if (dispo[1] !== '8' && dispo[2] !== '30') {
      return `${dispo[1]}-${dispo[2]}`;
    }
  }
  return null;
};

export const __helpers__ = {
  dispoPlaceholder,
  getShiftMark,
};
