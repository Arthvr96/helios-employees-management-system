const sortShiftPriority = (shiftPriority) => {
  const days = Object.keys(shiftPriority);

  days.forEach((dayName) => {
    const coffee = shiftPriority[dayName].filter((value) => value[1] === 4);
    let numberOfObs1 = 0;
    let numberOfObs2 = 0;
    shiftPriority[dayName].forEach((value) => (value[1] === 2 ? (numberOfObs1 += 1) : null));
    shiftPriority[dayName].forEach((value) => (value[1] === 3 ? (numberOfObs2 += 1) : null));

    const closeObs = shiftPriority[dayName].filter((value) => {
      if (value[1] === 2 && value[2] === numberOfObs1 - 1) {
        return value;
      }
      if (value[1] === 3 && value[2] === numberOfObs2 - 1) {
        return value;
      }
      return null;
    });
    const restOfShifts = shiftPriority[dayName].filter((value) => {
      if (value[1] === 2 && value[2] !== numberOfObs1 - 1) {
        return value;
      }
      if (value[1] === 3 && value[2] !== numberOfObs2 - 1) {
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

// Return an object splited on days. Each day is and array and holds informations about each shift. Inforamtions are in the form of and array. This array have values like : dayName, workplaceID, shiftID and number-of-employees-on-this-shift. This form of providing inforamtions allowed to resign from spliting day for workplaces types.
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
    const peoplePerShiftDay = peoplePerShift[dayName];

    peoplePerShiftDay.forEach((workplaceType, workplaceID) => {
      if (workplaceType) {
        workplaceType.forEach((employeesPerShift, shiftID) => {
          shiftPriority[dayName].push([dayName, workplaceID, shiftID, employeesPerShift.length]);
        });
      }
    });
  });

  sortShiftPriority(shiftPriority);

  return shiftPriority;
};
