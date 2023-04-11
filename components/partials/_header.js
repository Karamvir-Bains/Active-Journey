import { faUser }from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function Header(props) {
  return(
    <header className="px-3">
      <h2 className="text-xl font-medium">
        Hello {props.userName}
      </h2>
      <p>Welcome to ActiveJourney</p>
      <nav className="flex content-center bg-blue-100 rounded-xl px-5 py-3 my-3">
        <h1 className="self-center font-medium text-lg m-0">{props.pageTitle}</h1>
        <Link className="ml-auto self-end cursor-pointer items-center rounded-full bg-blue-800 hover:bg-blue-700 font-medium px-3 py-2.5 text-white" href="/profile">
          <div className="w-3 h-4">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </Link>
      </nav>
    </header>
    
  )
}
