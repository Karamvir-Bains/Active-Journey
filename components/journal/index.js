import { useState, useEffect } from 'react';
import { faTimes }from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import InputComponent from './InputComponent'
import ScaleComponent from './ScaleComponent';
import CalendarIcon from './CalendarIcon';

export default function Journal(props) {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/userMetricData?date=${selectedDate.toISOString()}`);
      const { metrics } = await res.json();
      setData(metrics);
    }
    fetchData();
  }, [selectedDate]);

  //Render a list of metrics
  const metricList = data.map(metric => {
    const { id, name, property, unit, user_metric_data } = metric;
    const value = user_metric_data[0]?.metric_value;

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

  // Function to update the data when a metric value is changed
  function handleChange(metricId, newValue) {
    const parsedValue = parseFloat(newValue)
    const updatedData = data.map(metric => {
      if (metric.id === metricId) {
        return {
          ...metric,
          user_metric_data: [{
            ...metric.user_metric_data[0],
            metric_value: parsedValue
          }]
        };
      }
      return metric;
    });
    setData(updatedData);
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

  const handleSave = async () => {
    try {
      const res = await fetch('/api/userMetricData', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const result = await res.json();
      console.log(result);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    props.onClose();
  };

  return(
    <section className="flex flex-col justify-center bg-white rounded-lg w-1/3 h-4/5 py-6 px-10 shadow-md">
      <div id="journal-header" className='flex justify-between'>
        <div className='flex'>
          <h3 className='font-bold mr-2 mb-5 whitespace-nowrap'>{getDateText(selectedDate)}</h3>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            showMonthDropdown={true}
            showYearDropdown={true}
            customInput={<CalendarIcon />}
            withPortal={true}
          />
        </div>

        <div className="text-gray-500 cursor-pointer" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} className="fa-lg" />
        </div>
      </div>

      <div id="journal-entries" className="w-full h-4/5 overflow-y-scroll scrollbar-hidden mb-5 pr-9">
        {metricList}
      </div>

      <div id="journal-footer" className='flex justify-end'>
        <button
          className="shadow bg-blue-800 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleSave}>
          Save Journal
        </button>
      </div>
    </section>
  );
}