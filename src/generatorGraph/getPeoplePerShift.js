import { shiftsSchema } from 'data/shiftsSchema';
import { employesDyspo } from 'data/employesDyspo';
import { getEmployeeInfo } from './helpers';

const validateEmployee = (nameEmployee, shiftType, shiftEndHour) => {
  const employee = getEmployeeInfo(nameEmployee);

  if (shiftType === 0 || shiftType === 1) {
    if (employee.bar1 || employee.bar2) {
      return true;
    }
    return false;
  }
  if (shiftType === 4) {
    if (employee.coffee) {
      return true;
    }
    return false;
  }
  if (shiftType === 2 || shiftType === 3) {
    if (employee.obs1 || employee.obs2) {
      if (shiftEndHour > 23 || shiftEndHour > 23) {
        if (employee.sex === 'male') {
          return true;
        }
        return false;
      }
      return true;
    }
    return false;
  }
  return true;
};

export const getPeoplePerShift = () => {
  const peoplePerShift = {
    friday: [],
    saturday: [],
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
  };

  const days = Object.keys(shiftsSchema);

  days.forEach((dayName) => {
    const typesOfShifts = shiftsSchema[dayName];
    const shiftsTypes = Object.keys(shiftsSchema[dayName]);
    const dayShifts = [];
    const employesShiftWholeDay = [];
    shiftsTypes.forEach((shiftTypeName) => {
      const arr = [];

      if (typesOfShifts[shiftTypeName]) {
        typesOfShifts[shiftTypeName].forEach((shift) => {
          arr.push(shift);
        });
        dayShifts.push(arr);
      } else {
        dayShifts.push(false);
      }
    });

    dayShifts.forEach((shiftType, indexShiftType) => {
      const employesTypeShift = [];
      if (shiftType) {
        shiftType.forEach((shift) => {
          const shiftStart = shift[0];
          const shiftEnd = shift[1];
          const employesShift = [];

          employesDyspo.forEach((employee) => {
            const employeeShiftStart = parseFloat(employee.dyspo[dayName].from) - 0.5;
            const employeeShiftsEnd = parseFloat(employee.dyspo[dayName].to) + 0.5;
            const fulidShiftStart = employeeShiftStart > 11 ? -0.5 : 0;
            if (
              employeeShiftStart + fulidShiftStart <= shiftStart &&
              employeeShiftsEnd >= shiftEnd
            ) {
              const passValidation = validateEmployee(employee.name, indexShiftType, shiftEnd);
              if (passValidation) {
                employesShift.push(employee.name);
              }
            }
          });
          employesTypeShift.push(employesShift);
        });
        employesShiftWholeDay.push(employesTypeShift);
      } else {
        employesShiftWholeDay.push(false);
      }
    });

    peoplePerShift[dayName].push(...employesShiftWholeDay);
  });

  return peoplePerShift;
};
