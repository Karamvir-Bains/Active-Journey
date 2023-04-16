import React from "react";
import dynamic from 'next/dynamic';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

class CircleChart extends React.Component {
  constructor(props) {
    super(props);

    const stressVal = props.stress.map(entry => entry.metric_value * 10).slice(0, 7);

    this.state = {
      options: {
        chart: {
          height: 350,
          type: "radialBar",
        },
        series: stressVal,
        labels: ["04/08", "04/09", "04/10", "04/11", "04/12", "04/13", "04/14"],
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
      },
    };
  }

  render() {
    return(
      <>
        <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-6 mb-10 text-center">
          <h3 className="font-bold mb-1 text-xl text-blue-900 dark:text-blue-500">Weekly Stress</h3>
          <div className="px-12">
          <ApexCharts options={this.state.options} series={this.state.options.series} type="radialBar" height={400} />
          </div>
        </div>
      </>
    )
  }
}

export default CircleChart;
