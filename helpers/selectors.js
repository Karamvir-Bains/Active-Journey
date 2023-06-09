import { defaultLayout } from './data';
import { format, subDays } from 'date-fns';

export async function updateLayout(id, layout) {
  let newLayout = layout;
  if (layout === '' || layout === null) {
    newLayout = defaultLayout;
  }

  try {
    const userid = Number(id);
    await fetch(`/api/users/${userid}/updateLayout`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLayout),
    });
  }
  catch (err) {
    console.log(err);
  }
}

export const parseLayout = (layout) => {
  if (layout !== null) {
    return  JSON.parse(layout);
  } else {
    return defaultLayout;
  }
}

/**
 * 
 * createMetricsObject
 * Reformat User metrics data into an object
 * where all metrics are grouped by day
 * 
 * @param {*} id - User id 
 * @param {*} days Array of days (30)
 * @param {*} entries list of entries query with metrics User_metric_data
 * @returns Object with nested metrics for each day
 */

export const createMetricsObject = (id, days,entries) => {
  const newObj = {};

  for (let day of Object.keys(days)) {
    const getDate = days[day]['date'];
    const formatDate = format(getDate, "MMMMdyyyy");
    newObj[formatDate] = {
      "date": getDate,
      "user_id": days[day]['user_id'],
      "entries": [],
    }

    for (let item of entries) {
      if (String(getDate) == String(item['date'])) {
        const tempObj = {
          "id": item['id'],
          "metric_id": item['metrics']['id'],
          "metric": item['metrics']['name'],
          "metric_value": item['metric_value'],
          "metric_unit": item['metrics']['unit'],
        }
        newObj[formatDate]['entries'].push(tempObj);
      }
    }
  }
  return newObj;
}

/**
 * Build Data Labels basedon selected date
 * 
 * @kgislason
 */

export const buildLabels = (date, days) => {
  let array = [];
  for (let i = days - 1; i > 0; i--) {
    array.push(format(subDays(date, i), 'MMM d'))
  }

  array.push(format(date, 'MMM d'));
  return array;
}