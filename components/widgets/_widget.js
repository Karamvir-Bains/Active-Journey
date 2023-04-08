export default function Widget(props) {
  return(
    <div className="overflow-scroll rounded-lg bg-white shadow-sm w-full h-full p-6">
      <h3 className="font-bold mb-3 text-xl text-blue-900">{props.title}</h3>
      <div className="bg-blue-100 py-10 text-center">
        <div className="">INSERT CHART HERE</div>
      </div>
    </div>
  )
}