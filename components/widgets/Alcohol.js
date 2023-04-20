import { useEffect, useState } from "react"
import { Chart, Colors } from "chart.js/auto";
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";
import { buildLabels } from "../../helpers/selectors";
import { useData } from "../../store/DataContext";

export default function Alcohol(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;
  const [alcohol, setAlcohol] = useState(props.alcohol);

  const { 
    selectedDate,
    data } = useData();

  useEffect(() => {
    const ctx = document.getElementById("alcohol").getContext('2d');

    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(152, 194, 250, 1)');
    gradient.addColorStop(0.5 , 'rgba(178, 208, 247, 1)');
    gradient.addColorStop(1, 'rgba(199, 223, 255, 1)')

    const data = {
      labels: buildLabels(selectedDate, 7),
      datasets: [
        {
          data: [1, 0, 0, 2, 7, 4, 0],
          backgroundColor: colours.alcohol,
          fill: true,
          borderColor: colours.alcohol,
          tension: 0.1
        }
      ]
    };
    var alcoholChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: false }
        }
      }
    });

    return () => {
      alcoholChart.destroy()
    }
  }, []);
  return(
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white shadow-sm w-full h-full p-3 text-center">
        <h3 className="font-bold text-xl text-blue-900 dark:text-white">Alcohol</h3>
        <div className="text-center w-full h-full py-6">
          <canvas id='alcohol'></canvas>
        </div>
      </div>
    </>
  )
};