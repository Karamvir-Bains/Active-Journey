import React, {useState, useContext} from "react"

const JournalContext = React.createContext()
const JournalUpdateContext = React.createContext()

export function useJournal() {
  return useContext(JournalContext)
}

export function useUpdateJournal() {
  return useContext(JournalUpdateContext)
}

export function JournalProvider({ children }) {
  const [journalOpen, setjournalOpen] = useState(false);

  function toggleJournal() {
    setjournalOpen(prev => prev ? false : true);
  }

  return (
    <JournalContext.Provider value={journalOpen}>
      <JournalUpdateContext.Provider value={toggleJournal}>
        {children}
      </JournalUpdateContext.Provider>
    </JournalContext.Provider>
  )
}