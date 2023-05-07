import { buildLabels, getMetricValues } from "./selectors";

/**
 * Build Datasets Object for combination charts
 * @laurenashley
 */
export const buildChartData = (metrics, selectedDate, range) => {
  const metricValues = {};
  const dates = buildLabels(selectedDate, range, 7);

  // Reformat metric values objects
  metrics.forEach((metric, index) => {
    metricValues[index] = {
      name: metric.name,
      values: getMetricValues(metric, range)
    }
  });

  // Package data for charts use
  let array = [];
  dates.forEach((date, index) => {
    const dateObj = { date };

    // Add all metrics and their value to the date (label) object
    Object.keys(metricValues).forEach(key => {
      dateObj[metricValues[key].name] = metricValues[key].values[index];
    });
    array.push(dateObj);
  });

  return array;
} 