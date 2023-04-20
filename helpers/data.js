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
    { i: "overview", x: 0, y: 0, w: 8, h: 2, static: false},
    { i: "calendar", x: 9, y: 0, w: 4, h: 2, static: false},
    { i: "dailyWater", x: 0, y: 0, w: 3, h: 2, static: false},
    { i: "activityGoal", x: 3, y: 7, w: 3, h: 2, static: false},
    { i: "stress", x: 6, y: 7, w: 3, h: 2, static: false},
    { i: "mood", x: 9, y: 7, w: 3, h: 2, static: false},
    { i: "sleep", x: 0, y: 9, w: 6, h: 2, static: false},
    { i: "social", x: 3, y: 9, w: 6, h: 2, static: false},
    { i: "alcohol", x: 6, y: 9, w: 6, h: 2, static: false},
    { i: "nutrition", x: 0, y: 11, w: 6, h: 3, static: false}
  ],
  sm: [
    { i: "calendar", x: 0, y: 0, w: 6, h: 2, static: false},
    { i: "overview", x: 3, y: 0, w: 6, h: 2, static: false},
    { i: "dailyWater", x: 0, y: 0, w: 3, h: 2, static: false},
    { i: "activityGoal", x: 4, y: 0, w: 3, h: 2, static: false},
    { i: "stress", x: 0, y: 0, w: 3, h: 2, static: false},
    { i: "mood", x: 3, y: 0, w: 3, h: 2, static: false},
    { i: "sleep", x: 0, y: 0, w: 6, h: 2, static: false},
    { i: "social", x: 3, y: 0, w: 6, h: 2, static: false},
    { i: "alcohol", x: 0, y: 0, w: 6, h: 2, static: false},
    { i: "nutrition", x: 0, y: 0, w: 12, h: 3, static: false}
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
    'social': '#0f766e',
    'alcohol': '#fbbf24',
    'border': '#000',
    'label': '#555',
  },
  'dark': {
    'energy': '#f97316',
    'sleep': '#2dd4bf',
    'water': '#1e40af',
    'mood': '#ef4444',
    'social': '#5eead4',
    'alcohol': '#fbbf24',
    'border': '#fff',
    'label': '#555',
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