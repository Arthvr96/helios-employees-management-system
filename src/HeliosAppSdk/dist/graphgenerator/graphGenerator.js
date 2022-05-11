import { cloneDeep } from 'lodash';

const days = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
const workplaces = ['obs1', 'obs2', 'bar1', 'bar2', 'coffee', 'tickets', 'help'];

const convertObjToArray = (obj) => {
  const body = cloneDeep(obj);
  const arr = Object.values(body);
  return cloneDeep(arr);
};

const getPeopleWhoCanWork = (schema, dispositions, users) => {
  const result = [];
  const peopleWhoCanWork = [];
  days.forEach((day, dayIndex) => {
    const dayArr = [];
    workplaces.forEach((workplace) => {
      const workplaceArr = [];
      if (schema[day][workplace].isActive) {
        schema[day][workplace].shifts.forEach((shift, shiftIndex) => {
          const shiftArr = [];
          dispositions.forEach((dispo) => {
            const userObj = users.find((user) => user.alias === dispo.alias);
            if (dispo.disposition[day] && userObj.workplaces[workplace]) {
              const isNight = shift.night && userObj.workplaces.night;
              if ((isNight && !shift.marathon) || (!shift.night && !shift.marathon)) {
                if (dispo.disposition[day][0] !== 'freeDay') {
                  if (dispo.disposition[day][0] === 'wholeDay') {
                    shiftArr.push(userObj.alias);
                  }
                  if (dispo.disposition[day][0] === 'range') {
                    if (
                      shift.from + 0.5 >= parseInt(dispo.disposition[day][1], 10) &&
                      shift.to - 0.5 <= parseInt(dispo.disposition[day][2], 10)
                    ) {
                      shiftArr.push(userObj.alias);
                    }
                  }
                }
              }
              if (shift.marathon) {
                if (dispo.disposition[day][0] === 'wholeDay' && dispo.disposition[day][4]) {
                  const isObs = workplace === 'obs1' || workplace === 'obs2';
                  if (isObs && userObj.workplaces.night) {
                    shiftArr.push(userObj.alias);
                  } else if (!isObs) {
                    shiftArr.push(userObj.alias);
                  }
                }
              }
              return null;
            }
            return null;
          });
          workplaceArr.push(shiftArr);
        });
      }
      dayArr.push(workplaceArr);
    });
    peopleWhoCanWork.push(dayArr);
  });

  peopleWhoCanWork.forEach((day, dayIndex) => {
    const arrDay = [];
    day.forEach((workplace, workplaceIndex) => {
      workplace.forEach((shift, shiftIndex) => {
        arrDay.push([dayIndex, workplaceIndex, shiftIndex, shift.length, shift]);
      });
    });
    arrDay.sort((a, b) => a[3] - b[3]);
    result.push(arrDay);
  });

  return result;
};

const getGraphShape = (schema) => {
  const result = [];

  days.forEach((day) => {
    const dayArr = [];
    workplaces.forEach((workplace) => {
      const workplaceArr = [];
      if (schema[day][workplace].isActive) {
        schema[day][workplace].shifts.forEach(({ from, to }) => {
          workplaceArr.push({ from, to, employee: '' });
        });
      }
      dayArr.push(workplaceArr);
    });
    result.push(dayArr);
  });

  return result;
};

const selectEmployee = (shift, users, schema) => {
  const dayIndex = shift[0];
  const workplaceIndex = shift[1];
  const shiftIndex = shift[2];
  const shiftStart = schema[days[dayIndex]][workplaces[workplaceIndex]].shifts[shiftIndex].from;
  const arr = shift[4];
  const employeesList = cloneDeep(arr);
  const employeesList2 = [];

  employeesList.forEach((alias) => {
    const obj = users.find((el) => el.alias === alias);

    if (dayIndex > 0) {
      if (obj.temporaryInfo.shiftTaken[days[dayIndex - 1]]) {
        const x = obj.temporaryInfo.shiftTaken[days[dayIndex - 1]][3].to;
        if (x < 23) {
          employeesList2.push(alias);
        }
        if (x >= 23 && x < 26) {
          if (shiftStart > 11) {
            employeesList2.push(alias);
          }
        } else if (x > 26) {
          if (shiftStart > 15.5) {
            employeesList2.push(alias);
          }
        }
      } else {
        employeesList2.push(alias);
      }
    } else {
      employeesList2.push(alias);
    }
  });

  const priorityList = employeesList2.map((alias, i) => {
    const user = users.find((el) => el.alias === alias);
    const divider = user.temporaryInfo.dispoCount > 5 ? 5 : user.temporaryInfo.dispoCount;
    const boost1 = (() => {
      if (user.temporaryInfo.dispoCount === 1) {
        return 0.3;
      }
      if (user.temporaryInfo.dispoCount === 2) {
        return 0.1;
      }
      return 0;
    })();
    const boost2 = user.temporaryInfo.isDispoSkipped ? 2 : 0;
    const deboost1 = (() => {
      switch (user.temporaryInfo.shiftsCount) {
        case 0:
          return -0.15;
        case 1:
          return 0;
        case 2:
          return 0.2;
        case 3:
          return 0.5;
        case 4:
          return 0.7;
        case 5:
          return 0.9;
        case 6:
          return 1.5;
        default:
          return 0;
      }
    })();
    const priority =
      user.temporaryInfo.shiftsCount / divider -
      boost1 -
      boost2 +
      deboost1 +
      user.temporaryInfo.selfPriority[workplaces[shift[1]]];

    return { alias: user.alias, priority };
  });
  priorityList.sort((a, b) => a.priority - b.priority);

  if (priorityList.length) {
    const bestPriority = priorityList[0].priority;
    const evenPriorityList = priorityList.filter((el) => el.priority === bestPriority);

    if (evenPriorityList.length > 1) {
      const r = (m, x) => Math.floor(Math.random() * (Math.floor(x) - Math.ceil(m))) + Math.ceil(m);
      const random = r(0, evenPriorityList.length);

      return evenPriorityList[random].alias;
    }

    return priorityList[0].alias;
  }
  return 'empty';
};

