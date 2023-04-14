import { useCallback, useEffect, useState } from "react"
import { Chart } from "chart.js/auto";
import ButtonGroup from "../partials/_button-group";

export default function Overview(props) {
  const [range, setRange] = useState(7);
  function changeRange(newRange) {
    setRange(newRange);
  }
  // TO DO use useCallback to do this the React way
  // const createData = useCallback(() => {
  //   const entryIds = props.entries.map(entry => entry.id).slice(0, range);
  //   const waterVals = props.water.map(entry => {
  //     // Translate vals to match 1-10 scale visually on y-axis
  //     // TO DO: look into logarithmic axes for this
  //     return (entry.metric_value / 100) - 15
  //   }).slice(0, range);
  //   const moodVals = props.mood.map(entry => entry.metric_value).slice(0, range);
  //   const sleepVals = props.sleep.map(entry => entry.metric_value).slice(0, range);
  //   const energyVals = props.energy.map(entry => entry.metric_value).slice(0, range);

  //   return {
  //     entryIds,
  //     waterVals,
  //     moodVals,
  //     sleepVals,
  //     energyVals 
  //   };
  // }, [props.energy, props.entries, props.mood, props.sleep, props.water, range]);

  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');

    const entryIds = props.entries.map(entry => entry.id).slice(0, range);
    const waterVals = props.water.map(entry => {
      // Translate vals to match 1-10 scale visually on y-axis
      // TO DO: look into logarithmic axes for this
      return (entry.metric_value / 100) - 15
    }).slice(0, range);
    const moodVals = props.mood.map(entry => entry.metric_value).slice(0, range);
    const sleepVals = props.sleep.map(entry => entry.metric_value).slice(0, range);
    const energyVals = props.energy.map(entry => entry.metric_value).slice(0, range);

    // const {    
    //   entryIds,
    //   waterVals,
    //   moodVals,
    //   sleepVals,
    //   energyVals } = createData();

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
        scales: { y: { display: false } },
        plugins: { legend: { align: 'end' } }
      }
    });

    return () => {
      myChart.destroy()
    }
  // }, [range, createData]);
}, [range, props.entries, props.water, props.mood, props.sleep, props.energy]);

  return (
    <>
      <div className="rounded-lg bg-white shadow-sm w-full h-full p-3 mb-10">
        <div className="relative z-10">
          <ButtonGroup
            ranges={[7, 30, 90]} 
            onClick={changeRange}
            className="relative z-10"
          />
        </div>
        <div className="absolute top-4 right-3 bottom-2 left-3 z-0">
          <canvas id='myChart'></canvas>
        </div>
      </div>
    </>
  )
}