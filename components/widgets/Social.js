import { useState, useEffect } from "react";
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";
import { useData } from "../../store/DataContext";
import { getMetricValues } from "../../helpers/selectors";
import { buildChartData } from "../../helpers/charts";
import ZoomButton from "../partials/ZoomButton";
import RangeButtonGroup from "../RangeButtonGroup";
import {  ResponsiveContainer, 
          ComposedChart, 
          Line, 
          Bar,
          Area,
          XAxis, 
          YAxis, 
          Legend, 
          Tooltip } from 'recharts';

export default function Social(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;  
  const { selectedDate, data } = useData();

  // Date range navigation
  const rangeValues = [7, 15, 30];
  const [ range, setRange ] = useState(15);
  const [ chartData, setChartData ] = useState();
  const [ metrics, setMetrics ] = useState();
  // When user selects new metric from dropdown, add metric data[n] to state
  // click: pass props name, id
  console.log('chartData: ', chartData);
  console.log('metrics: ', metrics);

  const [charts, setCharts] = useState();
  console.log('charts: ', charts);

  const chartChildren = charts && charts.map((chart, index) => {
    switch (chart.type) {
      case 'line':
        return <Line key={index} dataKey={chart.dataKey} stroke={chart.stroke} type="monotone" />;
      case 'area':
        return <Area key={index} dataKey={chart.dataKey} fill={chart.fill} />;
      case 'bar':
        return <Bar key={index} dataKey={chart.dataKey} fill={chart.fill} />;
      default:
        return null;
    }
  });

  // const handleAddChart = () => {
  //   setCharts([...charts, {
  //     type: ,
  //     dataKey: ,
  //     fill: ,
  //   }]);
  // }

  useEffect(() => {
    if (data && data.length > 0) {
      setCharts([
        { type: 'bar', dataKey: data[9].name, fill: colours.social },
        { type: 'line', dataKey: data[7].name, stroke: colours.alcohol }
      ]);
      // setMetrics(metricsDataObj); 
      // console.log('metrics: ', metrics);
      // account for async setMetrics, use metrics below
      setChartData(buildChartData([data[7], data[9]], selectedDate, range));
    }
  }, [data, darkMode, range, selectedDate, colours.alcohol, colours.social]);

  return(
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-4 md:p-6 relative">
        <h3 className="font-bold mb-1 text-lg md:text-xl text-blue-900 dark:text-white text-center">Quality of Social Interactions</h3>
        <ZoomButton
          zoom={props.zoom}
          onChange={props.onChange}
        />        
        {props.zoom &&
          <div>
            <div className="inline-block absolute top-6 z-10">
              <RangeButtonGroup
                ranges={rangeValues} 
                rangeState={range}
                onClick={setRange}
              />
              <span className="text-xs">&nbsp;days</span>
            </div>
            <div className="">
              {/* <MetricDropdown placeHolder="Add more metrics..." /> */}
            </div>
          </div>
        }
        <div className="text-center w-full h-full py-4 mx-auto flex flex-col items-center">
        <ResponsiveContainer>
          <ComposedChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              cursor={{ stroke: '#aaa', strokeWidth: 1 }}
              labelStyle={{ color: '#aaa' }}
              wrapperStyle={{ backgroundColor: '#000' }} />
            <Legend wrapperStyle={{ stroke: 'solid 1px #000' }} />
            {chartChildren}
          </ComposedChart>
        </ResponsiveContainer>
        </div>
      </div>
    </>
  )
};