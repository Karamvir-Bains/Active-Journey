import { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { useData } from "../DataContext";

export default function ActivityGoal() {
  const { data } = useData();
  const goal = 60;
  const [progress, setProgress] = useState(0);

  const [progressPercentage, setProgressPercentage] = useState(0);
  
  useEffect(() => {
    if (data && data[2] && data[2].user_metric_data) {
      setProgress(data[2].user_metric_data[data[2].user_metric_data.length - 1].metric_value)

  
      let progressPercentage = Math.floor((progress / goal) * 100);
      progressPercentage = Math.min(progressPercentage, 100);
      setProgressPercentage(progressPercentage);
  
      const activityData = {
        datasets: [{
          data: [progressPercentage, 100 - progressPercentage],
          borderWidth: 2,
          backgroundColor: [
            '#97b4df',
            '#d3d3d3',
          ],
        }]
      };
      var ctx = document.getElementById('activityChart').getContext('2d');
      var activityChart = new Chart(ctx, {
        type: 'doughnut',
        data: activityData,
        options: {
          legend: { display: false },
          plugins: { tooltip: { enabled: false } },
          hover: {mode: null},
        }
      });
  
      return () => {
        activityChart.destroy()
      }
    }
  }, [data, progress, goal]);

  if (!data || !data[2] || !data[2].user_metric_data) {
    return <div>Loading...</div>;
  }

  return(
    <>
      <div className="rounded-lg bg-white shadow-sm w-full h-full p-6 mb-10">
        <h3 className="font-bold mb-1 text-xl text-blue-900">Activity Goal</h3>
        <p className="text-center">{progressPercentage}% Progress</p>
        <div className="px-12">
          <canvas id='activityChart'></canvas>
        </div>
      </div>
    </>
  )
};
