import { useState, useEffect } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InputComponent from './InputComponent'
import ScaleComponent from './ScaleComponent'
import CalendarIcon from './CalendarIcon'
import CalendarWidget from 'react-calendar'
import { convertDateToISO, getDateText, formatDate } from '../../helpers/data';
import { useData } from '../../store/DataContext'

export default function Journal (props) {
  const { 
    data,
    updateData,
    selectedDate,
    updateDate,
    today,
    activeStartDate,
    handleTodayClick,
    handleActiveStartDateChange,
  } = useData();
  const [showCal, setShowCal] = useState(false);

  //Render a list of metrics
  const metricList = data.map((metric, index) => {
    const { id, name, property, unit, user_metric_data } = metric;

    // user_metric_data id and value
    const userMetricDataId = user_metric_data[data[index].user_metric_data.length - 1].id;
    const value = user_metric_data[data[index].user_metric_data.length - 1].metric_value;

    // Render InputComponent if property is 'input'
    if (property === "input") {
      return (
        <InputComponent
          key={id}
          name={name}
          value={value}
          handleChange={event => handleChange(id, userMetricDataId, event.target.value)}
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
          handleChange={event => handleChange(id, userMetricDataId, event.target.value)}
        />
      );
    }
    // Render nothing if the property is not valid
    return null;
  });

  function handleChange(metricId, userMetricDataId, newValue) {
    // If newValue is not a number set to 0, else parseFloat the newValue
    const parsedValue = isNaN(parseFloat(newValue)) ? 0 : parseFloat(newValue);
  
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
    handleSave(userMetricDataId, parsedValue);
  }


  async function handleSave(userMetricDataId, newValue) {
    const data = { userMetricDataId, newValue };
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

  const handleClose = () => {
    props.onClose()
  }

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden md:p-4 bg-slate-500 dark:bg-slate-800 bg-opacity-75 dark:bg-opacity-80'>
      <div className='absolute left-0 right-0 mx-auto w-full h-full md:w-[75%] lg:w-[800px] overflow-scroll'>
        <div className='relative sm:pl-[75px] md:pl-0'>
          <section className='flex flex-col justify-center bg-white dark:bg-slate-800 dark:text-white rounded-lg py-6 px-10 shadow-md'>
            <div id='journal-header' className='flex justify-between w-full border-b-2 pb-4'>
                <div className="w-[33%] flex">
                  <button
                    onClick={handleTodayClick}
                    className='flex flex-col justify-center content-center rounded-full text-blue-900 dark:text-white bg-blue-100 dark:bg-blue-800 hover:bg-blue-50 dark:hover:bg-blue-700 py-1 px-5 mr-auto'
                  >
                    Today
                  </button>
                </div>
                <h3 className='w-[33%] text-blue-950 dark:text-white text-lg text-center font-bold whitespace-nowrap self-center'>
                  {formatDate(selectedDate)}
                </h3>
                <div className='w-[33%] text-right flex justify-end content-center flex-wrap-reverse'>
                  <CalendarIcon
                    showCal={showCal}
                    setShowCal={setShowCal}
                  />
                  <button className='text-gray-400 hover:text-red-600  cursor-pointer w-[24px] h-[24px]' onClick={handleClose}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
            </div>
            <div className="sm:w-[400px] mx-auto">
                {showCal && 
                  <CalendarWidget
                    className="bg-white dark:bg-slate-900 dark:text-white  rounded-lg p-2"
                    value={selectedDate}
                    onChange={(newDay) => updateDate(newDay)}
                    maxDate={today}
                    activeStartDate={activeStartDate}
                    onActiveStartDateChange={(e) => handleActiveStartDateChange(e.activeStartDate)}
                  />
                }
            </div>
                

            <div
              id='journal-entries'
              className='w-full h-4/5 overflow-y-scroll scrollbar-hidden my-6'
            >
              {metricList}
            </div>

            <div id='journal-footer' className='flex justify-start mb-16'>
              <button
                className='shadow bg-blue-800 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white dark:text-white font-bold py-2 px-4 rounded'
                type='button'
                onClick={() => {
                  handleSave()
                  props.onClose()
                }}
              >
                Save Journal
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
