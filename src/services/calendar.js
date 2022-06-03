import {
  format,
  subDays,
  isThisMonth,
  eachWeekendOfMonth,
  addMonths,
  getMonth,
  setHours,
  differenceInCalendarDays,
  isFirstDayOfMonth,
  lastDayOfMonth,
} from 'date-fns';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {API_URL} from '@env';

// CALENDAR DAY DOTS COLOR
export const dotColors = {
  schools1: {
    key: 'schools1',
    color: '#F9A300',
    selectedDotColor: '#FFF',
  },
  schools2: {
    key: 'schools2',
    color: '#F9A300',
    selectedDotColor: '#FFF',
  },
  others1: {
    key: 'others1',
    color: '#2C08D5',
    selectedDotColor: '#FFF',
  },
  others2: {
    key: 'others2',
    color: '#2C08D5',
    selectedDotColor: '#FFF',
  },
  holiday1: {
    key: 'holiday1',
    color: '#DA0000',
  },
  holiday2: {
    key: 'holiday2',
    color: '#DA0000',
  },
};
// export const schools1 = {
//   key: 'schools1',
//   color: '#F9A300',
//   selectedDotColor: '#FFF',
// };
// export const schools2 = {
//   key: 'schools2',
//   color: '#F9A300',
//   selectedDotColor: '#FFF',
// };
// export const others1 = {
//   key: 'others1',
//   color: '#4298D2',
//   selectedDotColor: '#FFF',
// };
// export const others2 = {
//   key: 'others2',
//   color: '#4298D2',
//   selectedDotColor: '#FFF',
// };
// export const holiday1 = {key: 'holiday1', color: '#DA0000'};
// export const holiday2 = {key: 'holiday2', color: '#DA0000'};

