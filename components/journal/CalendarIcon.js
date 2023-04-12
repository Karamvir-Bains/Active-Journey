import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt }from '@fortawesome/free-solid-svg-icons'

export default function CalendarIcon(props) {
  return (
    <button className='w-[20px] h-[20px] cursor-pointer mx-3 hover:text-blue-800' type="button" onClick={() => props.setShowCal(props.showCal == true ? false : true)}>
      <FontAwesomeIcon icon={faCalendarAlt} />
    </button>
  );
}