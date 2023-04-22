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

  const [sleep, setSleep] = useState([]);
  const [sleepQuality, setSleepQuatlity] = useState([]);
  

  //use data object to pass charts live data on refresh
  useEffect(() => {
    //create chart and all options     
    const ctx = document.getElementById("sleep").getContext('2d');
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: { 
        y: { 
          display: false 
        },
      }
    }
    const chartData = {
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
    };
    const sleepChart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options
    })

    if (data && data.length && data[1]) {
      const lastSevenValues = data[1].user_metric_data.slice(-7);
      const sleepValues = lastSevenValues.map(item => item.metric_value);
      const lastSevenValuesQuality = data[6].user_metric_data.slice(-7);
      const qualityValues = lastSevenValuesQuality.map(item => item.metric_value);
      
      setSleep(sleepValues);
      setSleepQuatlity(qualityValues);
      sleepChart.data.datasets[0].data = [...sleepValues];
      sleepChart.data.datasets[1].data = [...qualityValues];
      sleepChart.update();
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