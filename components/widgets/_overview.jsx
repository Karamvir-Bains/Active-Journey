import { useEffect } from "react"
import { Chart } from "chart.js/auto";
import ButtonGroup from "../partials/_button-group";

export default function Overview(props) {
  useEffect(() => {
    var ctx = document.getElementById('myChart').getContext('2d');

    // create datasets array of obj's from entries
    const entryIds = props.entries.map(entry => entry.id).slice(0,14);
    const waterVals = props.water.map(entry => {
      // Translate vals to match 1-10 scale visually on y-axis
      // TO DO: look into logarithmic axes for this
      return (entry.metric_value / 100) - 15
    }).slice(0,14);
    const moodVals = props.mood.map(entry => entry.metric_value).slice(0,14);

    const sleepVals = props.sleep.map(entry => entry.metric_value).slice(0,14);

    const energyVals = props.energy.map(entry => entry.metric_value).slice(0,14);

    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: entryIds,
        datasets: [{
          type: 'line',
          label: "Mood",
          data: moodVals,
          borderColor: "#c45850",
          pointRadius: 0,
          // backgroundColor: "transparent",
          fill: true,
        }, {
          type: 'bar',
          label: "Water Intake",
          data: waterVals,
          borderColor: "#3e95cd",
          // pointRadius: 0,
          backgroundColor: "#3e95cd",
          // fill: false,
        }, {
          type: 'bar',
          label: "Sleep",
          data: sleepVals,
          // borderWidth: 0,
          // pointRadius: 0,
          backgroundColor: "#71d1bd",
          // fill: true,
        }, {
          type: 'line',
          label: "Energy Level",
          data: energyVals,
          borderWidth: 0,
          pointRadius: 0,
          backgroundColor: "#ffc04d",
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { display: false } }
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
          <ButtonGroup ranges={[7, 30, 90]}/>
          <canvas id='myChart'></canvas>
        </div>
      </div>
    </>
  )
}