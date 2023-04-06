import { faPlus, faChevronLeft }from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Calendar() {
  return(
    <div className="overflow-scroll rounded-lg bg-blue-200 shadow-sm w-full h-full p-6">
      <div className="flex flex-row justify-between content-center w-full">
        <button className="rounded-full text-blue-900 bg-blue-100 hover:bg-blue-50 py-1 px-5">Today</button>
        <button className="rounded-full bg-blue-800 hover:bg-blue-700 py-1 px-3 text-white">
          <div className="w-3 h-3">
            <FontAwesomeIcon icon={faPlus} /> 
          </div>
        </button>
      </div>
      <div className="my-6 bg-white p-10">
        INSERT CALENDAR HERE
      </div>
    </div>
  )
}