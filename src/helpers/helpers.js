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
