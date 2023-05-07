import { useState, useEffect } from "react";
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";
import { buildLabels, buildDataset } from "../../helpers/selectors";
import { useData } from "../../store/DataContext";
import ZoomButton from "../partials/ZoomButton";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import RangeButtonGroup from "../partials/RangeButtonGroup";

export default function Social(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;  
  const { selectedDate, data } = useData();

  // Date range navigation
  const rangeValues = [7, 15, 30];
  const [range, setRange] = useState(7);
  const labelsThreshold = props.zoom ? rangeValues[1] : rangeValues[0];
  const { widgetData, setWidgetData } = useState();

  const socialData = [
    {date: 'Page A', uv: 400, pv: 2400, amt: 2400},
    {date: 'Page A', uv: 500, pv: 2400, amt: 2400},
    {date: 'Page A', uv: 900, pv: 2400, amt: 2400},
    {date: 'Page A', uv: 200, pv: 2400, amt: 2400},
    {date: 'Page A', uv: 400, pv: 2400, amt: 2400}
  ];


  useEffect(() => {
    if (data && data.length && data[7]) {
      const newData = data[7].user_metric_data.slice(-30).map(item => item.metric_value);
      const labels = buildLabels(newData, range);
      // Build and setWidgetData
      newData.forEach(element => {
        
      });
    }
  }, [data, darkMode, range]);

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
              <MetricDropdown placeHolder="Add more metrics..." />
            </div>
          </div>
        }
        <div className="text-center w-full h-full py-4 mx-auto flex flex-col items-center">
        <ResponsiveContainer>
          <LineChart data={socialData}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <XAxis dataKey="date" />
            <YAxis />
          </LineChart>
        </ResponsiveContainer>
        </div>
      </div>
    </>
  )
};