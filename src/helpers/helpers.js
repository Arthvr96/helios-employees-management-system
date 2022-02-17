export const getPolishDayName = (dayName) => {
  let polishDayName;

  switch (dayName) {
    case 'friday':
      polishDayName = 'piątek';
      break;
    case 'saturday':
      polishDayName = 'sobota';
      break;
    case 'sunday':
      polishDayName = 'niedziela';
      break;
    case 'monday':
      polishDayName = 'poniedziałek';
      break;
    case 'tuesday':
      polishDayName = 'wtorek';
      break;
    case 'wednesday':
      polishDayName = 'środa';
      break;
    case 'thursday':
      polishDayName = 'czwartek';
      break;
    default:
      return null;
  }
  return polishDayName;
};

export const dispoPlaceholder = {
  day1: ['freeDay', '8', '30', false, false],
  day2: ['freeDay', '8', '30', false, false],
  day3: ['freeDay', '8', '30', false, false],
  day4: ['freeDay', '8', '30', false, false],
  day5: ['freeDay', '8', '30', false, false],
  day6: ['freeDay', '8', '30', false, false],
  day7: ['freeDay', '8', '30', false, false],
};
