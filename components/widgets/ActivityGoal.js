import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useData } from "../../store/DataContext";
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useTheme } from '../../store/ThemeContext';

export default function ActivityGoal(props) {
  const darkMode = useTheme()
  const { data } = useData();
  const goal = 60;
  const [progressPercentage, setProgressPercentage] = useState(0);

  const [options, setOptions] = useState({
    chart: {
      type: 'radialBar',
    },
    series: [progressPercentage],
    colors: ["#BFDBFE"],
    labels: ['Progress'],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ["#87D4F9"],
        stops: [0, 100]
      }
    },
  });

  useEffect(() => {
    if (data && data[2] && data[2].user_metric_data) {
      const newMetricValue = data[2].user_metric_data[data[2].user_metric_data.length - 1].metric_value;
  
      let newProgressPercentage = Math.floor((newMetricValue / goal) * 100);
      newProgressPercentage = Math.min(newProgressPercentage, 100);
      setProgressPercentage(newProgressPercentage);
  
      setOptions({
        ...options,
        series: [newProgressPercentage],
      });
    }
  }, [data]);
  

  return(
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-6 mb-10 text-center">
        <h3 className="font-bold mb-1 text-xl text-blue-900 dark:text-white">Activity Goal</h3>
        {darkMode}
        <p className="text-center">{ progressPercentage === 100 ? "Congrats you hit your goal!" : "" }</p>
        <div className="px-6">
          <ApexCharts options={options} series={options.series} type="radialBar" height={260} />
        </div>
      </div>
    </>
  )
}
