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
  const [user, setUser] = useState({id: 1});
  const [journalOpen, setJournalOpen] = useState(false);
  let formatDate = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {  
    Promise.all([
      axios.get(`/api/users/${user.id}`),
    ])
      .then(all => {
        setUser(all[0].data);
      })
      .catch(err => {
        console.log("Error Message: ", err);
        return err;
      });
  }, []);

  const toggleJournal = async () => {
    setJournalOpen(!journalOpen);
  };

  return {
    user,
    setUser,
    journalOpen,
    toggleJournal,
  }
}
