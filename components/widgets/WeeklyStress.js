import { useEffect, useState } from "react"
import { Chart } from "chart.js/auto";
import { useData } from "../../store/DataContext";

export default function WeeklyStress(props) {
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
          'rgba(76, 187, 23)',
          'rgba(255, 195, 0)',
          'rgba(144, 12, 63)'
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
        ctx.lineTo(height - offsetTop + 30, 0);
        ctx.lineTo(0, 2);
        ctx.fillStyle = '#444';
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
  }, [data, stressAverage]);

  return(
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-2 lg:p-6 mb-10 text-center">
        <h3 className="font-bold mb-1 text-xl text-blue-900 dark:text-white">Weekly Stress</h3>
        <div className="relative w-[90%] h-[60%] flex flex-col items-center mx-auto">
          <canvas id='activityChart'></canvas>
          {stressAverage > 70 && 
              <div className="bg-white dark:bg-slate-900 bg-opacity-60 dark:bg-opacity-60 rounded-lg p-2 absolute bottom-0 left-0 right-0 mx-auto
              ">Try daily meditation or yoga to bring your stress levels down.
              </div>
            }  
          <p className="mx-auto text-center">
            Your Weekly Stress is at {formatVal(stressAverage)}%
          </p>
        </div>
      </div>
    </>
  )
};