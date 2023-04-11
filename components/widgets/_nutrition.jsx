import { useEffect } from "react"
import { Chart } from "chart.js/auto";

export default function Nutrition(props) {
  useEffect(() => {
    var ctx = document.getElementById('nutritionChart').getContext('2d');
    const labels = props.entries.map(entry => entry.id);
    
    const data = {
      labels: labels.slice(0,10),
      datasets: [
        {
          data: [1, 9, 8, 9, 4, 4, 7, 10, 9, 8],
          backgroundColor: "#d97706",
          borderRadius: 15
        }
      ]
    };
    const nutritionChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: false }
        }
      },
    });

    return () => {
      nutritionChart.destroy()
    }
  }, []);
  return(
    <>
      <div className="rounded-lg bg-white shadow-sm w-full h-full p-6 mb-10">
        <h3 className="font-bold mb-2 text-xl text-blue-900">Quality of Nutrition</h3>
        <p className="text-xs">Past 10 days</p>
        <div className="text-center w-full h-5/6">
          <canvas id='nutritionChart'></canvas>
        </div>
      </div>
    </>
  )
};