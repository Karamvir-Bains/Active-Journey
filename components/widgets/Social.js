import { useState, useEffect } from "react"
import { Chart } from "chart.js/auto";
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";
import { buildLabels } from "../../helpers/selectors";
import { useData } from "../../store/DataContext";
import ZoomButton from "../partials/ZoomButton";
import RangeButtonGroup from "../partials/RangeButtonGroup"

export default function Social(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;  
  const { 
    selectedDate,
    data 
  } = useData();

  // Date range navigation
  const rangeValues = [7, 15, 30];
  const [range, setRange] = useState(7);
  const labelsThreshold = props.zoom ? rangeValues[1] : rangeValues[0];

  useEffect(() => {
    if (data && data.length && data[7]) {
      const newData = data[7].user_metric_data.slice(-range).map(item => item.metric_value);

      const ctx = document.getElementById("social").getContext('2d');

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: props.zoom ? true : false },
          title: { display: props.zoom ? true : false }
        },
        scales: {
          y: {
            ticks: { color: colours.label, beginAtZero: true },
            min: 0
          },
          x: {
            ticks: { color: colours.label, beginAtZero: true }
          }
        }
      };

      const chartData = {
        labels: buildLabels(selectedDate, range, labelsThreshold),
        datasets: [{
          data: [...newData],
          backgroundColor: colours.social,
          fill: true,
          tension: 0.378
        }]
      }

      const socialChart = new Chart(ctx, {
        type: 'line',
        options: options,
        data: chartData
      });

      /** Update chart data anytime we change the selectedDate */
      socialChart.data.datasets[0].data = [...newData];
      socialChart.update();

      /** Change chart colours on darkMode change */
      if (darkMode == 'light') {
        socialChart.data.datasets[0].backgroundColor = palette.light.social;
        socialChart.options.scales.x.ticks.color = palette.light.label;
        socialChart.options.scales.y.ticks.color = palette.light.label;
        socialChart.update();  
      } else if (darkMode == 'dark') {
        socialChart.data.datasets[0].backgroundColor = palette.dark.social;
        socialChart.options.scales.x.ticks.color = palette.dark.label;
        socialChart.options.scales.y.ticks.color = palette.dark.label;
        socialChart.update();  
      }

      return () => {
        socialChart.destroy()
      }
    }
  }, [data, darkMode, range]);

  return(
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-4 md:p-6 relative">
        <h3 className="font-bold mb-1 text-lg md:text-xl text-blue-900 dark:text-white text-center">Quality of Social Interactions</h3>
        <ZoomButton
          zoom={props.zoom}
          onChange={props.onChange}
        />        
        {props.zoom &&
          <div className="inline-block absolute top-6 z-10">
            <RangeButtonGroup
              ranges={rangeValues} 
              rangeState={range}
              onClick={setRange}
            />
            <span className="text-xs">&nbsp;days</span>
          </div>
        }
        <div className="text-center w-full h-full py-4 mx-auto flex flex-col items-center">
          <canvas id='social'></canvas>
        </div>
      </div>
    </>
  )
};