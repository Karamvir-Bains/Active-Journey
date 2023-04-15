import { useEffect } from "react"
import { Chart } from "chart.js/auto";

export default function Nutrition(props) {
  useEffect(() => {
    var ctx = document.getElementById('nutritionChart').getContext('2d');
    const labels = ["04/05", "04//06", "04/07", "04/08", "04/09", "04/10", "04/11", "04/12", "04/13", "04/14"];

    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(152, 194, 250, 1)');
    gradient.addColorStop(0.5 , 'rgba(178, 208, 247, 1)');
    gradient.addColorStop(1, 'rgba(199, 223, 255, 1)');
    
    const data = {
      labels: labels,
      datasets: [
        {
          data: [1, 9, 8, 9, 4, 4, 7, 10, 9, 8],
          backgroundColor: gradient,
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
        },
        scales: {
          x: {
            ticks: {
              callback: function (value, index) {
                if (index === 9) {
                  const today = labels.slice(-1)[0];
                  return today;
                } else {
                  return labels[value];
                }
              }  
            }
          }
        },
      },
    });

    return () => {
      nutritionChart.destroy()
    }
  }, []);
  return(
    <>
      <div className="rounded-lg bg-white shadow-sm w-full h-full p-6 mb-10 text-center">
        <h3 className="font-bold mb-2 text-xl text-blue-900">Quality of Nutrition</h3>
        <div className="text-center w-full h-5/6">
          <canvas id='nutritionChart'></canvas>
        </div>
      </div>
    </>
  )
};