export default function InputComponent(props) {
  return (
    <div>
        <div className="flex flex-col mb-6">

          <div>
            <label className="text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              {props.name}
            </label>
          </div>

          <div className="flex items-end mt-4">
            <input
              className="w-1/6 bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              type="number" 
              placeholder={"0"} 
              value={props.value || ""}
              onChange={props.handleChange}
            />

            <label className="text-gray-500 font-bold text-sm ml-2">{props.unit || ""}</label>
          </div>

        </div>
    </div>
  )
}