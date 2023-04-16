import React, { useState, useContext, useEffect } from "react";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const today = new Date();
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/userData?date=${selectedDate.toLocaleString()}`);
      const { metrics } = await res.json();
      setData(metrics);
    }
    fetchData();
  }, [selectedDate]);

  function updateData(data) {
    setData(data);
  }

  function updateDate(date) {
    setSelectedDate(date);
  }

  const handleCalNav = (e) => {
    // Month Nav
    const currentDate = new Date(selectedDate);
    const currentMonth = currentDate.getMonth();
    const prevMonth = new Date(currentDate.setMonth(currentMonth - 1));
    const nextMonth = new Date(currentDate.setMonth(currentMonth + 1));

    // Year Nav - double arrows
    const currentDate2 = new Date(selectedDate);
    const currentYear = currentDate2.getFullYear(); 
    const prevYear = new Date(currentDate2.setFullYear(currentYear - 1));
    const nextYear = new Date(currentDate2.setFullYear(currentYear + 1));

    if (e["action"] == 'prev') {
      updateDate( prevMonth ) 
    }
    if (e["action"] == 'next') {
      updateDate( nextMonth )  
    }
    if (e["action"] == 'prev2') {
      updateDate( prevYear ) 
    }
    if (e["action"] == 'next2') {
      updateDate( nextYear )  
    }
  }

  return (
    <DataContext.Provider value={{ data, updateData, selectedDate, updateDate, today, handleCalNav }}>
      {children}
    </DataContext.Provider>
  );
}