import { useEffect } from "react"
import { Chart } from "chart.js/auto";

export default function Sleep(props) {
  useEffect(() => {

    const ctx = document.getElementById("sleep").getContext('2d');
    const labels = ["04/08", "04/09", "04/10", "04/11", "04/12", "04/13", "04/14"];
    const sleepVal = props.sleep.map(entry => entry.metric_value).slice(0, 7);
    const sleepQual = props.sleepQuality.map(entry => entry.metric_value).slice(0, 7);

    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(152, 194, 250, 1)');
    gradient.addColorStop(0.5 , 'rgba(178, 208, 247, 1)');
    gradient.addColorStop(1, 'rgba(199, 223, 255, 1)');


    //change label to date
    var sleepChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          type: 'line',
          label: "Sleep Duration",
          data: sleepVal,
          borderColor: "#000305",
          pointRadius: 0,
          fill: true,
          borderDash: [5, 5],
        }, 
        {
          type: "line",
          label: "Sleep Quality",
          data: sleepQual,
          backgroundColor: gradient,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { dsiplay: false } }
      }
    });

    return () => {
      sleepChart.destroy()
    }
  }, []);
  return(
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-6 mb-10 text-center">
        <h3 className="font-bold mb-1 text-xl text-blue-900 dark:text-white">Sleep vs Quality</h3>
        <div className="p-4">
          <canvas id='sleep'></canvas>
        </div>
      </div>
    </>
  )
};