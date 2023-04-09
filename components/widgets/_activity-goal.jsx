import { useEffect } from "react"
import { Chart } from "chart.js/auto";

export default function ActivityGoal() {
  useEffect(() => {
    var ctx = document.getElementById('activityChart').getContext('2d');
    const data = {
      datasets: [{
        label: 'My First Dataset',
        data: [50, 100],
        borderWidth: 0,
        backgroundColor: [
          'rgb(211, 211, 211)',
          'rgb(76, 187, 23)'
        ],
      }]
    };
    var activityChart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        legend: { display: false },
        plugins: { tooltip: { enabled: false } },
        hover: {mode: null},
      }
    });

    return () => {
      activityChart.destroy()
    }
  }, []);
  return(
    <>
      <div className="rounded-lg bg-white shadow-sm w-full h-full p-6 mb-10">
      <h3 className="font-bold mb-3 text-xl text-blue-900">Activity Goal</h3>
        <div className="p-6">
          <canvas id='activityChart'></canvas>
        </div>
      </div>
    </>
  )
};