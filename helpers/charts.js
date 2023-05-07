import { buildLabels, getMetricValues } from "./selectors";

/**
 * Build Datasets Object for combination charts
 * @laurenashley
 */
export const buildChartData = (metrics, selectedDate, range) => {
  const metricValsObj = {};
  const dates = buildLabels(selectedDate, range, 7);

  // Build metric object with name and array of metric values
  metrics.forEach((metric, index) => {
    metricValsObj[index] = {
      name: metric.name.split(' ')[0].toLowerCase(),
      values: getMetricValues(metric, range)
    }
  });

  let array = [];
  dates.forEach((label, index) => {
    const obj = { date: label };

    // Add all metrics and their value to the date (label)
    Object.keys(metricValsObj).forEach(key => {
      obj[metricValsObj[key].name] = metricValsObj[key].values[index];
    });
    array.push(obj);
  });

  return array;
} 