import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CalendarWidget from 'react-calendar'
import { format } from 'date-fns';

export default function Calendar (props) {
  let newDate = new Date(props.day);
  return (
    <>
    <div className='overflow-scroll rounded-lg bg-blue-200 dark:bg-blue-900 shadow-sm w-full h-full p-6'>
      <div className='flex justify-evenly content-center w-full'>
        <div className="w-[33%] md:w-[25%]">
            <button
            onClick={() => props.handleSetDay(new Date(props.today))}
            className='flex flex-col justify-center content-center rounded-full text-blue-900 dark:text-blue-800 bg-blue-100 hover:bg-blue-50 py-1 px-5 mr-auto'
          >
            Today
          </button>
        </div>
        <h3 className='w-[33%] sm:w-[50%] flex flex-col justify-self-center justify-center content-center text-blue-950 dark:text-white text-lg font-bold text-center text-[1rem]'>
          {format(props.day, 'MMM d, yyyy')}
        </h3>
        <div className="w-[33%] md:w-[25%] align-stretch">
          <button role="button" onClick={props.toggleJournal}
            className='flex flex-col justify-center content-center rounded-full bg-blue-800 dark:bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 py-2 px-3 text-white ml-auto'>
            <FontAwesomeIcon className='w-4 h-4' icon={faPlus} />
          </button>
        </div>     
      </div>
      <div className='bg-white dark:bg-slate-800 dark:text-white  rounded-lg mt-3 p-2'>
        <CalendarWidget 
          value={new Date(props.day)}
          activeStartDate={new Date(props.day)}
          onChange={e => props.handleSetDay(new Date(e))}
          maxDate={new Date(props.today)}
          onActiveStartDateChange={(e) => props.handleCalNav(e)}
        />
      </div>
    </div>
    
    </>
  )
}