const deleteSelectedEmployee = (arr, employeeName) => {
  const result = [];
  const day = cloneDeep(arr);
  day.forEach((shift) => {
    const employeeList = shift[4].filter((employee) => employee !== employeeName);
    result.push([shift[0], shift[1], shift[2], employeeList.length, [...employeeList]]);
  });
  return cloneDeep(result);
};

const deepSort = (arr) => {
  const day = cloneDeep(arr);
  day.filter((a, b) => b[3] - a[3]);
  return cloneDeep(day);
};

const addTemporaryInfo = (usersArr, dispoArr) => {
  const temporaryInit = {
    dispoCount: 0,
    shiftsCount: 0,
    isDispoSkipped: false,
    selfPriority: {
      bar2: 0,
      bar1: 0,
      tickets: 0,
      obs2: 0,
      obs1: 0,
      night: 0,
      coffee: 0,
    },
    shiftTaken: {
      day1: null,
      day2: null,
      day3: null,
      day4: null,
      day5: null,
      day6: null,
      day7: null,
    },
  };

  const users = cloneDeep(usersArr).map((userObj) => {
    const userDispo = dispoArr.find((el) => el.alias === userObj.alias);
    const dispoCount = Object.values(userDispo.disposition).filter(
      (el) => el[0] !== 'freeDay',
    ).length;
    return {
      ...userObj,
      temporaryInfo: { ...cloneDeep(temporaryInit), dispoCount },
    };
  });

  return cloneDeep(users);
};

export const init = (schemaBody, dispoBody, usersInfo, workdays) => {
  const schema = cloneDeep(schemaBody);
  const dispositions = convertObjToArray(dispoBody);
  const usersBody = convertObjToArray(usersInfo);
  const users = addTemporaryInfo(usersBody, dispositions);
  const graph = getGraphShape(schema);
  const peopleWhoCanWork = getPeopleWhoCanWork(schema, dispositions, users);

  peopleWhoCanWork.forEach((day, dayIndex) => {
    if (workdays[days[dayIndex]]) {
      let dayCopy = cloneDeep(day);
      let skippedDay = [];

      while (dayCopy.length) {
        const firstShift = dayCopy[0];
        const selectedEmployee = selectEmployee(firstShift, users, schema);
        graph[firstShift[0]][firstShift[1]][firstShift[2]] = selectedEmployee;
        users.forEach((user, i) => {
          if (user.alias === selectedEmployee) {
            users[i].temporaryInfo.shiftsCount += 1;
            users[i].temporaryInfo.isDispoSkipped = false;
            users[i].temporaryInfo.shiftTaken[days[firstShift[0]]] = [
              firstShift[0],
              firstShift[1],
              firstShift[2],
              {
                from: schema[days[firstShift[0]]][workplaces[firstShift[1]]].shifts[firstShift[2]]
                  .from,
                to: schema[days[firstShift[0]]][workplaces[firstShift[1]]].shifts[firstShift[2]].to,
              },
            ];
          }
        });
        dayCopy = deleteSelectedEmployee(dayCopy, selectedEmployee);
        skippedDay.push(dayCopy.shift()[4]);
        dayCopy = deepSort(dayCopy);
      }
      const graphDay = [...new Set(graph[dayIndex].reduce((a, b) => a.concat(b), []))];
      skippedDay = [...new Set(skippedDay.reduce((a, b) => a.concat(b), []))];
      const skipped = skippedDay.filter((el) => graphDay.indexOf(el) === -1);
      skipped.forEach((alias) => {
        users.forEach((user, i) => {
          if (user.alias === alias) {
            users[i].temporaryInfo.isDispoSkipped = true;
          }
        });
      });
    }
  });

  return { graph, users };
};
