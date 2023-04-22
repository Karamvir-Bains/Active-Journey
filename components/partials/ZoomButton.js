import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonRunning, faMagnifyingGlassPlus, faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons';

export default function ZoomButton(props) {
  return(
    <button onClick={props.onChange} className='w-[24px] h-[24px] absolute right-0 top-0 z-10 m-2 p-1 text-gray-500 dark:text-white hover:text-blue-800 dark:hover:text-orange-700'>
      {!props.zoom && 
        <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
      }
      {props.zoom && 
        <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
      }
    </button>
  )
}