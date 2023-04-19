import { useCallback, useEffect, useState } from "react"
import { Chart } from "chart.js/auto";
import ButtonGroup from "../partials/ButtonGroup";
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";

export default function Overview(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;
  const rangeValues = [7, 30, 90];
  const [range, setRange] = useState(7);
  function changeRange(newRange) {
    setRange(newRange);
  }

  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');

    const entryIds = props.entries.map(entry => entry.id).slice(0, range);
    const waterVals = props.water.map(entry => {
      // Translate quantity vals to match 1-10 scale visually on y-axis
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
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: entryIds,
        datasets: [{
          type: 'line',
          label: "Mood",
          data: moodVals,
          borderColor: "#c45850",
          pointRadius: 0,
          backgroundColor: "transparent",
          fill: true,
          tension: 0.3
        }, {
          type: 'bar',
          label: "Water Intake",
          data: waterVals,
          borderColor: "#3e95cd",
          borderRadius: 4,
          backgroundColor: "#3e95cd"
        }, {
          type: 'bar',
          label: "Sleep",
          data: sleepVals,
          borderRadius: 4,
          backgroundColor: "#71d1bd"
        }, {
          type: 'line',
          label: "Energy Level",
          data: energyVals,
          borderWidth: 0,
          pointRadius: 0,
          backgroundColor: "#ffc04d",
          fill: true,
          tension: 0.3
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
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-3 mb-10">
        <div className="inline-block relative z-10">
          <ButtonGroup
            ranges={rangeValues} 
            rangeState={range}
            onClick={changeRange}
          />
          <span className="text-xs">&nbsp;days</span>
        </div>
        <div className="absolute top-4 right-3 bottom-2 left-3 z-0">
          <canvas id='myChart'></canvas>
        </div>
      </div>
    </>
  )
}