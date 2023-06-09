import { useEffect, useState } from "react"
import { Chart } from "chart.js/auto";
import { useData } from "../../store/DataContext";
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";

export default function WeeklyStress(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;
  const { data } = useData();
  const [ stressAverage, setStressAverage ] = useState(0);

  const formatVal = (val) => {
    return Math.round(Number(val));
  }

  useEffect(() => {

    if (data && data[5] && data[5].user_metric_data) {
      let avgStress = data[5].user_metric_data
        .slice(-7)
        .reduce((total, val) => total + val.metric_value, 0);
      avgStress = (avgStress / 7 * 10);
      setStressAverage(avgStress);
    }

    const ctx = document.getElementById('activityChart').getContext('2d');

    const chartData = {
      datasets: [{
        label: 'Average Stress for Past Week',
        data: [25, 50, 25],
        borderWidth: 0,
        cutout: '60%',
        circumference: 180,
        rotation: 270,
        backgroundColor: [
          colours.low,
          colours.medium,
          colours.high
        ],
        needleValue: stressAverage
      }]
    };

    // Needle plugin block
    const gaugeNeedle = {
      id: 'gaugeNeedle',
      afterDatasetsDraw(chart) {
        const { ctx, data, chartArea: { width, height } } = chart;
        ctx.save();

        // Calculate needle angle
        const needleValue = data.datasets[0].needleValue;
        const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);
        const angle = Math.PI + (1 / dataTotal * needleValue * Math.PI);
        const cx = width / 2;
        const cy = chart._metasets[0].data[0].y;
        const offsetTop = ctx.canvas.offsetTop;

        // Draw needle
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -2);
        ctx.lineTo(height - offsetTop -30, 0);
        ctx.lineTo(0, 2);
        ctx.fillStyle = colours.needle;
        ctx.fill();

        // Draw needle dot
        ctx.translate(-cx, -cy);
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, 10);
        ctx.fill();
        ctx.restore();
      }
    };

    const activityChart = new Chart(ctx, {
      type: 'doughnut',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1.5,
        hover: {mode: null},
        legend: { display: false },
        plugins: { tooltip: { enabled: false } }
      },
      plugins: [gaugeNeedle]
    });

    return () => {
      activityChart.destroy()
    }
  }, [data, stressAverage, darkMode]);

  return(
    <>    
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-4 md:p-6 text-center">
        <h3 className="font-bold mb-1 text-lg md:text-xl text-blue-900 dark:text-white">Weekly Stress</h3>
        <div className="w-full h-[75%] flex flex-col mx-auto">
          <canvas id='activityChart'></canvas> 
          <p className="mx-auto text-center">
            Your Weekly Stress is at {formatVal(stressAverage)}%
          </p>
        </div>
      </div>
    </>
  )
};
