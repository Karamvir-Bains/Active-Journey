import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'
import CalendarWidget from 'react-calendar'

export default function Calendar (props) {
  const today = new Date()
  const formatDate = date => {
    return format(date, 'MMMM d, yyyy')
  }

  const dateFormatted = format(new Date(props.day), 'MMMM d,  yyyy')
  return (
    <div className='overflow-scroll rounded-lg bg-blue-200 shadow-sm w-full h-full p-6'>
      <div className='flex flex-row justify-start content-center w-full'>
        <button
          onClick={() => props.setDay(today)}
          className='flex flex-col justify-center content-center rounded-full text-blue-900 bg-blue-100 hover:bg-blue-50 py-1 px-5'
        >
          Today
        </button>
        <div className='text-blue-950 font-bold text-lg mx-auto'>
          {formatDate(props.day)}
        </div>
        <button className='flex flex-col ml-auto justify-center content-center rounded-full bg-blue-800 hover:bg-blue-700 py-1 px-3 text-white'>
          <div className='w-3 h-3'>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </button>
      </div>
      <div className='bg-white rounded-lg mt-3 p-2'>
        <CalendarWidget value={props.day} onChange={e => props.setDay(e)} />
      </div>
    </div>
  )
}
