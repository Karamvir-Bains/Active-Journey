export default function DailyWater() { 
  // convert props.today.water to percentage to fill animation of water glass/bottle
  // https://codepen.io/qindazhu/pen/ZWNKoG
  // https://github.com/coiger/fill-water-animation

  return(
    <div className="overflow-scroll rounded-lg bg-white shadow-sm w-full h-full p-6 flex flex-col justify-start content-center">
      <h3 className="text-center font-bold mb-3 text-xl text-blue-900">Daily Water Intake</h3>
      <div className="mx-auto bg-blue-100  h-20 w-20 relative rounded-lg">
        <div className="bg-blue-900 h-10 w-20 absolute z-10 bottom-0 rounded-lg"></div>
      </div>
      <div className="font-medium text-lg text-center my-3">
        5 out of 8 cups
      </div>
    </div>
  )
}