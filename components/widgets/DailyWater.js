import { useState, useEffect } from "react";
import { useData } from "../../store/DataContext";

export default function DailyWater(props) {
  const { data } = useData();
  const [cups, setCups] = useState(0);

  useEffect(() => {
    if (data && data[0] && data[0].user_metric_data) {
      const newMetricValue = data[0].user_metric_data[data[0].user_metric_data.length - 1].metric_value;
      setCups(newMetricValue);
    }
  }, [data]);

  const calcGlassHeight = (val) => {
    let heightClass = 'bg-gradient-to-t from-blue-500 to-blue-700 w-full absolute z-10 bottom-0 rounded-b-lg ';
    let bottomClass = '';
    if (val === 0) {
      heightClass += 'h-[0%] hidden';
      bottomClass += 'hidden';
    } else if (val <= 1) {
      heightClass += 'h-[10%]';
      bottomClass += 'bottom-[9%]';
    } else if (val <= 2) {
      heightClass += 'h-[20%]';
      bottomClass += 'bottom-[19%]';
    } else if (val <= 3) {
      heightClass += 'h-[30%]';
      bottomClass += 'bottom-[29%]';
    } else if (val <= 4) {
      heightClass += 'h-[40%]';
      bottomClass += 'bottom-[39%]';
    } else if (val <= 5) {
      heightClass += 'h-[50%]';
      bottomClass += 'bottom-[49%]';
    } else if (val <= 6) {
      heightClass += 'h-[61%]';
      bottomClass += 'bottom-[60%]';
    } else if (val <= 7) {
      heightClass += 'h-[71%]';
      bottomClass += 'bottom-[70%]';
    } else if (val > 7) {
      heightClass += 'h-[81%]';
      bottomClass += 'bottom-[80%]';
    }
    return {
      heightClass,
      bottomClass
    };
  }

  const getGlassClass = calcGlassHeight(cups).heightClass;
  const getBottomClass = calcGlassHeight(cups).bottomClass;

  return(
    <div className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-4 md:p-6 text-center">
      <h3 className="font-bold mb-1 text-lg md:text-xl text-blue-900 dark:text-white">Daily Water Intake</h3>
      <div id="waterCup" className="mx-auto bg-blue-100 dark:bg-white h-[60%] w-[50%] max-w-[200px] relative rounded-b-lg drop-shadow-sm mt-6">
        <div className="handle"></div>
        <div id="glass drop-shadow-2xl"></div>
        <div id="wave-1" className={getBottomClass}></div>
        <div id="wave-2" className={getBottomClass}></div>
        <div id="wave-3" className={getBottomClass}></div>
        <div 
          id="water" className={getGlassClass}>
        </div>
      </div>
      <div className="font-medium text-md md:text-lg text-center my-3">
        {cups} / 8 cups<br />
      </div>
    </div>
  )
}