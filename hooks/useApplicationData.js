import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

/**
 * useApplicationData
 * 
 * Description: Manages state for our app inside an object
 * Includes state for: day, days, metrics, user
 *
 */

export function useApplicationData (initial) {
  const today = new Date();
  const [day, setDay] = useState(today);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({id: 1});
  const [journalOpen, setJournalOpen] = useState(false);
  let formatDate = format(today, 'yyyy-MM-dd');

  useEffect(() => {  
    Promise.all([
      axios.get(`/api/users/${user.id}/metrics/${String(formatDate)}`),
      axios.get(`/api/users/${user.id}`),
    ])
      .then(all => {
        setData(all[0].data)
        setUser(all[1].data);
      })
      .catch(err => {
        console.log("Error Message: ", err);
        return err;
      });
  }, []);

  const handleSetDay = async (date) => {
    setDay(new Date(date));
  }

  const toggleJournal = async () => {
    setJournalOpen(!journalOpen);
  };

  const handleCalNav = (e) => {
    // Month Nav
    const currentDate = new Date(day);
    const currentMonth = currentDate.getMonth();
    const prevMonth = new Date(currentDate.setMonth(currentMonth - 1));
    const nextMonth = new Date(currentDate.setMonth(currentMonth + 1));

    // Year Nav - double arrows
    const currentDate2 = new Date(day);
    const currentYear = currentDate2.getFullYear(); 
    const prevYear = new Date(currentDate2.setFullYear(currentYear - 1));
    const nextYear = new Date(currentDate2.setFullYear(currentYear + 1));

    if (e["action"] == 'prev') {
      setDay( prevMonth ) 
    }
    if (e["action"] == 'next') {
      setDay( nextMonth )  
    }
    if (e["action"] == 'prev2') {
      setDay( prevYear ) 
    }
    if (e["action"] == 'next2') {
      setDay( nextYear )  
    }
  }

  return {
    today,
    day,
    setDay,
    handleSetDay,
    data, 
    setData,
    user,
    setUser,
    journalOpen,
    setJournalOpen,
    toggleJournal,
    handleCalNav,
  }
}
