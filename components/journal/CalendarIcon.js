import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt }from '@fortawesome/free-solid-svg-icons'

export default function CalendarIcon(props) {
  return (
    <button className='cursor-pointer mx-3 text-blue-600 hover:text-blue-500 dark:text-white dark:hover:text-orange-600' type="button" onClick={() => props.setShowCal(props.showCal == true ? false : true)}>
      <FontAwesomeIcon className='w-[20px] h-[20px]' icon={faCalendarAlt} />
    </button>
  );
}