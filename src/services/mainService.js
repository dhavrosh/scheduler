export function generateUUID() {
  let d = new Date().getTime();

  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now();
  }

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });

  return uuid;
}

export function StateProp(value, isRequired) {
  this.value = value;
  this.isRequired = isRequired;
}

export function getClasses(classes) {
  const days = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat'
  };
  const today = new Date().getDay();
  const tomorrow = today === 6 ? 0 : today + 1;
  const classesToday = [];
  const classesTomorrow = [];

  classes.forEach(classObj => {
    classObj.times.value.forEach(time => {
      const timeToday = time.days.find(day => day === days[today]);
      const timeTomorrow = time.days.find(day => day === days[tomorrow]);

      timeToday && classesToday.push(processClassObj(classObj, time));
      timeTomorrow && classesTomorrow.push(processClassObj(classObj, time));
    })
  });

  return {
    today: classesToday,
    tomorrow: classesTomorrow
  }
}

function processClassObj(obj, time) {
  return {
    value: obj,
    start: `${time.start.hour}:${time.start.minute}`,
    end: `${time.end.hour}:${time.end.minute}`
  }
}