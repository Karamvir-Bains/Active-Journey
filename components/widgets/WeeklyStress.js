import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useData } from "../../store/DataContext";
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function WeeklyStress() {

    
    const { data } = useData();
    const [stress, setStress] = useState(0);
    const [date, setDate] = useState(0);

    const [options, setOptions] = useState({
      chart: {
          height: 350,
          type: "radialBar",
        },
        series: [stress],
        labels: [date],
        colors: ["#BFDBFE"],
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: '#333',
              startAngle: -90,
              endAngle: 90,
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                color: "#111",
                fontSize: "30px",
                show: true
              },
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            gradientToColors: ["#87D4F9"],
            stops: [0, 100]
          }
        },
        stroke: {
          lineCap: "butt"
        },
    });

    useEffect(() => {
      if (data && data[5] && data[5].user_metric_data) {
        const lastSevenValues = data[5].user_metric_data.slice(-7);
        const sum = lastSevenValues.reduce((acc, curr) => acc + curr.metric_value, 0);
        const average = sum / lastSevenValues.length;
        setStress(Number(average.toFixed(2)));

        const metricDate = data[5].user_metric_data[data[5].user_metric_data.length - 1].date;
        const date = new Date(metricDate);
        const optionsTimezone = { month: '2-digit', day: '2-digit', timeZone: 'etc/UTC' };
        
        const newDate = date.toLocaleDateString('en-US',optionsTimezone);
        setDate(newDate);

        setOptions({
               ...options,
               series: [Number(average.toFixed(2))],
               labels: [newDate],
               });
        
      }
    }, [data]);
      
    return(
      <>
        <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-6 mb-10 text-center">
          <h3 className="font-bold mb-1 text-xl text-blue-900 dark:text-blue-500">Weekly Stress</h3>
          <div className="px-12">
          <ApexCharts options={options} series={options.series} type="radialBar" height={400} />
          </div>
        </div>
      </>
    )
  }



