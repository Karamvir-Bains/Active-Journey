import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";
import { useState, useCallback, useEffect } from "react"
import { useData } from "../../store/DataContext";
import { Chart } from "chart.js/auto";
import { buildLabels } from '../../helpers/selectors';
import ZoomButton from '../partials/ZoomButton';

export default function Sleep(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;
  const { 
    selectedDate,
    data } = useData();

  useEffect(() => {

    if (data && data[0] && data[0].user_metric_data) {

      // Get the Data needed from the Data object
      const newData1 = data[6].user_metric_data.map(item => item.metric_value);
      const newData2 = data[1].user_metric_data.map(item => item.metric_value);

      // Build the chart
      const ctx = document.getElementById("sleep").getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, 'rgba(152, 194, 250, 1)');
      gradient.addColorStop(0.5 , 'rgba(178, 208, 247, 1)');
      gradient.addColorStop(1, 'rgba(199, 223, 255, 1)');
      const sleepChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: buildLabels(selectedDate, 7),
          datasets: [{
            type: 'line',
            label: "Sleep Duration",
            data: [...newData1],
            borderColor: "#000305",
            pointRadius: 2,
            fill: true,
            borderDash: [5, 5],
          }, 
          {
            type: "line",
            label: "Sleep Quality",
            data: [...newData2],
            backgroundColor: gradient,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { display: false } }
        }
      });

      // Update the data when the data changes (selectedDate)
      sleepChart.data.datasets[0].data = [...newData1];
      sleepChart.data.datasets[1].data = [...newData2];
      sleepChart.update();

      return () => {
        sleepChart.destroy()
      }
    }
  }, [data, darkMode]);

  return(
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-2 md:p-6 text-center relative">
        <h3 className="font-bold mb-1 text-md md:text-xl text-blue-900 dark:text-white">Sleep Duration vs Sleep Quality</h3>
        <ZoomButton
          zoom={props.zoom}
          onChange={props.onChange}
        />
        <div className="w-full h-full py-6">
          <canvas id='sleep'></canvas>
        </div>
      </div>
    </>
  )
};