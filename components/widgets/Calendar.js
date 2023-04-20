import { useState } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CalendarWidget from 'react-calendar'
import { formatDate } from '../../helpers/data';
import { useData } from '../../store/DataContext';
import { useJournal, useUpdateJournal } from '../../store/JournalContext';

export default function Calendar (props) {
  const { 
    selectedDate,
    updateDate,
    today,
    oldestDay,
    activeStartDate,
    handleTodayClick,
    handleActiveStartDateChange,
  } = useData();

  const journalOpen = useJournal();
  const toggleJournal = useUpdateJournal();

  return (
    <>
    <div className='overflow-scroll rounded-lg bg-blue-200 dark:bg-orange-400 shadow-sm w-full h-full lg:px-6 py-4'>
      <div className='flex justify-evenly content-center w-full'>
        <div className="w-[33%] md:w-[25%]">
            <button
            onClick={handleTodayClick}
            className='flex flex-col justify-center content-center rounded-full text-blue-900 dark:text-slate-800 bg-blue-100 hover:bg-blue-50 dark:bg-white dark:hover:bg-orange-100 py-1 px-2 xl:px-4 mr-auto'
          >
            Today
          </button>
        </div>
        <h3 className='w-[33%] sm:w-[50%] flex flex-col justify-self-center justify-center content-center text-blue-950 dark:text-slate-950 text-lg font-bold text-center text-[1rem]'>
          {formatDate(selectedDate)}
        </h3>
        <div className="w-[33%] md:w-[25%] align-stretch">
          <button role="button" onClick={toggleJournal}
            className='flex flex-col justify-center content-center rounded-full bg-blue-800 hover:bg-blue-900 dark:bg-orange-700 dark:hover:bg-orange-800 py-2 px-3 text-white ml-auto'>
            <FontAwesomeIcon className='w-4 h-4' icon={faPlus} />
          </button>
        </div>     
      </div>
      <div className='bg-white dark:bg-slate-800 dark:text-white  rounded-lg mt-3 p-2'>
        <CalendarWidget 
          value={selectedDate}
          onChange={(newDay) => updateDate(newDay)}
          maxDate={today}
          minDate={oldestDay}
          activeStartDate={activeStartDate}
          onActiveStartDateChange={(e) => handleActiveStartDateChange(e.activeStartDate)}
        />
      </div>
    </div>
    </>
  )
}
