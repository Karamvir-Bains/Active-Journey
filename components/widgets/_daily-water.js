const convertMlToCups = (val) => {
  return Math.ceil(val / 250);
}

export default function DailyWater(props) {
  let ml = 0;
  if (props.dailyWater.length > 0) {
    ml = props.dailyWater[0].metric_value;
  }
  let val = convertMlToCups(ml);

  const calcGlassHeight = (val) => {
    let heightClass = 'bg-blue-900 w-full absolute z-10 bottom-0 rounded-b-lg ';
    if (val === 0) {
      heightClass += 'h-[0%]';
    } else if (val === 1) {
      heightClass += 'h-[12.5%]';
    } else if (val === 2) {
      heightClass += 'h-[25%]';
    } else if (val === 3) {
      heightClass += 'h-[37.5%]';
    } else if (val === 4) {
      heightClass += 'h-[50%]';
    } else if (val === 5) {
      heightClass += 'h-[62.5%]';
    } else if (val === 6) {
      heightClass += 'h-[75%]';
    } else if (val === 7) {
      heightClass += 'h-[87.5%]';
    } else if (val > 7) {
      heightClass += 'h-[100%]';
    }
    return heightClass;
  }

  const getGlassClass = calcGlassHeight(val);

  return(
    <div className="overflow-scroll rounded-lg bg-white shadow-sm w-full h-full p-6 flex flex-col justify-start content-center">
      <h3 className="text-center font-bold mb-3 text-xl text-blue-900">Daily Water Intake</h3>
      <div id="waterCup" className="mx-auto bg-blue-100 h-[65%] w-[50%] relative rounded-b-lg drop-shadow-sm">
        <div className="handle"></div>
        <div 
          className={getGlassClass}></div>
      </div>
      <div className="font-medium text-lg text-center my-3">
        {val} out of 8 cups
      </div>
    </div>
  )
}