import { useEffect, useState } from "react"
import { Chart, Colors } from "chart.js/auto";
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";
import { buildLabels } from "../../helpers/selectors";
import { useData } from "../../store/DataContext";

export default function Alcohol(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;
  const { 
    selectedDate,
    data } = useData();

  useEffect(() => {    
    if (data && data.length && data[9]) {
      const newData = data[9].user_metric_data.map(item => item.metric_value).slice(-7);

      const ctx = document.getElementById("alcohol").getContext('2d');

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: false }
        },
        scales: {
          y: {
            min: 0
          }
        }
      }
      

      const chartData = {
        labels: buildLabels(selectedDate, 7),
        datasets: [{
          data: [...newData],
          backgroundColor: colours.alcohol,
          fill: true,
          borderColor: colours.alcohol,
          tension: 0.1,
        }]
      }

      const alcoholChart = new Chart(ctx, {
        type: 'line',
        options: options,
        data: chartData
      });

      alcoholChart.data.datasets[0].data = [...newData];
      alcoholChart.update();

      if (darkMode == 'light') {
        alcoholChart.data.datasets[0].backgroundColor = palette.light.alcohol;
        alcoholChart.options.scales.x.ticks.color = palette.light.label;
        alcoholChart.options.scales.y.ticks.color = palette.light.label;
        alcoholChart.update();  
      } else if (darkMode == 'dark') {
        alcoholChart.data.datasets[0].backgroundColor = palette.dark.alcohol;
        alcoholChart.options.scales.x.ticks.color = palette.dark.label;
        alcoholChart.options.scales.y.ticks.color = palette.dark.label;
        alcoholChart.update();  
      }

      return () => {
        alcoholChart.destroy()
      }
    }
  }, [data, darkMode]);


  return (
    <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-4 md:p-6 text-center">
      <h3 className="font-bold mb-1 text-lg md:text-xl text-blue-900 dark:text-white">Alcohol</h3>
      <div className="text-center w-full h-full py-6">
        <canvas id='alcohol'></canvas>
      </div>
    </div>
  )
};