import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";
import { useState, useEffect, useRef } from "react"
import { useData } from "../../store/DataContext";
import { Chart } from "chart.js/auto";
import { buildLabels } from '../../helpers/selectors';

export default function Sleep(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;
  const { 
    selectedDate,
    data } = useData();

  const [sleep, setSleep] = useState(props.sleep.map(item => item.metric_value));
  const [sleepQuality, setSleepQuatlity] = useState(props.sleepQuality.map(item => item.metric_value));
  let options = {
    type: 'line',
    data: {
      labels: buildLabels(selectedDate, 7),
      datasets: [{
        type: 'line',
        label: "Sleep Duration",
        data: sleep,
        borderColor: colours.alcohol,
        pointRadius: 0,
        fill: true,
        borderDash: [5, 5],
      }, 
      {
        type: "line",
        label: "Sleep Quality",
        data: sleepQuality,
        backgroundColor: colours.sleep,
        fill: true
      }]
    },
    option: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { 
        y: { 
          display: false 
        },
      }
    }
  };

  //use data object to pass charts live data on refresh
  useEffect(() => {
    //create chart and all options     
    const ctx = document.getElementById("sleep").getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(152, 194, 250, 1)');
    gradient.addColorStop(0.5 , 'rgba(178, 208, 247, 1)');
    gradient.addColorStop(1, 'rgba(199, 223, 255, 1)');

    const sleepChart = new Chart(ctx, options)

    if (data && data.length != 0) {
      const lastSevenValues = data[1].user_metric_data.slice(-7);
      const sleepValues = lastSevenValues.map(item => item.metric_value);
      const lastSevenValuesQuality = data[6].user_metric_data.slice(-7);
      const qualityValues = lastSevenValuesQuality.map(item => item.metric_value);
      
      setSleep(sleepValues);
      setSleepQuatlity(qualityValues);
    }  
    
    return () => {
      sleepChart.destroy();
    };
  }, [data]);

  return(
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-6 mb-10 text-center">
        <h3 className="font-bold mb-1 text-xl text-blue-900 dark:text-white">Sleep vs Quality</h3>
        <div className="text-center w-full h-full py-4 mx-auto flex flex-col items-center">
          <canvas id='sleep'></canvas>
        </div>
      </div>
    </>
  )
};