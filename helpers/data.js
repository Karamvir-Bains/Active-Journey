import { format } from 'date-fns';

/**
 * Dashboard Default Layout
 * 
 * Description: Used for new users who have 
 * not yet customized their dashboard
 * 
 */
export 
const defaultLayout = {
  lg: [
    { w: 8, h: 2, x: 0, y: 0, i: 'overview', moved: false, static: false },
    { w: 4, h: 2, x: 8, y: 0, i: 'calendar', moved: false, static: false },
    { w: 3, h: 2, x: 0, y: 2, i: 'dailyWater', moved: false, static: false },
    { w: 3, h: 2, x: 3, y: 2, i: 'activityGoal', moved: false, static: false },
    { w: 3, h: 2, x: 6, y: 2, i: 'stress', moved: false, static: false },
    { w: 3, h: 2, x: 9, y: 2, i: 'mood', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 4, i: 'sleep', moved: false, static: false },
    { w: 6, h: 2, x: 6, y: 4, i: 'social', moved: false, static: false },
    { w: 6, h: 2, x: 6, y: 6, i: 'alcohol', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 6, i: 'nutrition', moved: false, static: false }
  ],
  sm: [
    { w: 1, h: 2, x: 0, y: 2, i: 'overview', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 0, i: 'calendar', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 4, i: 'dailyWater', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 6, i: 'activityGoal', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 8, i: 'stress', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 10, i: 'mood', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 12, i: 'sleep', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 14, i: 'social', moved: false, static: false },
    { w: 1, h: 2, x: 0, y: 16, i: 'alcohol', moved: false, static: false },
    { w: 1, h: 3, x: 0, y: 18, i: 'nutrition', moved: false, static: false }
  ],
  xl: [
    { w: 8, h: 2, x: 0, y: 0, i: 'overview', moved: false, static: false },
    { w: 4, h: 2, x: 8, y: 0, i: 'calendar', moved: false, static: false },
    { w: 3, h: 2, x: 0, y: 2, i: 'dailyWater', moved: false, static: false },
    { w: 3, h: 2, x: 3, y: 2, i: 'activityGoal', moved: false, static: false },
    { w: 3, h: 2, x: 6, y: 2, i: 'stress', moved: false, static: false },
    { w: 3, h: 2, x: 9, y: 2, i: 'mood', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 4, i: 'sleep', moved: false, static: false },
    { w: 6, h: 2, x: 6, y: 4, i: 'social', moved: false, static: false },
    { w: 6, h: 2, x: 6, y: 6, i: 'alcohol', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 6, i: 'nutrition', moved: false, static: false }
  ],
  md: [
    { w: 6, h: 2, x: 0, y: 0, i: 'overview', moved: false, static: false },
    { w: 4, h: 2, x: 2, y: 2, i: 'calendar', moved: false, static: false },
    { w: 3, h: 2, x: 0, y: 4, i: 'dailyWater', moved: false, static: false },
    { w: 3, h: 2, x: 3, y: 4, i: 'activityGoal', moved: false, static: false },
    { w: 3, h: 2, x: 0, y: 6, i: 'stress', moved: false, static: false },
    { w: 3, h: 2, x: 3, y: 6, i: 'mood', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 8, i: 'sleep', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 10, i: 'social', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 12, i: 'alcohol', moved: false, static: false },
    { w: 6, h: 2, x: 0, y: 14, i: 'nutrition', moved: false, static: false }
  ]
}

/**
 * Colour Palette for Charts
 */

export const palette = {
  'light': {
    // Amber 500
    'energy': '#f59e0b',
    'sleep': '#14b8a6',
    'water': '#3b82f6',
    'mood': '#be123c',
    'nutrition': '#15803d',
    'social': '#86198f',
    'alcohol': '#fbbf24',
    'border': '#000',
    'label': '#333',
  },
  'dark': {
    'energy': '#f97316',
    'sleep': '#2dd4bf',
    'water': '#1e40af',
    'mood': '#ef4444',
    'nutrition': '#84cc16',
    'social': '#86198f',
    'alcohol': '#fbbf24',
    'border': '#fff',
    'label': '#ddd',
  }
}


/**
 * 
 * convertDateToISO()
 * @param {*} date 
 * @returns ISO date for Database use 
 */

export const convertDateToISO = (date) => {
  const newDate = new Date(date);
  return newDate.toISOString();
}

/**
 * 
 * formatDate()
 * @param {*} date 
 * @returns formatted date for user friendly dat string 
 */

export const formatDate = date => {
  return format(date, 'MMMM d, yyyy')
}

/**
 * Format Date for displaying
 * Show Today or Yesterday text instead of actual date
 */

export const getDateText = date => {
  if (date) {
    const dateValue = new Date(date);
    const today = new Date();

    let yesterday = new Date();
    yesterday = yesterday.setDate(today.getDate() - 1)

    if (formatDate(dateValue) === formatDate(today)) {
      return 'Today'
    } else if (formatDate(dateValue) == formatDate(yesterday) ) {
      return 'Yesterday'
    } else {
      return formatDate(dateValue)
    }
  } else {
    return date
  }
}