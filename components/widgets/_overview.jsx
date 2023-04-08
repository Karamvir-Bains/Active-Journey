import { useEffect } from "react"
import { Chart } from "chart.js/auto";

export default function Overview() {
  useEffect(() => {
    var ctx = document.getElementById('myChart').getContext('2d');

    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
          data: [3, 9, 8, 9, 4, 4, 7],
          label: "Water Intake",
          borderColor: "#3e95cd",
          pointRadius: 0,
          backgroundColor: "#7bb6dd",
          fill: false,
        }, {
          data: [6, 8, 5, 8, 7, 6, 5],
          label: "Sleep",
          borderWidth: 0,
          pointRadius: 0,
          backgroundColor: "#71d1bd",
          fill: true,
        }, {
          data: [3, 9, 7, 10, 8, 5, 8],
          label: "Energy Level",
          borderWidth: 0,
          pointRadius: 0,
          backgroundColor: "#ffc04d",
          fill: true,
        }, {
          data: [2, 3, 3, 3, 2, 2, 3],
          label: "Mood",
          borderColor: "#c45850",
          pointRadius: 0,
          backgroundColor: "#d78f89",
          fill: false,
        }
        ]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
      }
    });

    return () => {
      myChart.destroy()
    }
  }, []);

  return (
    <>
      <div className="rounded-lg bg-white shadow-sm w-full h-full p-1 mb-10">
        <div className="absolute top-3 right-3 bottom-3 left-3">
          <canvas id='myChart'></canvas>
        </div>
      </div>
    </>
  )
}