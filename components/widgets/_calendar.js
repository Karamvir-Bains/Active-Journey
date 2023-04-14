import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import CalendarWidget from 'react-calendar'

import { useData } from "../DataContext";


export default function Calendar (props) {
  const today = new Date();
  const { selectedDate, updateDate } = useData();

  const formatDate = date => {
    return format(date, 'MMMM d, yyyy')
  }

  return (
    <div className='overflow-scroll rounded-lg bg-blue-200 shadow-sm w-full h-full p-6'>
      <div className='flex justify-evenly content-center w-full'>
          <button
            onClick={() => updateDate(today)}
            className='flex flex-col justify-center content-center rounded-full text-blue-900 bg-blue-100 hover:bg-blue-50 py-1 px-5 mr-auto'
          >
            Today
          </button>
        <div className='w-[50%] flex flex-col justify-self-center justify-center content-center text-blue-950 font-bold text-lg'>
          {formatDate(selectedDate)}
        </div>
        <button onClick={props.toggleJournal} className='flex flex-col justify-center content-center rounded-full bg-blue-800 hover:bg-blue-700 py-1 px-3 text-white ml-auto'>
          <div className='w-3 h-3'>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </button>        
      </div>
      <div className='bg-white rounded-lg mt-3 p-2'>
        <CalendarWidget 
          value={new Date(selectedDate)}
          activeStartDate={new Date(selectedDate)}
          onChange={updateDate}
          maxDate={today}
        />
      </div>
    </div>
  )
}
