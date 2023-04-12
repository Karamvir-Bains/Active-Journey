import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import CalendarWidget from 'react-calendar'
import { formatDate } from '../../helpers/data';

export default function Calendar (props) {
  const todayText = 'Today';

  return (
    <div className='overflow-scroll rounded-lg bg-blue-200 shadow-sm w-full h-full p-6'>
      <div className='flex justify-evenly content-center w-full'>
        <div className="w-[33%]">
            <button
            onClick={() => props.setDay(props.today)}
            className='flex flex-col justify-center content-center rounded-full text-blue-900 bg-blue-100 hover:bg-blue-50 py-1 px-5 mr-auto'
          >
            Today
          </button>
        </div>
        <div className='w-[33%] flex flex-col justify-self-center justify-center content-center text-blue-950 font-bold text-lg text-center'>
          { formatDate(props.today) == formatDate(props.day) &&  todayText }
          { formatDate(props.today) != formatDate(props.day) && formatDate(props.day) }
        </div>
        <div className="w-[33%] align-stretch">
          <button onClick={props.toggleJournal} className='flex flex-col justify-center content-center rounded-full bg-blue-800 hover:bg-blue-700 py-2 px-3 text-white ml-auto'>
            <div className='w-4 h-4'>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </button>
        </div>     
      </div>
      <div className='bg-white rounded-lg mt-3 p-2'>
        <CalendarWidget 
          value={new Date(props.day)}
          activeStartDate={new Date(props.day)}
          onChange={e => props.setDay(e)}
          maxDate={props.today}
          onActiveStartDateChange={(e) => {props.handleCalNav(e)}}
        />
      </div>
    </div>
  )
}
