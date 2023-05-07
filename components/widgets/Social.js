import { useState, useEffect } from "react";
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";
import { useData } from "../../store/DataContext";
import { buildChartData } from "../../helpers/selectors";
import ZoomButton from "../partials/ZoomButton";
import RangeButtonGroup from "../RangeButtonGroup";
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, Legend, Tooltip } from 'recharts';

export default function Social(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;  
  const { selectedDate, data } = useData();

  // Date range navigation
  const rangeValues = [7, 15, 30];
  const [ range, setRange ] = useState(15);
  const [ widgetData, setWidgetData ] = useState();
  const [ metrics, setMetrics ] = useState([data[7], data[9]]);
  // When user selects new metric from dropdown, add metric data to state

  useEffect(() => {
    if (data && data.length > 0) {
      const chartData = buildChartData(metrics, selectedDate, range);
      setWidgetData(chartData);
    }
  }, [data, darkMode, range, selectedDate, metrics]);

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
          <ComposedChart data={widgetData}>
            <Bar 
              dataKey="alcohol" 
              barSize={20} 
              fill={colours.alcohol} />
            <Line 
              type="monotone" 
              dataKey="social" 
              stroke={colours.social} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              cursor={{ stroke: '#aaa', strokeWidth: 1 }}
              labelStyle={{ color: '#aaa' }}
              wrapperStyle={{ backgroundColor: '#000' }} />
            <Legend wrapperStyle={{ stroke: 'solid 1px #000' }} />
          </ComposedChart>
        </ResponsiveContainer>
        </div>
      </div>
    </>
  )
};