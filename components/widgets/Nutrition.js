import { useState, useEffect } from "react"
import { Chart, Colors } from "chart.js/auto";
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";
import { useData } from "../../store/DataContext";
import { buildLabels } from "../../helpers/selectors";

export default function Nutrition(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;
  const { 
    selectedDate,
    data } = useData();

  useEffect(() => {
    if (data && data.length && data[8]) {
      const newData = data[8].user_metric_data.map(item => item.metric_value).slice(-10);
    
      const ctx = document.getElementById('nutritionChart').getContext('2d');
    
      const chartData = {
        labels: buildLabels(selectedDate, 10),
        datasets: [
          {
            data: [...newData],
            backgroundColor: colours.nutrition,
            borderRadius: 10
          }
        ]
      };

      const options = { 
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: false }
        },
        scales: {
          y: {
            ticks: { color: colours.label, beginAtZero: true },
            min: 0
          },
          x: {
            ticks: { color: colours.label, beginAtZero: true }
          }
        }
      }

      const nutritionChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options
      });

      nutritionChart.data.datasets[0].data = [...newData];
      nutritionChart.update();

      /** Change chart colours on darkMode change */
      if (darkMode == 'light') {
        nutritionChart.data.datasets[0].backgroundColor = palette.light.nutrition;
        nutritionChart.options.scales.x.ticks.color = palette.light.label;
        nutritionChart.options.scales.y.ticks.color = palette.light.label;
        nutritionChart.update();  
      } else if (darkMode == 'dark') {
        nutritionChart.data.datasets[0].backgroundColor = palette.dark.nutrition;
        nutritionChart.options.scales.x.ticks.color = palette.dark.label;
        nutritionChart.options.scales.y.ticks.color = palette.dark.label;
        nutritionChart.update();  
      }

      return () => {
        nutritionChart.destroy()
      }
    }
  }, [data, darkMode]);
  return(
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-4 md:p-6 text-center">
      <h3 className="font-bold mb-1 text-lg md:text-xl text-blue-900 dark:text-white">Quality of Nutrition</h3>
        <div className="text-center w-full h-full pb-8 md:pb-8">
          <canvas id='nutritionChart'></canvas>
        </div>
      </div>
    </>
  )
};