import React, { useState, useContext, useEffect } from "react";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const today = new Date();
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
      activeStartDate,
      handleTodayClick,
      handleActiveStartDateChange,
    }}>
      {children}
    </DataContext.Provider>
  );
}