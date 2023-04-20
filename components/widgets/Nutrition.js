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
  const [nutrition, setNutrition] = useState(props.nutrition.map(item => item.metric_value).reverse());

  useEffect(() => {
    const ctx = document.getElementById('nutritionChart').getContext('2d');
    const chartData = {
      labels: buildLabels(selectedDate, 10),
      datasets: [
        {
          data: [...nutrition],
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
          ticks: { color: 'green', beginAtZero: true }
        },
        x: {
          ticks: { color: 'red', beginAtZero: true }
        }
      }
    }

    const nutritionChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options
    });

    if (data && data[8]) {
      if (data[8].user_metric_data) {
        const newData = data[8].user_metric_data.map(item => item.metric_value).slice(-10);
        nutritionChart.data.datasets[0].data = [...newData];
        nutritionChart.update();
        setNutrition(data[8].user_metric_data.map(item => item.metric_value));
      }
    }

    /** Change chart colours on darkMode change */
    if (darkMode == 'light') {
      nutritionChart.data.datasets[0].backgroundColor = palette.light.sleep;
      nutritionChart.options.scales.x.ticks.color = palette.light.label;
      nutritionChart.options.scales.y.ticks.color = palette.light.label;
      nutritionChart.update();  
    } else if (darkMode == 'dark') {
      nutritionChart.data.datasets[0].backgroundColor = palette.dark.energy;
      nutritionChart.options.scales.x.ticks.color = palette.dark.label;
      nutritionChart.options.scales.y.ticks.color = palette.dark.label;
      nutritionChart.update();  
    }

    return () => {
      nutritionChart.destroy()
    }
  }, [data, darkMode]);
  return(
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white shadow-sm w-full h-full p-6 mb-10 text-center">
        <h3 className="font-bold mb-2 text-xl text-blue-900 dark:text-white">Quality of Nutrition</h3>
        <div className="text-center w-full h-full py-6">
          <canvas id='nutritionChart'></canvas>
        </div>
      </div>
    </>
  )
};