import { useCallback, useEffect, useState } from "react"
import { Chart } from "chart.js/auto";
import ButtonGroup from "../partials/ButtonGroup";
import { useData } from "../../store/DataContext";

export default function Overview(props) {
  const { data } = useData();

  // Date range navigation
  const rangeValues = [7, 30, 90];
  const [range, setRange] = useState(7);
  function changeRange(newRange) {
    setRange(newRange);
  }

  // Array for each metric sliced to range of days
  // takes metric data in order of chart datasets
  const createData = useCallback((water, sleep, energy, mood) => {
    const values = water.user_metric_data.slice(0, range);
    const waterVals = values.map(e => Math.floor((e.metric_value / 100) - 10));
      console.log('water: ', waterVals);
    const sleepVals = sleep.user_metric_data
      .slice(0, range)
      .map(e => e.metric_value);
    const energyVals = energy.user_metric_data
      .slice(0, range)
      .map(e => e.metric_value);
    const moodVals = mood.user_metric_data
      .slice(0, range)
      .map(e => e.metric_value);
    return [
      waterVals,
      sleepVals,
      energyVals,
      moodVals
    ];
  }, [range]); 

  const createChart = useCallback((metricValueSets) => {
    const ctx = document.getElementById('overviewChart').getContext('2d');
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: metricValueSets[0],
        datasets: [{
          type: 'line',
          label: "Mood",
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
        }, {
          type: 'line',
          label: "Energy Level",
          data: metricValueSets[2],
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
        scales: { 
          y: { display: false },
          // x: {
          //   ticks: {
          //     callback: function (chart) {
          //       // chart.ticks = [];
          //       // chart.ticks.push({ value: 0, label: "0 kWh" });
          //       console.log('Ticks fn running', chart);
          //       // return chart.ticks.filter((t, index) => {
          //       //   // always show the first and the last tick
          //       //   if (index === 0 || index === chart.ticks.length - 1) {
          //       //     return t;
          //       //   }
          //       // });
          //     }
          //   }
          // }
        },
        plugins: { legend: { align: 'end' } }
      }
    });
  }, []);

  useEffect(() => {
    if (data && data[0] && data[0].user_metric_data) {
      const metricValueSets = createData(data[0], data[1], data[3], data[4]);

      const overviewChart = createChart(metricValueSets);

      return () => {
        overviewChart.destroy()
      }
    }
    
}, [range, data, createData, createChart]);

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