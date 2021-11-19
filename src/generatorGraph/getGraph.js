import { shiftsSchema } from 'data/shiftsSchema';
import { getPeoplePerShift } from 'generatorGraph/getPeoplePerShift';
import { getShiftPriority } from 'generatorGraph/getShiftPriority';
import { getEmployeeDyspo, getNameShift } from './helpers';

const peoplePerShift = getPeoplePerShift();
let shiftPriority = getShiftPriority(peoplePerShift);

// object with employes who took shift
export const getGraph = () => {
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

  days.forEach((dayName, dayNumber) => {
    const shifts = shiftPriority[dayName];

    // creating strcuture for everyone day which will reflect the structure of shifts from shiftsSchema
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

    // Removing an employee from morning shifts if he or she closed the cinema the day before, unless the employee agreed to a short rest between shifts
    peoplePerShift[dayName].forEach((shiftType, shiftTypeIndex) => {
      const lastDay = dayName === 'friday' ? 'oldThursday' : days[dayNumber - 1];

      if (shiftType) {
        shiftType.forEach((shiftEmployesList, shiftNumber) => {
          const shiftStart = parseFloat(
            shiftsSchema[dayName][getNameShift(shiftTypeIndex)][shiftNumber][0],
          );
          if (shiftStart < 11) {
            shiftEmployesList.forEach((employee) => {
              const { dyspo, shift } = getEmployeeDyspo(employee);
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

    // selecting the employee who will take the shift
    shifts.forEach((shift) => {
      const typeOfShift = shift[1];
      const numberOfShift = shift[2];
      const priorityEmployes = [];
      const employes = peoplePerShift[dayName][typeOfShift][numberOfShift];

      // check if anyone has given dyspo for this shift, if not "empty" will be added to the vaild array
      if (employes.length !== 0) {
        // calculate priority for employee
        employes.forEach((employeeName) => {
          const { numberOfDyspo, numberOfShifts, additionalPriority, isSkipShift } =
            getEmployeeDyspo(employeeName);
          const addPriority = isSkipShift ? -0.5 : 0;
          const priority =
            numberOfShifts / numberOfDyspo +
            numberOfShifts / 4 -
            numberOfDyspo / 50 +
            additionalPriority +
            addPriority;
          priorityEmployes.push([employeeName, priority]);
        });

        // sort array of employes by priority and add to graph first employee from array
        priorityEmployes.sort((a, b) => a[1] - b[1]);
        graph[dayName][typeOfShift][numberOfShift].push(priorityEmployes[0][0]);
        // increase numberOfShifts for selected employee
        const employee = getEmployeeDyspo(priorityEmployes[0][0]);
        employee.numberOfShifts += 1;
        employee.shift[dayName].push(
          shiftsSchema[dayName][getNameShift(typeOfShift)][numberOfShift],
        );
        // It is not always required but if the employee has been selected then surely his shift has not been missed
        employee.isSkipShift = false;

        // delete the selected employee from the next shifts for the whole day
        peoplePerShift[dayName].forEach((typeShift, indexTypeShift) => {
          if (typeShift) {
            typeShift.forEach((el, indexEl) => {
              const filterArr = el.filter((value) => value !== priorityEmployes[0][0]);
              peoplePerShift[dayName][indexTypeShift][indexEl] = [...filterArr];
              shiftPriority = getShiftPriority(peoplePerShift);
            });
          }
        });
      } else {
        // add "empty to the graph if nobody gave dyspo for shift"
        graph[dayName][typeOfShift][numberOfShift].push('empty');
      }
    });

    // Searching for employees who did not get a shift and adding them to a higher priority for the next day

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
      const employeeDyspo = getEmployeeDyspo(nameEmployee);
      employeeDyspo.isSkipShift = true;
    });
  });

  return graph;
};
