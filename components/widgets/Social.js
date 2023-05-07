import { useState, useEffect } from "react";
import { useTheme } from '../../store/ThemeContext';
import { palette } from "../../helpers/data";
import { buildLabels, buildDataset } from "../../helpers/selectors";
import { useData } from "../../store/DataContext";
import ZoomButton from "../partials/ZoomButton";
import { ComposedChart, Line, XAxis, YAxis, ResponsiveContainer, Bar } from 'recharts';
import RangeButtonGroup from "../partials/RangeButtonGroup";

export default function Social(props) {
  const darkMode = useTheme();
  const colours = darkMode === 'light' ? palette.light : palette.dark;  
  const { selectedDate, data } = useData();

  // Date range navigation
  const rangeValues = [7, 15, 30];
  const [ range, setRange ] = useState(15);
  const [ widgetData, setWidgetData ] = useState();

  useEffect(() => {
    if (data && data.length > 0) {
      const socialData = data[7].user_metric_data.slice(-range).map(item => item.metric_value);
      const alcData = data[9].user_metric_data.slice(-range).map(item => item.metric_value);
      const labels = buildLabels(selectedDate, range, 7);
      // Build and setWidgetData
      const chartData = [];
      socialData.forEach((value, index) => {
        chartData.push({
          date: labels[index],
          social: value,
          alcohol: alcData[index]
        });
      });
      setWidgetData(chartData);
      console.log('widgetData: ', widgetData);
    }
  }, [data, darkMode, setWidgetData, range, selectedDate]);

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
            <Bar dataKey="alcohol" barSize={20} fill={colours.alcohol} />
            <Line type="monotone" dataKey="social" stroke={colours.social} />
            <XAxis dataKey="date" />
            <YAxis />
          </ComposedChart>
        </ResponsiveContainer>
        </div>
      </div>
    </>
  )
};