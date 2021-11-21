import { getPeoplePerShift } from 'generatorGraph/getPeoplePerShift';
import { getShiftPriority } from 'generatorGraph/getShiftPriority';
import { getEmployeeDyspo, getNameShift } from './helpers';

// creating strcuture for everyone day which will reflect the structure of shifts from shiftsSchema
const createStructureOfGraph = (days, peoplePerShift, graph) => {
  days.forEach((dayName) => {
    peoplePerShift[dayName].forEach((shiftType, shiftTypeIndex) => {
      if (shiftType) {
        graph[dayName].push([]);
        for (let i = 0; i < shiftType.length; i += 1) {
          graph[dayName][shiftTypeIndex].push([]);
        }
      } else {
        graph[dayName].push(false);
      }
    });
  });
};

// Removing an employee from morning shifts if he or she closed the cinema the day before, unless the employee agreed to a short rest between shifts
const checkIsShortBreak = (values, days, dayNumber) => {
  const { peoplePerShift, shiftsSchema, employeesDispo, dayName } = values;
  peoplePerShift[dayName].forEach((shiftType, shiftTypeIndex) => {
    const lastDay = dayName === 'friday' ? 'oldThursday' : days[dayNumber - 1];

    if (shiftType) {
      shiftType.forEach((shiftEmployesList, shiftNumber) => {
        const shiftStart = parseFloat(
          shiftsSchema[dayName][getNameShift(shiftTypeIndex)][shiftNumber][0],
        );
        if (shiftStart < 11) {
          shiftEmployesList.forEach((employee) => {
            const { dyspo, shift } = getEmployeeDyspo(employee, employeesDispo);
            const employeePrevShiftEnd = shift[lastDay].length > 0 ? shift[lastDay][0][1] : null;

            if (!dyspo[dayName].shortRest && employeePrevShiftEnd === '24') {
              const arr1 = [...peoplePerShift[dayName][shiftTypeIndex][shiftNumber]];
              const filterArr1 = arr1.filter((value) => value !== employee);
              peoplePerShift[dayName][shiftTypeIndex][shiftNumber] = [...filterArr1];
            }
          });
        }
      });
    }
  });
};

// Searching for employees who did not get a shift and adding them to a higher priority for the next day
const handleSetAdditionalPriority = (peoplePerShift, employeesDispo, dayName) => {
  const employesWithOutShift = [];
  peoplePerShift[dayName].forEach((typeOfShift) => {
    if (typeOfShift) {
      typeOfShift.forEach((shift) => {
        shift.forEach((employee) => {
          if (employesWithOutShift.indexOf(employee) === -1) {
            employesWithOutShift.push(employee);
          }
        });
      });
    }
  });
  employesWithOutShift.forEach((nameEmployee) => {
    const employeeDyspo = getEmployeeDyspo(nameEmployee, employeesDispo);
    employeeDyspo.isSkipShift = true;
  });
};

// Choosing an employee for a shift
const getEmployeePerShift = (values, shiftPriority, graph) => {
  const { peoplePerShift, shiftsSchema, employeesDispo, dayName } = values;
  const shiftPriorityDay = [...shiftPriority[dayName]];

  while (shiftPriorityDay.length > 0) {
    const firstShift = shiftPriorityDay[0];
    const workpalceID = firstShift[1];
    const shiftID = firstShift[2];
    const priorityEmployees = [];
    const employees = peoplePerShift[dayName][workpalceID][shiftID];

    if (employees.length !== 0) {
      employees.forEach((employeeName) => {
        const { numberOfDyspo, numberOfShifts, additionalPriority, isSkipShift } = getEmployeeDyspo(
          employeeName,
          employeesDispo,
        );
        const addPriority = isSkipShift ? -0.5 : 0;
        const priority =
          numberOfShifts / numberOfDyspo +
          numberOfShifts / 4 -
          numberOfDyspo / 50 +
          additionalPriority +
          addPriority;
        priorityEmployees.push([employeeName, priority]);
      });
      priorityEmployees.sort((a, b) => a[1] - b[1]);
      graph[dayName][workpalceID][shiftID].push(priorityEmployees[0][0]);

      // increase numberOfShifts for selected employee
      const employee = getEmployeeDyspo(priorityEmployees[0][0], employeesDispo);
      employee.numberOfShifts += 1;
      employee.shift[dayName].push(shiftsSchema[dayName][getNameShift(workpalceID)][shiftID]);
      // It is not always required but if the employee has been selected then surely his shift has not been missed
      employee.isSkipShift = false;

      peoplePerShift[dayName].forEach((workplaceType, workplaceTypeID) => {
        if (workplaceType) {
          workplaceType.forEach((shiftEmployees, shiftEmployeesID) => {
            const filterArr = shiftEmployees.filter((value) => value !== priorityEmployees[0][0]);
            peoplePerShift[dayName][workplaceTypeID][shiftEmployeesID] = [...filterArr];
            // shiftPriority = getShiftPriority(peoplePerShift);
            shiftPriorityDay.forEach((shift) => {
              if (shift[1] === workplaceTypeID && shift[2] === shiftEmployeesID) {
                shift[3] -= 1;
              }
            });
          });
        }
      });
    } else {
      // add "empty to the graph if nobody gave dyspo for shift"
      graph[dayName][workpalceID][shiftID].push('empty');
    }
    shiftPriorityDay.shift();
    // sortShiftPriority(shiftPriorityDay);
    shiftPriorityDay.sort((a, b) => a[3] - b[3]);
  }
};

export const getGraph = (employeesDispo, shiftsSchema, employeesInfo) => {
  const peoplePerShift = getPeoplePerShift(employeesDispo, shiftsSchema, employeesInfo);
  const shiftPriority = getShiftPriority(peoplePerShift);
  const graph = {
    friday: [],
    saturday: [],
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
  };
  const days = Object.keys(graph);

  createStructureOfGraph(days, peoplePerShift, graph);

  days.forEach((dayName, dayNumber) => {
    const values = { peoplePerShift, shiftsSchema, employeesDispo, dayName };
    checkIsShortBreak(values, days, dayNumber);
    getEmployeePerShift(values, shiftPriority, graph);
    handleSetAdditionalPriority(peoplePerShift, employeesDispo, dayName);
  });

  return graph;
};
