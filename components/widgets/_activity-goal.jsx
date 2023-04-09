import { useEffect } from "react"
import { Chart } from "chart.js/auto";

export default function ActivityGoal() {
  useEffect(() => {
    var ctx = document.getElementById('activityChart').getContext('2d');
    const data = {
      datasets: [{
        label: 'My First Dataset',
        data: [20, 80],
        borderWidth: 2,
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
        <h3 className="font-bold mb-1 text-xl text-blue-900">Activity Goal</h3>
        <p className="text-center">Congrats you hit your goal!</p>
        <div className="px-12">
          <canvas id='activityChart'></canvas>
        </div>
      </div>
    </>
  )
};