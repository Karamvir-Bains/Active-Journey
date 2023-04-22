import { useCallback, useEffect, useState } from "react"
import { Chart } from "chart.js/auto";
import ButtonGroup from "../partials/ButtonGroup";
import { useData } from "../../store/DataContext";
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";

export default function Overview(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;
  const { data } = useData();

  // Date range navigation
  const rangeValues = [7, 15, 30];
  const [range, setRange] = useState(7);
  function changeRange(newRange) {
    setRange(newRange);
  }

  // Array for each metric sliced to range of days
  const createData = useCallback((water, sleep, energy, activity) => {
    let waterVals = water.user_metric_data.slice(-range);
    const labelVals = waterVals.map((val) =>  val.date.substring(5, 10));

    waterVals = waterVals.map(e => e.metric_value);

    const sleepVals = sleep.user_metric_data
      .slice(-range)
      .map(e => e.metric_value);
    const energyVals = energy.user_metric_data
      .slice(-range)
      .map(e => e.metric_value);
    const activityVals = activity.user_metric_data
      .slice(-range)
      .map(e => (e.metric_value / 60) * 10);

    return [
      waterVals,
      sleepVals,
      energyVals,
      activityVals,
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
          borderColor: colours.energy,
          backgroundColor: "transparent",
          tension: 0.3,
          yAxisID: 'energy-y-axis'
        }, {
          type: 'bar',
          label: "Activity",
          data: metricValueSets[3],
          borderRadius: 4,
          backgroundColor: colours.activity,
          yAxisID: 'activity-y-axis'
        }, {
          type: 'bar',
          label: "Water Intake",
          data: metricValueSets[0],
          borderRadius: 4,
          backgroundColor: colours.water,
          yAxisID: 'water-y-axis'
        }, {
          type: 'bar',
          label: "Sleep",
          data: metricValueSets[1],
          borderRadius: 4,
          backgroundColor: colours.sleep,
          yAxisID: 'sleep-y-axis'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
          "energy-y-axis": {
            position: 'left',
            display: false,
            max: 11,
          },
          "activity-y-axis": {
            position: 'left',
            display: false,
          },
          "water-y-axis": {
            position: 'left',
            display: false,
          },
          "sleep-y-axis": {
            position: 'left',
            display: false,
          },
        },
        plugins: { legend: { align: 'end', labels:{ color: colours.label } } }}
    });
  }, []);

  useEffect(() => {

    if (data && data[0] && data[0].user_metric_data) {
      const metricValueSets = createData(data[0], data[1], data[3], data[2]);

      const overviewChart = createChart(metricValueSets);

      if (darkMode == 'light') {
        overviewChart.data.datasets[1].borderColor = palette.light.activity;
        overviewChart.data.datasets[2].borderColor = palette.light.water;
        overviewChart.data.datasets[2].backgroundColor = palette.dark.water;
        overviewChart.options.scales.x.ticks.color = palette.light.label;
        overviewChart.options.plugins.legend.labels.color = palette.light.label;
        overviewChart.update();  
      } else if (darkMode == 'dark') {
        overviewChart.data.datasets[1].borderColor = palette.dark.activity;
        overviewChart.data.datasets[2].borderColor = palette.dark.water;
        overviewChart.data.datasets[2].backgroundColor = palette.dark.water;
        overviewChart.options.scales.x.ticks.color = palette.dark.label;
        overviewChart.options.plugins.legend.labels.color = palette.dark.label;
        overviewChart.update();  
      }

      return () => {
        overviewChart.destroy()
      }
    }
    
}, [range, data ,darkMode]);

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
        <div className="absolute top-10 xl:top-4 right-3 bottom-2 left-3 z-1">
          <canvas id='overviewChart'></canvas>
        </div>
      </div>
    </>
  )
}