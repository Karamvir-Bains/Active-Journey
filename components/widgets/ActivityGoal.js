import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useData } from "../../store/DataContext";
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";

export default function ActivityGoal(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;
  const { data } = useData();
  const goal = 60;
  const [progressPercentage, setProgressPercentage] = useState(0);

  const [options, setOptions] = useState({
    chart: {
      type: 'radialBar',
    },
    series: [progressPercentage],
    colors: [colours.activity],
    plotOptions:{
      radialBar:{
      dataLabels: {
        name: {
         offsetY: -10,
         color: colours.label,
         fontSize: "13px"
        },
        value: {
         color: colours.label,
         fontSize: "30px",
         show:true
        } 
    },},
    },
   labels: ["Progress"]
  });

  useEffect(() => {

    if (data && data[2] && data[2].user_metric_data) {
      const newMetricValue = data[2].user_metric_data[data[2].user_metric_data.length - 1].metric_value;

      let newProgressPercentage = Math.floor((newMetricValue / goal) * 100);
      newProgressPercentage = Math.min(newProgressPercentage, 100);
      setProgressPercentage(newProgressPercentage);

      if (darkMode == 'light') {
        setOptions(prev => ({
          ...prev,
          series: [newProgressPercentage],
          colors: [palette.light.activity],
          plotOptions: {...prev.plotOptions, radialBar: {...prev.plotOptions.radialBar, dataLabels: {...prev.plotOptions.radialBar.dataLabels, name: {...prev.plotOptions.radialBar.dataLabels.name, color: palette.light.label }, value: {...prev.plotOptions.radialBar.dataLabels.value, color: palette.light.label } } } },
        }));
      } else if (darkMode == 'dark') {
        console.log("darkMode");
        setOptions(prev => ({
          ...prev,
          series: [newProgressPercentage],
          colors: [palette.dark.activity],
          plotOptions: {...prev.plotOptions, radialBar: {...prev.plotOptions.radialBar, dataLabels: {...prev.plotOptions.radialBar.dataLabels, name: {...prev.plotOptions.radialBar.dataLabels.name, color: palette.dark.label }, value: {...prev.plotOptions.radialBar.dataLabels.value, color: palette.dark.label } } } },
        }));
      };
    }
  }, [data, darkMode]);

  return (
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-4 md:p-6 text-center">
        <h3 className="font-bold mb-1 text-lg md:text-xl text-blue-900 dark:text-white">Activity Goal</h3>
        <p className="text-center">{progressPercentage === 100 ? "Congrats you hit your goal!" : ""}</p>
        <div className="w-full h-full">
          <ApexCharts options={options} series={options.series} colors={options.colors}type="radialBar" height={275} />
        </div>
      </div>
    </>
  );
}
