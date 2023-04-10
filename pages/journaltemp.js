import { useState } from "react";
import Journal from "../components/journal";

export default function Journaltemp() {
  const [journalOpen, setJournalOpen] = useState(false);

  const toggleJournal = () => {
    setJournalOpen(!journalOpen);
  };

  return (
    <div className="h-screen w-screen bg-gray-300">
      <div className="flex items-center justify-center h-full">
        {journalOpen && <Journal onClose={toggleJournal} />}
      </div>

      {!journalOpen && (
        <button
          className="fixed top-0 right-0 m-4 bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
          onClick={toggleJournal}
        >
          Open Journal
        </button>
      )}
    </div>
  );
}
