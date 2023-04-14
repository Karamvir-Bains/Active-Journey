import { useState, useEffect } from 'react';
import { faTimes }from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import InputComponent from './InputComponent'
import ScaleComponent from './ScaleComponent';
import CalendarIcon from './CalendarIcon';
import { useData } from "../DataContext";

export default function Journal(props) {
  const { data, updateData, selectedDate, updateDate } = useData();

  //Render a list of metrics
  const metricList = data.map((metric, index) => {
    const { id, name, property, unit, user_metric_data } = metric;
    // Selecting current day data from user_metric_data 
    const value = user_metric_data[data[index].user_metric_data.length - 1].metric_value;

    // Render InputComponent if property is 'input'
    if (property === "input") {
      return (
        <InputComponent
          key={id}
          name={name}
          value={value}
          handleChange={event => handleChange(metric.id, event.target.value)}
          unit={unit}
        />
      );
    // Render ScaleComponent if property is 'scale'
    } else if (property === "scale") {
      return (
        <ScaleComponent
          key={id}
          name={name}
          value={value}
          handleChange={event => handleChange(id, event.target.value)}
        />
      );
    }
    // Render nothing if the property is not valid
    return null;
  });

  function handleChange(metricId, newValue) {
    // Sets the value to 0 if the input has no number
    let value = newValue;
    if (newValue === "") value = 0;
  
    const parsedValue = parseFloat(value);
  
    const updatedData = data.map(metric => {
      if (metric.id === metricId) {
        // lastMetricData is always the current selected day
        const [lastMetricData] = metric.user_metric_data.slice(-1);

        // Create a new object with the updated metric value
        const updatedLastMetricValue = {
          ...lastMetricData,
          metric_value: parsedValue
        };

        // Replace the last object in the user_metric_data array with the updated object
        const updatedUserMetricData = [
          ...metric.user_metric_data.slice(0, -1),
          updatedLastMetricValue
        ];
        return {
          ...metric,
          user_metric_data: updatedUserMetricData,
        };
      }
      return metric;
    });
    updateData(updatedData);
  }
  
  

  // This function takes a date as input and returns a string representing the date text to be displayed
  const getDateText = date => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  };

  const handleClose = () => {
    props.onClose();
  };

  return(
    <section style={{height: "600px"}} className="flex flex-col justify-center bg-white rounded-lg py-6 px-10 shadow-md">
      <div id="journal-header" className='flex justify-between'>
        <div className='flex'>
          <h3 className='font-bold mr-2 mb-5 whitespace-nowrap'>{getDateText(selectedDate)}</h3>
          <DatePicker
            selected={selectedDate}
            onChange={date => updateDate(date)}
            showMonthDropdown={true}
            showYearDropdown={true}
            // customInput={<CalendarIcon />}
            withPortal={true}
          />
        </div>

        <div className="text-gray-500 cursor-pointer" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} style={{height: "20px"}} />
        </div>
      </div>

      <div id="journal-entries" className="w-full h-4/5 overflow-y-scroll scrollbar-hidden mb-5 pr-9">
        {metricList}
      </div>

      <div id="journal-footer" className='flex justify-end'>
        <button
          className="shadow bg-blue-800 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleClose}>
          Save Journal
        </button>
      </div>
    </section>
  );
}