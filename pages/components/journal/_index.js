import { faTimes }from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Journal() {
  return(
    <section className="absolute z-20 left-0 flex flex-col justify-center content-center right-0 mx-auto h-auto bg-white rounded-lg w-1/2 py-6 px-10">
      <h3>Today</h3>
      <div className="flex justify-end w-full mb-5">
        <div className="h-5 w-5 text-gray-500">
            <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      
      <form className="w-full">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
              Sample Text
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-password">
              Quality of Sleep
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-number" type="number" placeholder="0" />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3"></div>
          <label className="md:w-2/3 block text-gray-500 font-bold">
            <input className="mr-2 leading-tight" type="checkbox" />
            <span className="text-sm">
              This is a checkbox
            </span>
          </label>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className="shadow bg-blue-800 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
              Save Journal
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}