// LOCALE CONSTANT
export const arabicMonths = {
  monthNames: [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: [
    'الأحد',
    'الاثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ],
  today: "Aujourd'hui",
};

// HANDLE DISABLED DAYS IN CALENDAR
export const handlePreviousDays = (previousDays, selectedDay) => {
  let newPreviousDays = previousDays;
  for (let i = parseInt(format(new Date(), 'dd')); i >= 1; i--) {
    let loopDate = format(subDays(new Date(), i), 'yyyy-MM-dd');
    newPreviousDays = {
      ...newPreviousDays,
      [loopDate]: {
        disabled: true,
        disableTouchEvent: true,
      },
    };
  }

  // selected: selectedDay == loopDate ? true : false,
  // marked: true,
  // selectedColor: '#7F05A3',

  // DISABLE CURRENT MONTH WEEKENDS
  eachWeekendOfMonth(new Date()).forEach(item => {
    newPreviousDays = {
      ...newPreviousDays,
      [format(subDays(new Date(item), 1), 'yyyy-MM-dd')]: {
        disabled: true,
        disableTouchEvent: true,
        dots: [dotColors.holiday1, dotColors.holiday2],
      },
    };
  });

  // IF THE LAST DAY OF THE MONTH IS WEEKEND DISABLE IT
  format(lastDayOfMonth(new Date()), 'eeee') === 'Friday' ||
  format(lastDayOfMonth(new Date()), 'eeee') === 'Saturday'
    ? (newPreviousDays = {
        ...newPreviousDays,
        [format(lastDayOfMonth(new Date()), 'yyyy-MM-dd')]: {
          disabled: true,
          disableTouchEvent: true,
          dots: [dotColors.holiday1, dotColors.holiday2],
        },
      })
    : null;

  // DISABLE SECOND MONTH WEEKENDS
  eachWeekendOfMonth(addMonths(new Date(), 1)).forEach(item => {
    newPreviousDays = {
      ...newPreviousDays,
      [format(subDays(new Date(item), 1), 'yyyy-MM-dd')]: {
        disabled: true,
        disableTouchEvent: true,
        dots: [dotColors.holiday1, dotColors.holiday2],
      },
    };
  });

  // IF THE LAST DAY OF THE MONTH IS WEEKEND DISABLE IT
  format(lastDayOfMonth(addMonths(new Date(), 1)), 'eeee') === 'Friday' ||
  format(lastDayOfMonth(addMonths(new Date(), 1)), 'eeee') === 'Saturday'
    ? (newPreviousDays = {
        ...newPreviousDays,
        [format(lastDayOfMonth(addMonths(new Date(), 1)), 'yyyy-MM-dd')]: {
          disabled: true,
          disableTouchEvent: true,
          dots: [dotColors.holiday1, dotColors.holiday2],
        },
      })
    : null;

  // DISABLE THIRD MONTH WEEKENDS
  eachWeekendOfMonth(addMonths(new Date(), 2)).forEach(item => {
    newPreviousDays = {
      ...newPreviousDays,
      [format(subDays(new Date(item), 1), 'yyyy-MM-dd')]: {
        disabled: true,
        disableTouchEvent: true,
        dots: [dotColors.holiday1, dotColors.holiday2],
      },
    };
  });

  // IF THE LAST DAY OF THE MONTH IS WEEKEND DISABLE IT
  format(lastDayOfMonth(addMonths(new Date(), 2)), 'eeee') === 'Friday' ||
  format(lastDayOfMonth(addMonths(new Date(), 2)), 'eeee') === 'Saturday'
    ? (newPreviousDays = {
        ...newPreviousDays,
        [format(lastDayOfMonth(addMonths(new Date(), 2)), 'yyyy-MM-dd')]: {
          disabled: true,
          disableTouchEvent: true,
          dots: [dotColors.holiday1, dotColors.holiday2],
        },
      })
    : null;

  // DISABLE FOURTH MONTH WEEKENDS
  eachWeekendOfMonth(addMonths(new Date(), 3)).forEach(item => {
    newPreviousDays = {
      ...newPreviousDays,
      [format(subDays(new Date(item), 1), 'yyyy-MM-dd')]: {
        disabled: true,
        disableTouchEvent: true,
        dots: [dotColors.holiday1, dotColors.holiday2],
      },
    };
  });

  // IF THE LAST DAY OF THE MONTH IS WEEKEND DISABLE IT
  format(lastDayOfMonth(addMonths(new Date(), 3)), 'eeee') === 'Friday' ||
  format(lastDayOfMonth(addMonths(new Date(), 3)), 'eeee') === 'Saturday'
    ? (newPreviousDays = {
        ...newPreviousDays,
        [format(lastDayOfMonth(addMonths(new Date(), 3)), 'yyyy-MM-dd')]: {
          disabled: true,
          disableTouchEvent: true,
          dots: [dotColors.holiday1, dotColors.holiday2],
        },
      })
    : null;

  return newPreviousDays;
};

// HANDLE DISABLED DAYS IN CALENDAR
export const handleWeekends = (previousDays, selectedDay) => {
  let newPreviousDays = previousDays;
  // selected: selectedDay == loopDate ? true : false,
  // marked: true,
  // selectedColor: '#7F05A3',

  // DISABLE CURRENT MONTH WEEKENDS
  eachWeekendOfMonth(new Date()).forEach(item => {
    newPreviousDays = {
      ...newPreviousDays,
      [format(subDays(new Date(item), 1), 'yyyy-MM-dd')]: {
        disabled: true,
        disableTouchEvent: true,
        dots: [dotColors.holiday1, dotColors.holiday2],
      },
    };
  });

  // IF THE LAST DAY OF THE MONTH IS WEEKEND DISABLE IT
  format(lastDayOfMonth(new Date()), 'eeee') === 'Friday' ||
  format(lastDayOfMonth(new Date()), 'eeee') === 'Saturday'
    ? (newPreviousDays = {
        ...newPreviousDays,
        [format(lastDayOfMonth(new Date()), 'yyyy-MM-dd')]: {
          disabled: true,
          disableTouchEvent: true,
          dots: [dotColors.holiday1, dotColors.holiday2],
        },
      })
    : null;

  // DISABLE SECOND MONTH WEEKENDS
  eachWeekendOfMonth(addMonths(new Date(), 1)).forEach(item => {
    newPreviousDays = {
      ...newPreviousDays,
      [format(subDays(new Date(item), 1), 'yyyy-MM-dd')]: {
        disabled: true,
        disableTouchEvent: true,
        dots: [dotColors.holiday1, dotColors.holiday2],
      },
    };
  });

  // IF THE LAST DAY OF THE MONTH IS WEEKEND DISABLE IT
  format(lastDayOfMonth(addMonths(new Date(), 1)), 'eeee') === 'Friday' ||
  format(lastDayOfMonth(addMonths(new Date(), 1)), 'eeee') === 'Saturday'
    ? (newPreviousDays = {
        ...newPreviousDays,
        [format(lastDayOfMonth(addMonths(new Date(), 1)), 'yyyy-MM-dd')]: {
          disabled: true,
          disableTouchEvent: true,
          dots: [dotColors.holiday1, dotColors.holiday2],
        },
      })
    : null;

  // DISABLE THIRD MONTH WEEKENDS
  eachWeekendOfMonth(addMonths(new Date(), 2)).forEach(item => {
    newPreviousDays = {
      ...newPreviousDays,
      [format(subDays(new Date(item), 1), 'yyyy-MM-dd')]: {
        disabled: true,
        disableTouchEvent: true,
        dots: [dotColors.holiday1, dotColors.holiday2],
      },
    };
  });

  // IF THE LAST DAY OF THE MONTH IS WEEKEND DISABLE IT
  format(lastDayOfMonth(addMonths(new Date(), 2)), 'eeee') === 'Friday' ||
  format(lastDayOfMonth(addMonths(new Date(), 2)), 'eeee') === 'Saturday'
    ? (newPreviousDays = {
        ...newPreviousDays,
        [format(lastDayOfMonth(addMonths(new Date(), 2)), 'yyyy-MM-dd')]: {
          disabled: true,
          disableTouchEvent: true,
          dots: [dotColors.holiday1, dotColors.holiday2],
        },
      })
    : null;

  // DISABLE FOURTH MONTH WEEKENDS
  eachWeekendOfMonth(addMonths(new Date(), 3)).forEach(item => {
    newPreviousDays = {
      ...newPreviousDays,
      [format(subDays(new Date(item), 1), 'yyyy-MM-dd')]: {
        disabled: true,
        disableTouchEvent: true,
        dots: [dotColors.holiday1, dotColors.holiday2],
      },
    };
  });

  // IF THE LAST DAY OF THE MONTH IS WEEKEND DISABLE IT
  format(lastDayOfMonth(addMonths(new Date(), 3)), 'eeee') === 'Friday' ||
  format(lastDayOfMonth(addMonths(new Date(), 3)), 'eeee') === 'Saturday'
    ? (newPreviousDays = {
        ...newPreviousDays,
        [format(lastDayOfMonth(addMonths(new Date(), 3)), 'yyyy-MM-dd')]: {
          disabled: true,
          disableTouchEvent: true,
          dots: [dotColors.holiday1, dotColors.holiday2],
        },
      })
    : null;

  return newPreviousDays;
};

