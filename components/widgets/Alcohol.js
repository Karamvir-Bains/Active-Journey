import { useEffect } from "react"
import { Chart } from "chart.js/auto";

export default function Alcohol(props) {
  useEffect(() => {
    const ctx = document.getElementById("alcohol").getContext('2d');
    const labels = ["04/08", "04/09", "04/10", "04/11", "04/12", "04/13", "04/14"];

    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(152, 194, 250, 1)');
    gradient.addColorStop(0.5 , 'rgba(178, 208, 247, 1)');
    gradient.addColorStop(1, 'rgba(199, 223, 255, 1)')

    const data = {
      labels: labels,
      datasets: [
        {
          data: [1, 0, 0, 2, 7, 4, 0],
          backgroundColor: gradient,
          fill: true,
          borderColor: 'rgb(75, 192, 192)',
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
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-6 mb-10 text-center">
        <h3 className="font-bold mb-1 text-xl text-blue-900 dark:text-blue-500">Alcohol</h3>
        <div className="p-4">
          <canvas id='alcohol'></canvas>
        </div>
      </div>
    </>
  )
};