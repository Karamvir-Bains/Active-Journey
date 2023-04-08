import { useEffect } from "react"
import { Chart } from "chart.js/auto";

export default function Nutrition() {
  useEffect(() => {
    var ctx = document.getElementById('nutritionChart').getContext('2d');
    
    const data = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      datasets: [
        {
          label: 'Dataset 1',
          data: [1, 9, 8, 9, 4, 4, 7, 10],
          backgroundColor: "#d97706",
        }
      ]
    };
    const nutritionChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Chart.js Bar Chart'
          }
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
      <h3 className="font-bold mb-3 text-xl text-blue-900">Quality of Nutrition</h3>
      <p>Past 10 days</p>
        <div className="text-center p-6">
          <canvas id='nutritionChart'></canvas>
        </div>
      </div>
    </>
  )
};