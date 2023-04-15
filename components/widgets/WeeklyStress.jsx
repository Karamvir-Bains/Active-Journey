import { useEffect } from "react"
import { Chart } from "chart.js/auto";

export default function WeeklyStress() {
  useEffect(() => {
    var ctx = document.getElementById('activityChart').getContext('2d');
    const data = {
      datasets: [{
        label: 'Average Stress for Past Week',
        data: [20, 80],
        borderWidth: 2,
        cutout: '75%',
        circumference: 180,
        rotation:270,
        backgroundColor: [
          'rgb(211, 211, 211)',
          'rgb(76, 187, 23)'
        ],
      }]
    };
    var activityChart = new Chart(ctx, {
      type: 'doughnut',
      data,
      options: {
        aspectRatio: 0,
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
        <h3 className="font-bold mb-1 text-xl text-blue-900">Weekly Stress</h3>
        <div className="px-6">
          <canvas id='activityChart'></canvas>
        </div>
      </div>
    </>
  )
};