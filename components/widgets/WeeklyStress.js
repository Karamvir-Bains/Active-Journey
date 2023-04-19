import { useEffect, useState } from "react"
import { Chart } from "chart.js/auto";
import { useData } from "../../store/DataContext";

export default function WeeklyStress(props) {
  const { data } = useData();
  const [ stressAverage, setStressAverage ] = useState(0);

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
      <div className="rounded-lg bg-white shadow-sm w-full h-full p-6 mb-10">
        <h3 className="font-bold mb-1 text-xl text-blue-900">Weekly Stress</h3>
        <div className="py-9">
          <canvas id='activityChart'></canvas>
          <p className="text-center pt-6">Clever text here</p>
        </div>
      </div>
    </>
  )
};