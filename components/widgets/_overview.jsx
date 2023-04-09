import { useEffect } from "react"
import { Chart } from "chart.js/auto";

export default function Overview(props) {
  useEffect(() => {
    var ctx = document.getElementById('myChart').getContext('2d');

    // create datasets array of obj's from entries
    const waterVals = props.water.map(entry => {
      return (entry.metric_value / 100) - 15
    }).slice(0,7);

    const sleepVals = props.sleep.map(entry => entry.metric_value).slice(0,7);

    const energyVals = props.energy.map(entry => entry.metric_value).slice(0,7);

    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
          data: waterVals,
          label: "Water Intake",
          borderColor: "#3e95cd",
          pointRadius: 0,
          backgroundColor: "transparent",
          fill: false,
        }, {
          data: [2, 3, 3, 3, 2, 2, 3],
          label: "Mood",
          borderColor: "#c45850",
          pointRadius: 0,
          backgroundColor: "transparent",
          fill: false,
        }, {
          data: energyVals,
          label: "Energy Level",
          borderWidth: 0,
          pointRadius: 0,
          backgroundColor: "#ffc04d",
          fill: true,
        }, {
          data: sleepVals,
          label: "Sleep",
          borderWidth: 0,
          pointRadius: 0,
          backgroundColor: "#71d1bd",
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            id: 'A',
            type: 'linear',
            position: 'right',
          }, {
            id: 'B',
            type: 'linear',
            position: 'right',
          }]
        }
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