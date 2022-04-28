const dayShape = {
  bar1: {
    isActive: false,
    shifts: [],
  },
  bar2: {
    isActive: false,
    shifts: [],
  },
  obs1: {
    isActive: false,
    shifts: [],
  },
  obs2: {
    isActive: false,
    shifts: [],
  },
  coffee: {
    isActive: false,
    shifts: [],
  },
  tickets: {
    isActive: false,
    shifts: [],
  },
  help: {
    isActive: false,
    shifts: [],
  },
};

export const schemaShape = {
  day1: { ...JSON.parse(JSON.stringify(dayShape)) },
  day2: { ...JSON.parse(JSON.stringify(dayShape)) },
  day3: { ...JSON.parse(JSON.stringify(dayShape)) },
  day4: { ...JSON.parse(JSON.stringify(dayShape)) },
  day5: { ...JSON.parse(JSON.stringify(dayShape)) },
  day6: { ...JSON.parse(JSON.stringify(dayShape)) },
  day7: { ...JSON.parse(JSON.stringify(dayShape)) },
};
