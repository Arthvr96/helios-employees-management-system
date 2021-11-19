const sortShiftPriority = (shiftPriority) => {
  const days = Object.keys(shiftPriority);

  days.forEach((dayName) => {
    const coffee = shiftPriority[dayName].filter((value) => value[1] === 4);
    let numberOfObs1 = -1;
    let numberOfObs2 = -1;
    shiftPriority[dayName].forEach((value) => (value[1] === 2 ? (numberOfObs1 += 1) : null));
    shiftPriority[dayName].forEach((value) => (value[1] === 3 ? (numberOfObs2 += 1) : null));
    const closeObs = shiftPriority[dayName].filter((value) => {
      if (value[1] === 2 && value[2] === numberOfObs1) {
        return value;
      }
      if (value[1] === 3 && value[2] === numberOfObs2) {
        return value;
      }
      return null;
    });
    const restOfShifts = shiftPriority[dayName].filter((value) => {
      if (value[1] === 2 && value[2] !== numberOfObs1) {
        return value;
      }
      if (value[1] === 3 && value[2] !== numberOfObs2) {
        return value;
      }
      if (value[1] !== 4 && value[1] !== 2 && value[1] !== 3) {
        return value;
      }
      return null;
    });

    coffee.sort((a, b) => a[3] - b[3]);
    closeObs.sort((a, b) => a[3] - b[3]);
    restOfShifts.sort((a, b) => a[3] - b[3]);

    shiftPriority[dayName] = [...coffee, ...closeObs, ...restOfShifts];
  });
};

export const getShiftPriority = (peoplePerShift) => {
  const days = Object.keys(peoplePerShift);
  const shiftPriority = {
    friday: [],
    saturday: [],
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
  };

  days.forEach((dayName) => {
    const day = peoplePerShift[dayName];
    day.forEach((typeOfShift, indexTypeOfShift) => {
      if (typeOfShift) {
        typeOfShift.forEach((shift, indexShift) => {
          shiftPriority[dayName].push([dayName, indexTypeOfShift, indexShift, shift.length]);
        });
      }
    });
  });

  sortShiftPriority(shiftPriority);

  return shiftPriority;
};
