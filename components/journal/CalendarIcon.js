import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt }from '@fortawesome/free-solid-svg-icons'

export default function CalendarIcon({ onClick }) {
  return (
    <button type="button" onClick={onClick}>
    <FontAwesomeIcon icon={faCalendarAlt} />
  </button>
  );
}