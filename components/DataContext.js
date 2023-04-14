import React, { useState, useContext, useEffect } from "react";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
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

  async function updateData(data) {
    setData(data);
    try {
      const res = await fetch('/api/userData', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  function updateDate(date) {
    setSelectedDate(date);
  }

  return (
    <DataContext.Provider value={{ data, updateData, selectedDate, updateDate }}>
      {children}
    </DataContext.Provider>
  );
}
