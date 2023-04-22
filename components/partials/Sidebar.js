import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonRunning, faPlus, faGear, faBell, faList, faChartLine, faRightFromBracket, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
// import { useTheme, useUpdateTheme } from '../../store/ThemeContext';
import { useJournal, useUpdateJournal } from '../../store/JournalContext';

export default function Sidebar(props) {
  const journalOpen = useJournal();
  const toggleJournal = useUpdateJournal();
  return(
    <aside id="section-sidebar" className="flex flex-shrink-0 md:py-3 w-full h-[50px] md:w-[75px] md:h-full fixed bottom-0 z-10 bg-white dark:bg-slate-900 dark:text-white  shadow-md">
      <div className="flex h-full w-full flex-row md:flex-col">
        <div id="menu" className="w-full py-1 px-2 md:py-2 md:px-3 flex md:flex-col justify-between overflow-auto">
          <Link href="/" className="focus:outline-none group flex justify-center w-full cursor-pointer items-center rounded-xl mx-0 md:mb-3 font-medium bg-blue-200 dark:bg-orange-700 hover:bg-blue-400 dark:hover:bg-blue-800 p-1 md:p-4 text-blue-900 dark:text-white hover:text-white">
            <FontAwesomeIcon className='w-[24px] h-[24px]'icon={faPersonRunning} />
            <span className="sr-only">Home</span>
          </Link>
          <div className="border-b-2 border-slate-300 md:my-3"></div>
          <Link href="/" title="Dashboard" className="focus:outline-none group m-0 flex justify-center min-h-4 w-full cursor-pointer items-center rounded-xl font-medium hover:bg-blue-100 dark:hover:bg-orange-700 p-2 md:p-4 text-blue-900 dark:text-white">
            <FontAwesomeIcon className='w-[24px] h-[24px]'icon={faChartLine} />
            <span className="sr-only">Dashboard</span>
          </Link>
          <Link href="/list" title="List View" className="focus:outline-none group m-0 flex justify-center min-h-4 w-full cursor-pointer items-center rounded-xl font-medium hover:bg-blue-100 dark:hover:bg-orange-700 p-2 md:p-4 text-blue-900 dark:text-white">
            <FontAwesomeIcon className='w-[24px] h-[24px]'icon={faList} />
            <span className="sr-only">List View</span>
          </Link>
          <Link href="/notifications" title="Notifications" className="focus:outline-none group m-0 flex justify-center min-h-4 w-full cursor-pointer items-center rounded-xl font-medium hover:bg-blue-100 dark:hover:bg-orange-700 p-2 md:p-4 text-blue-900 dark:text-white">
            <FontAwesomeIcon className='w-[24px] h-[24px]'icon={faBell} />
            <span className="sr-only">Notifications</span>
          </Link>
          <Link href="/settings" className="focus:outline-none group m-0 flex justify-center min-h-4 w-full cursor-pointer items-center rounded-xl font-medium hover:bg-blue-100 dark:hover:bg-orange-700 p-2 md:p-4 text-blue-900 dark:text-white">
            <FontAwesomeIcon className='w-[24px] h-[24px]'icon={faGear} />
            <span className="sr-only">Settings</span>
          </Link>
          <div title="Open Wellness Journal" onClick={toggleJournal} className="focus:outline-none group m-0 flex justify-center min-h-4 w-full cursor-pointer items-center rounded-xl font-medium hover:bg-blue-100 dark:hover:bg-orange-700 p-2 md:p-4 text-blue-900 dark:text-white">
            <FontAwesomeIcon className='w-[24px] h-[24px]'icon={faPlus} /> 
            <span className="sr-only">Add Journal Entry</span>
          </div>
          <a onClick={props.toggleDarkMode} className="focus:outline-none group m-0 flex justify-center min-h-4 w-full cursor-pointer items-center rounded-xl font-medium hover:bg-blue-100 dark:hover:bg-orange-700 p-1 md:p-4 text-blue-900 dark:text-white">
            { props.darkMode === 'dark' && 
              <FontAwesomeIcon className='w-[24px] h-[24px]' icon={faToggleOn} /> 
            }
            { (props.darkMode === 'light' ) &&
              <FontAwesomeIcon className='w-[24px] h-[24px]' icon={faToggleOff} />
            }
          </a>
        </div>
      </div>
    </aside>
  );
}