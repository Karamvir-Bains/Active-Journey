import React from "react";
import dynamic from 'next/dynamic';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

class RadialChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: 'radialBar',
        },
        series: [70],
        colors: ["#BFDBFE"],
        labels: ['Progress'],
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            gradientToColors: ["#87D4F9"],
            stops: [0, 100]
          }
        },
      },
    };
  }

  render() {
    return(
      <>
        <div className="rounded-lg bg-white shadow-sm w-full h-full p-6 mb-10 text-center">
          <h3 className="font-bold mb-1 text-xl text-blue-900">Activity Goal</h3>
          <p className="text-center">Congrats you hit your goal!</p>
          <div className="px-6">
          <ApexCharts options={this.state.options} series={this.state.options.series} type="radialBar" height={260} />
          </div>
        </div>
      </>
    )
  }
}

export default RadialChart;


  
