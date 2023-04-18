import { useEffect } from "react"
import { Chart } from "chart.js/auto";

export default function Social(props) {
  useEffect(() => {

    const ctx = document.getElementById("social").getContext('2d');
    const labels = ["04/08", "04/09", "04/10", "04/11", "04/12", "04/13", "04/14"];
    const socialVal = ["4", "5", "6", "9", "8", "6", "6"];

    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(152, 194, 250, 1)');
    gradient.addColorStop(0.5 , 'rgba(178, 208, 247, 1)');
    gradient.addColorStop(1, 'rgba(199, 223, 255, 1)');

    const data = {
      labels,
      datasets: [{
        data: socialVal,
        backgroundColor: gradient,
        fill: true,
        tension: 0.378
      }]
    };

    var options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: false }
      }
    };

    var socialChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });

    return () => {
      socialChart.destroy()
    }
  }, []);
  return(
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-6 mb-10 text-center">
        <h3 className="font-bold mb-1 text-xl text-blue-900 dark:text-white">Quality of Social Interactions</h3>
        <div className="p-4">
          <canvas id='social'></canvas>
        </div>
      </div>
    </>
  )
};