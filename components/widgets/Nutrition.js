import { useState, useEffect } from "react"
import { Chart } from "chart.js/auto";
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
  const [nutrition, setNutrition] = useState(props.nutrition.map(item => item.metric_value));

  useEffect(() => {
    const ctx = document.getElementById('nutritionChart').getContext('2d');

    if (data && data[8]) {
      if (data[8].user_metric_data) {
        setNutrition(data[8].user_metric_data.map(item => item.metric_value));
      }
    }

    // const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    // gradient.addColorStop(0, 'rgba(152, 194, 250, 1)');
    // gradient.addColorStop(0.5 , 'rgba(178, 208, 247, 1)');
    // gradient.addColorStop(1, 'rgba(199, 223, 255, 1)');
    
    const chartData = {
      labels: buildLabels(selectedDate, 10),
      datasets: [
        {
          data: nutrition,
          // backgroundColor: colours.energy,
          // backgroundColor: gradient,
          backgroundColor: colours.nutrition,
          borderRadius: 10
        }
      ]
    };

    const nutritionChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: { 
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: false }
        },
      },
    });

    return () => {
      nutritionChart.destroy()
    }
  }, [data]);
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