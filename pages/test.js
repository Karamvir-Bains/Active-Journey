import { useEffect } from "react"
import { Chart } from "chart.js";
function Example() {
  useEffect(() => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
          data: [86, 114, 106, 106, 107, 111, 133],
          label: "Applied",
          borderColor: "#3e95cd",
          backgroundColor: "#7bb6dd",
          fill: false,
        }, {
          data: [70, 90, 44, 60, 83, 90, 100],
          label: "Accepted",
          borderColor: "#3cba9f",
          backgroundColor: "#71d1bd",
          fill: false,
        }, {
          data: [10, 21, 60, 44, 17, 21, 17],
          label: "Pending",
          borderColor: "#ffa500",
          backgroundColor: "#ffc04d",
          fill: false,
        }, {
          data: [6, 3, 2, 2, 7, 0, 16],
          label: "Rejected",
          borderColor: "#c45850",
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
  }, [])
  return (
    <>
      {/* line chart */}
      <div className="rounded-lg bg-white dark:bg-slate-900 dark:text-white  shadow-sm w-full h-full p-1 mb-10">
        <div className="bg-blue-100 text-center">
          <div className="absolute top-3 right-3 bottom-3 left-3">
            <canvas id='myChart'></canvas>
          </div>
        </div>
      </div>
    </>
  )
}

export default Example;