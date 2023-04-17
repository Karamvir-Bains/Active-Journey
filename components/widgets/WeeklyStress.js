import { useEffect, useState } from "react"
import { Chart } from "chart.js/auto";
import { useData } from "../../store/DataContext";

export default function WeeklyStress(props) {
  const { data } = useData();
  const [stressAverage, setStressAverage] = useState(0);

  useEffect(() => {

    if (data && data[5] && data[5].user_metric_data) {
      let avgStress = data[5].user_metric_data
        .slice(-7)
        .reduce((total, val) => total + val.metric_value, 0);
      console.log('avgStress before: ', avgStress);
      avgStress = (avgStress / 7 * 10);
      console.log('avgStress after: ', avgStress);
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
          'rgb(144, 12, 63)',
          'rgb(255, 195, 0)',
          'rgb(76, 187, 23)'
        ],
        needleValue: stressAverage
      }]
    };

    // plugin block
    const gaugeNeedle = {
      id: 'gaugeNeedle',
      afterDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, data, config, chartArea: { 
            top, bottom, left, right, width, height 
          } } = chart;
        ctx.save();
        
        const needleValue = data.datasets[0].needleValue;
        const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);
        
        // Calculate needle angle
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
      <div className="rounded-lg bg-white shadow-sm w-full h-full p-6 mb-10">
        <h3 className="font-bold mb-1 text-xl text-blue-900">Weekly Stress</h3>
        <div className="py-3">
          <canvas id='activityChart'></canvas>
        </div>
      </div>
    </>
  )
};