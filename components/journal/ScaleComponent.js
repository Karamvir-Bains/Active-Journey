export default function ScaleComponent(props) {
  return (
    <div className="mb-6">
      <div>
        <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          {props.name}
        </label>
      </div>

      <div>
        <input
          className="w-full"
          type="range"
          min={0}
          max={10}
          step={1}
          value={props.value || 0}
          onChange={props.handleChange}
        />
        <div className="flex justify-between w-full">
          <span>😔</span>
          <span>😐</span>
          <span>😊</span>
        </div>
      </div>
    </div>
  )
}