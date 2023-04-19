import { useCallback, useEffect, useState } from "react"
import { Chart } from "chart.js/auto";
import ButtonGroup from "../partials/ButtonGroup";
import { useData } from "../../store/DataContext";

export default function Overview(props) {
  const { data } = useData();

  // Date range navigation
  const rangeValues = [7, 15, 30];
  const [range, setRange] = useState(7);
  function changeRange(newRange) {
    setRange(newRange);
  }

  // Array for each metric sliced to range of days
  const createData = useCallback((water, sleep, energy, mood) => {
    let waterVals = water.user_metric_data.slice(-range);
    const labelVals = waterVals.map((val) =>  val.date.substring(5, 10));

    waterVals = waterVals.map(e => Math.floor((e.metric_value / 100) - 10));
    const sleepVals = sleep.user_metric_data
      .slice(-range)
      .map(e => e.metric_value);
    const energyVals = energy.user_metric_data
      .slice(-range)
      .map(e => e.metric_value);
    const moodVals = mood.user_metric_data
      .slice(-range)
      .map(e => (e.metric_value / 10));
    return [
      waterVals,
      sleepVals,
      energyVals,
      moodVals,
      labelVals
    ];
  }, [range]); 

  const createChart = useCallback((metricValueSets) => {
    const ctx = document.getElementById('overviewChart').getContext('2d');
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: metricValueSets[4],
        datasets: [{
          type: 'line',
          label: "Energy Level",
          data: metricValueSets[2],
          borderWidth: 0,
          pointRadius: 0,
          backgroundColor: "rgba(255,192,77, 0.5)",
          fill: true,
          tension: 0.3
        }, {
          type: 'line',
          label: "Activity",
          data: metricValueSets[3],
          borderColor: "#c45850",
          pointRadius: 0,
          backgroundColor: "transparent",
          fill: true,
          tension: 0.3
        }, {
          type: 'bar',
          label: "Water Intake",
          data: metricValueSets[0],
          borderColor: "#3e95cd",
          borderRadius: 4,
          backgroundColor: "#3e95cd"
        }, {
          type: 'bar',
          label: "Sleep",
          data: metricValueSets[1],
          borderRadius: 4,
          backgroundColor: "#71d1bd"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
          y: { display: false }
        },
        plugins: { legend: { align: 'end' } }
      }
    });
  }, []);

  useEffect(() => {
    if (data && data[0] && data[0].user_metric_data) {
      // console.log('data: ', data);
      const metricValueSets = createData(data[0], data[1], data[3], data[2]);

      const overviewChart = createChart(metricValueSets);

      return () => {
        overviewChart.destroy()
      }
    }
    
}, [range, data]);

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
          <canvas id='overviewChart'></canvas>
        </div>
      </div>
    </>
  )
}