import { useState, useEffect } from "react"
import { Chart } from "chart.js/auto";
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";
import { buildLabels } from "../../helpers/selectors";
import { useData } from "../../store/DataContext";
import { format, subDays } from 'date-fns';

export default function Social(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;
  const { 
    selectedDate,
    data 
  } = useData();

  // Set it to server side props on initial load
  const [social, setSocial] = useState(props.social.map(item => item.metric_value));  

  useEffect(() => {
    const ctx = document.getElementById("social").getContext('2d');

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: false }
      }
    };

    const socialChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
      data: {
        labels: buildLabels(selectedDate, 30),
        datasets: [{
          data: social,
          backgroundColor: colours.social,
          fill: true,
          tension: 0.378
        }]
      },
    });

    if (data && data.length != 0) {
      // setSocial(data[7].user_metric_data.slice(-7).map(item => item.metric_value));
    }

    return () => {
      socialChart.destroy()
    }
  }, [data]);
  return(
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-6 mb-10 text-center">
        <h3 className="font-bold mb-1 text-xl text-blue-900 dark:text-white">Quality of Social Interactions</h3>
        <div className="">
          <canvas id='social'></canvas>
        </div>
      </div>
    </>
  )
};