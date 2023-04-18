import { useState, useEffect } from "react";
import { useData } from "../../store/DataContext";

// convert props.today.water to percentage to fill animation of water glass/bottle
// https://codepen.io/qindazhu/pen/ZWNKoG
// https://github.com/coiger/fill-water-animation

export default function DailyWater(props) {
  const { data } = useData();
  const [milliliters, setMilliliters] = useState(0);

  useEffect(() => {
    if (data && data[0] && data[0].user_metric_data) {
      const newMetricValue = data[0].user_metric_data[data[0].user_metric_data.length - 1].metric_value;
      setMilliliters(newMetricValue);
    }
  }, [data]);

  const convertMlToCups = (val) => {
    return Math.round(val / 250);
  }

  let val = convertMlToCups(milliliters);

  const calcGlassHeight = (val) => {
    let heightClass = 'bg-gradient-to-t from-blue-500 to-blue-700 w-full absolute z-10 bottom-0 rounded-b-lg ';
    let bottomClass = '';
    if (val === 0) {
      heightClass += 'h-[0%] hidden';
      bottomClass += 'hidden';
    } else if (val === 1) {
      heightClass += 'h-[10%]';
      bottomClass += 'bottom-[10%]';
    } else if (val === 2) {
      heightClass += 'h-[20%]';
      bottomClass += 'bottom-[20%]';
    } else if (val === 3) {
      heightClass += 'h-[30%]';
      bottomClass += 'bottom-[30%]';
    } else if (val === 4) {
      heightClass += 'h-[40%]';
      bottomClass += 'bottom-[40%]';
    } else if (val === 5) {
      heightClass += 'h-[50%]';
      bottomClass += 'bottom-[50%]';
    } else if (val === 6) {
      heightClass += 'h-[60%]';
      bottomClass += 'bottom-[60%]';
    } else if (val === 7) {
      heightClass += 'h-[70%]';
      bottomClass += 'bottom-[70%]';
    } else if (val > 7) {
      heightClass += 'h-[80%]';
      bottomClass += 'bottom-[80%]';
    }
    return {
      heightClass,
      bottomClass
    };
  }

  const getGlassClass = calcGlassHeight(val).heightClass;
  const getBottomClass = calcGlassHeight(val).bottomClass;

  return(
    <div className="overflow-scroll rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-6 flex flex-col justify-start content-center">
      <h3 className="text-center font-bold mb-3 text-xl text-blue-900 dark:text-white">Daily Water Intake</h3>
      <div id="waterCup" className="mx-auto bg-blue-100 h-[65%] w-[50%] relative rounded-b-lg drop-shadow-sm">
        <div className="handle"></div>
        <div id="glass drop-shadow-2xl"></div>
        <div id="wave-1" className={getBottomClass}></div>
        <div id="wave-2" className={getBottomClass}></div>
        <div id="wave-3" className={getBottomClass}></div>
        <div 
          id="water" className={getGlassClass}>
        </div>
      </div>
      <div className="font-medium text-xl text-center my-3">
        {val} / 8 cups<br />
         ({milliliters}ml)
      </div>
    </div>
  )
}