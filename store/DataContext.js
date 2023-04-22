import React, { useState, useContext, useEffect } from "react";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const today = new Date();
  const [oldestDay, setOldestDay] = useState(new Date())
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(today);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/userData?date=${selectedDate.toLocaleString()}`);
      const { metrics } = await res.json();
      
      setData(metrics);
    }
    fetchData();
  }, [selectedDate]);


  useEffect(() => {
    async function getOldestDay() {
      const res = await fetch(`/api/oldestDay`);
      const { date } = await res.json();
      const localDate = new Date(date);
      const offset = localDate.getTimezoneOffset() * 60 * 1000;
      const adjustOffset = new Date(localDate.getTime() + offset);
      setOldestDay(adjustOffset);
    }
    getOldestDay();
  }, []);

  function updateData(data) {
    setData(data);
  }

  function updateDate(date) {
    setSelectedDate(date);
  }

  function handleTodayClick() {
    setActiveStartDate(today);
    setSelectedDate(today);
  }
  
  function handleActiveStartDateChange(newActiveStartDate) {
    setActiveStartDate(newActiveStartDate);
  }

  return (
    <DataContext.Provider 
    value={{ 
      data, 
      updateData, 
      selectedDate, 
      updateDate, 
      today,
      oldestDay,
      activeStartDate,
      handleTodayClick,
      handleActiveStartDateChange,
    }}>
      {children}
    </DataContext.Provider>
  );
}