import { faPersonRunning, faPlus, faGear, faUser, faBell, faList, faChartLine, faRightFromBracket, faToggleOn, faToggleOff }from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link';

export default function Sidebar(props) {
  return(
    <aside id="section-sidebar" className="flex flex-shrink-0 sm:py-3 w-full h-[75px] sm:w-[75px]  sm:h-full fixed bottom-0 z-10 bg-white dark:bg-slate-900 dark:text-white  shadow-md">
      <div className="flex h-full w-full flex-row sm:flex-col">
        <div id="menu" className="w-full py-2 px-3 flex sm:flex-col justify-between">
          <Link href="/" className="focus:outline-none group flex justify-center w-full cursor-pointer items-center rounded-xl mx-0 sm:mb-3 font-medium bg-blue-200 dark:bg-blue-900 hover:bg-blue-400 dark:hover:bg-blue-800 p-4 text-blue-900 dark:text-blue-200 hover:text-white">
            <div className="h-5 w-5">
              <FontAwesomeIcon icon={faPersonRunning} />
            </div>
            <span className="sr-only">Home</span>
          </Link>
          <div className="border-b-2 border-slate-300 sm:my-3"></div>
          <Link href="/" title="Dashboard" className="focus:outline-none group m-0 flex justify-center min-h-4 w-full cursor-pointer items-center rounded-xl font-medium hover:bg-blue-100 dark:hover:bg-blue-900 p-4 text-blue-900 dark:text-blue-200">
            <div className="h-4 w-4">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <span className="sr-only">Dashboard</span>
          </Link>
          <Link href="/list" title="List View" className="focus:outline-none group m-0 flex justify-center min-h-4 w-full cursor-pointer items-center rounded-xl px-4 font-medium hover:bg-blue-100 dark:hover:bg-blue-900 p-4 text-blue-900 dark:text-blue-200">
            <div className="h-4 w-4">
              <FontAwesomeIcon icon={faList} />
            </div>
            <span className="sr-only">List View</span>
          </Link>
          <Link href="/notifications" title="Notifications" className="focus:outline-none group m-0 flex justify-center min-h-4 w-full cursor-pointer items-center rounded-xl px-4 font-medium hover:bg-blue-100 dark:hover:bg-blue-900 p-4 text-blue-900 dark:text-blue-200">
            <div className="h-4 w-4">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <span className="sr-only">Notifications</span>
          </Link>
          <Link href="/settings" className="focus:outline-none group m-0 flex justify-center min-h-4 w-full cursor-pointer items-center rounded-xl px-4 font-medium hover:bg-blue-100 dark:hover:bg-blue-900 p-4 text-blue-900 dark:text-blue-200">
            <div className="h-4 w-4">
              <FontAwesomeIcon icon={faGear} />
            </div>
            <span className="sr-only">Settings</span>
          </Link>
          <div title="Open Wellness Journal" onClick={props.toggleJournal} className="focus:outline-none group m-0 flex justify-center min-h-4 w-full cursor-pointer items-center rounded-xl px-4 font-medium hover:bg-blue-100 dark:hover:bg-blue-900 p-4 text-blue-900 dark:text-blue-200">
            <div className="h-4 w-4">
              <FontAwesomeIcon icon={faPlus} /> 
            </div>
            <span className="sr-only">Add Journal Entry</span>
          </div>
          <a className="focus:outline-none group m-0 flex justify-center min-h-4 w-full cursor-pointer items-center rounded-xl px-4 font-medium hover:bg-blue-100 dark:hover:bg-blue-900 p-4 text-blue-900 dark:text-blue-200">
            <div className="h-4 w-4">
              <FontAwesomeIcon icon={faRightFromBracket} /> 
              <span className="sr-only">Logout</span>
            </div>
          </a>
          {/* onClick={() => props.handleDarkMode()} */}
          <a onClick={() => props.setDarkMode() } className="focus:outline-none group m-0 flex justify-center min-h-4 w-full cursor-pointer items-center rounded-xl px-4 font-medium hover:bg-blue-100 dark:hover:bg-blue-900 p-4 text-blue-900 dark:text-blue-200" >
            { props.darkMode === false && 
              <FontAwesomeIcon icon={faToggleOn} /> 
            }
            { props.darkMode === true &&
              <FontAwesomeIcon icon={faToggleOff} />
            }   
          </a>
        </div>
      </div>
    </aside>
  );
}