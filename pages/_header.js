import { faUser }from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Header() {
  return(
    <header className="py-6 px-3">
      <h2 className="text-xl font-medium">
        Hello Bingo!
      </h2>
      <p>Welcome to ActiveJourney</p>
      <nav className="flex content-center bg-blue-100 rounded-xl px-3 py-2 my-3">
        <h1 className="self-center font-medium text-lg m-0">Dashboard</h1>
        <a className="ml-auto self-end cursor-pointer items-center rounded-full bg-blue-800 hover:bg-blue-700 font-medium px-3 py-2.5 text-white">
          <div className="w-3 h-4">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <span className="sr-only">Profile</span>
        </a>
      </nav>
    </header>
    
  )
}
