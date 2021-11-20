import { useContext } from 'react';
import { AdminStateContext } from 'providers/AdminStateProvider/AdminStateProvider';
import { getEmployeeInfo } from './helpers';

const validateEmployee = (nameEmployee, shiftType, shiftEndHour, employeesInfo) => {
  const employee = getEmployeeInfo(nameEmployee, employeesInfo);

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

// Returns an object with people who can take a shift at work. Object is splited on days. Each day is an array. Day keeps next arrays. This arrays represent the type of workplace. Workplace is array too, which holds other arrays that represent separate shifts. Shift array holds short names of employees who gave disposition in line with this shift.
export const usePeoplePerShift = () => {
  const { employeesDispo, employeesInfo, shiftsSchema } = useContext(AdminStateContext);
  const days = Object.keys(shiftsSchema);
  const peoplePerShift = {
    friday: [],
    saturday: [],
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
  };

  // Iterating through all the days of the week

  days.forEach((dayName) => {
    const workplaces = shiftsSchema[dayName];
    const dayShifts = Object.values(workplaces);
    const employesShiftWholeDay = [];

    console.log(dayShifts);

    dayShifts.forEach((workplacesType, indexShiftType) => {
      const employesTypeShift = [];

      if (workplacesType) {
        workplacesType.forEach((shift) => {
          const shiftStart = shift[0];
          const shiftEnd = shift[1];
          const employesShift = [];

          employeesDispo.forEach((employeeDispo) => {
            const employeeDispoStart = parseFloat(employeeDispo.dyspo[dayName].from) - 0.75;
            const employeeDispoEnd = parseFloat(employeeDispo.dyspo[dayName].to) + 0.75;
            if (employeeDispoStart <= shiftStart && employeeDispoEnd >= shiftEnd) {
              const passValidation = validateEmployee(
                employeeDispo.name,
                indexShiftType,
                shiftEnd,
                employeesInfo,
              );
              if (passValidation) {
                employesShift.push(employeeDispo.name);
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
