import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";
import { useState, useEffect, useRef } from "react"
import { useData } from "../../store/DataContext";
import { Chart } from "chart.js/auto";
import { format, subDays } from 'date-fns';

export default function Sleep(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;

  const { 
    selectedDate,
    data } = useData();

  const [sleep, setSleep] = useState(0);
  const [sleepQuality, setSleepQuatlity] = useState(0);

  const buildLabels = () => {
    return [
      format(subDays(selectedDate, 6), 'MMM dd'),
      format(subDays(selectedDate, 5), 'MMM dd'),
      format(subDays(selectedDate, 4), 'MMM dd'),
      format(subDays(selectedDate, 3), 'MMM dd'),
      format(subDays(selectedDate, 2), 'MMM dd'),
      format(subDays(selectedDate, 1), 'MMM dd'),
      format(selectedDate, 'MMM dd')
    ]
  }

  //create chart and all options 
  let options = {
      type: 'line',
      data: {
        labels: buildLabels(),
        datasets: [{
          type: 'line',
          label: "Sleep Duration",
          data: sleep,
          borderColor: "#000305",
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
        scales: { y: { display: false } }
      }
    };

  //use data object to pass charts live data on refresh
  useEffect(() => {
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
        <h3 className="font-bold mb-1 text-xl text-blue-900 dark:text-blue-500">Sleep vs Quality</h3>
        <div className="px-12">
          <canvas id='sleep'></canvas>
        </div>
      </div>
    </>
  )
};