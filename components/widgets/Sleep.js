import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";
import { useEffect, useCallback } from "react"
import { useData } from "../../store/DataContext";
import { Chart } from "chart.js/auto";

export default function Sleep(props) {
  //declare colours values
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;

  const { selectedDate = new Date() , data } = useData();
  
  const createData = () => {
    function getLastSevenMetricValues (data, selectedDate) {
      return data.filter((x) => Date(x.date) <= Date(selectedDate)).slice(-7)
    };
    if(data && data.length){
    const lastSevenValuesQuality = getLastSevenMetricValues(data[6].user_metric_data, selectedDate);
    const lastSevenValues = getLastSevenMetricValues(data[1].user_metric_data, selectedDate);

    const labels = lastSevenValues.map(item => item.date);
    const labelsFormatted = [];
    for(let label of labels) {
      const date = new Date(label);
      const optionsTimezone = { month: '2-digit', day: '2-digit', timeZone: 'etc/UTC' };
      const newDate = date.toLocaleDateString('en-US',optionsTimezone);
      labelsFormatted.push(newDate);
    };

    const sleepValues = lastSevenValues.map(item => item.metric_value);

    const qualityValues = lastSevenValuesQuality.map(item => item.metric_value);

      return [
        labelsFormatted, 
        sleepValues, 
        qualityValues
      ] 
    } else {
      return {
        labels: [],
        sleepValues: [],
        qualityValues: []
      }
    }};

    const createChart = useCallback((metricValueSets) => {
      const ctx = document.getElementById("sleep").getContext('2d');
      var gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(152, 194, 250, 1)');
      gradient.addColorStop(0.5 , 'rgba(178, 208, 247, 1)');
      gradient.addColorStop(1, 'rgba(199, 223, 255, 1)');
      const chartLabels = ["Sleep Duration", "Sleep Quality"];
      return new Chart(ctx, {
        type: 'line',
        data: {
          labels: metricValueSets[0],
          datasets: [{
            type: 'line',
            label: chartLabels[0],
            data: metricValueSets[1],
            borderColor: colours.alcohol,
            pointRadius: 0,
            fill: true,
            borderDash: [5, 5],
          }, 
          {
            type: "line",
            label: chartLabels[1],
            data: metricValueSets[2],
            backgroundColor: colours.sleep,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { display: true, min: 0} },
          legend: true,
        }
      });
    }, []);

  useEffect(() => {

    if (data && data[0] && data[0].user_metric_data) {

      const metricValueSets = createData(data[1], data[6]);

      const sleepChart = createChart(metricValueSets);

      if (darkMode == 'light') {
        sleepChart.data.datasets[0].borderColor = palette.light.alcohol;
        sleepChart.data.datasets[1].backgroundColor = palette.light.sleep;
        sleepChart.options.scales.x.ticks.color = palette.light.label;
        sleepChart.options.scales.y.ticks.color = palette.light.label;
        sleepChart.options.plugins.legend.labels.color = palette.light.label;
        sleepChart.update();  
      } else if (darkMode == 'dark') {
        sleepChart.data.datasets[0].borderColor = palette.dark.label;
        sleepChart.data.datasets[1].backgroundColor = palette.dark.sleep;
        sleepChart.options.scales.x.ticks.color = palette.dark.label;
        sleepChart.options.scales.y.ticks.color = palette.dark.label;
        sleepChart.options.plugins.legend.labels.color = palette.dark.label;
        sleepChart.update();  
      }

      return () => {
        sleepChart.destroy()
      }
    }

  }, [selectedDate, data, darkMode]);

  return(
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-6 mb-10 text-center">
        <h3 className="font-bold mb-1 text-xl text-blue-900 dark:text-white">Sleep vs Quality</h3>
        <div className="text-center w-full h-full py-4">
          <canvas id='sleep'></canvas>
        </div>
      </div>
    </>
  )
};