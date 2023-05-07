import { useState, useEffect } from "react";
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";
import { buildLabels } from "../../helpers/selectors";
import { useData } from "../../store/DataContext";
import ZoomButton from "../partials/ZoomButton";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function Social(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;  
  const { selectedDate, data } = useData();

  const rangeValues = [7, 15, 30];
  const { range, setRange } = useState(rangeValues[0]);
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
  }, [data, darkMode]);

  return(
    <>
      <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-4 md:p-6 text-center relative">
        <h3 className="font-bold mb-1 text-lg md:text-xl text-blue-900 dark:text-white">Quality of Social Interactions</h3>
        <ZoomButton
          zoom={props.zoom}
          onChange={props.onChange}
        />
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