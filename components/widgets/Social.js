import { useState, useEffect } from "react"
import { Chart } from "chart.js/auto";
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";
import { buildLabels } from "../../helpers/selectors";
import { useData } from "../../store/DataContext";

export default function Social(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;
  // Set it to server side props on initial load
  const [social, setSocial] = useState(props.social.map(item => item.metric_value).reverse());  

  const { 
    selectedDate,
    data 
  } = useData();


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

    const chartData = {
      labels: buildLabels(selectedDate, 30),
      datasets: [{
        data: social,
        backgroundColor: colours.social,
        fill: true,
        tension: 0.378
      }]
    }

    const socialChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
      data: chartData
    });

    if (data && data.length && data[7]) {
      const newData = data[7].user_metric_data.slice(-30).map(item => item.metric_value);
      socialChart.data.datasets[0].data = [...newData];
      socialChart.update();
      setSocial(data[7].user_metric_data.slice(-30).map(item => item.metric_value));
    }

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
  }, [data, darkMode]);
  return(
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-6 mb-10 text-center">
        <h3 className="font-bold mb-1 text-xl text-blue-900 dark:text-white">Quality of Social Interactions</h3>
        <div className="text-center w-full h-full py-4 mx-auto flex flex-col items-center">
          <canvas id='social'></canvas>
        </div>
      </div>
    </>
  )
};