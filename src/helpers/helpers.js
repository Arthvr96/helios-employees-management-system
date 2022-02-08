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

export const randomColor = () => {
  const number = Math.floor(Math.random() * 10);
  let color;

  switch (number) {
    case 0:
      color = '132469';
      break;
    case 1:
      color = '2A50E8';
      break;
    case 2:
      color = '29366B';
      break;
    case 3:
      color = '213EB5';
      break;
    case 4:
      color = '3C1369';
      break;
    case 5:
      color = '03690C';
      break;
    case 6:
      color = '6821B5';
      break;
    case 7:
      color = '694803';
      break;
    case 8:
      color = 'E82A2A';
      break;
    case 9:
      color = '6B2222';
      break;
    case 10:
      color = 'B52121';
      break;
    default:
      color = 'E8A107';
  }
  return color;
};
