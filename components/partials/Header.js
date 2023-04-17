import { faUser }from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useApplicationData } from '../../hooks/useApplicationData'

export default function Header(props) {
  const {user} = useApplicationData();
  return(
    <header className="px-3 dark:text-white">
      <h2 className="text-xl font-medium">
        Hello {user.first_name}
      </h2>
      <p>Welcome to ActiveJourney</p>
      <nav className="flex content-center bg-blue-100 dark:bg-blue-950 rounded-xl px-5 py-3 my-3">
        <h1 className="self-center font-medium text-lg m-0">{props.pageTitle}</h1>
        <Link className="ml-auto self-end cursor-pointer items-center rounded-full bg-blue-800 hover:bg-blue-700 font-medium px-3 py-2.5 text-white dark:text-white" href="/profile">
          <div className="w-3 h-4">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </Link>
      </nav>
    </header>
    
  )
}
