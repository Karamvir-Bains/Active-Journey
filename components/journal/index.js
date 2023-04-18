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
    <div className='overflow-y-scroll md:overflow-y-hidden fixed w-full h-full bg-slate-500 bg-opacity-25 md:ml-[45px] lg:ml-[0px]'>
      <div className='absolute top-[3vh] left-0 right-0 mx-auto w-full h-full w-[95vw] sm:w-[75vw] md:w-[70vw] lg:w-[40vw] 2xl:w-[30vw]'>
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
                  <button className='text-gray-400 hover:text-red-600 cursor-pointer w-[24px] h-[24px]' onClick={handleClose}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
            </div>

            <div
              id='journal-entries'
              className='overflow-y-hidden sm:overflow-y-scroll scrollbar-hidden my-6 md:h-[76vh] lg:h-[68vh] lg:pr-[15px]'
            >
              <div className="md:w-[20vw] mx-auto">
                {showCal &&
                  <div className='flex flex-col'>
                    <CalendarWidget
                      className="bg-white dark:bg-slate-900 dark:text-white border-t"
                      value={selectedDate}
                      onChange={(newDay) => updateDate(newDay)}
                      maxDate={today}
                      activeStartDate={activeStartDate}
                      onActiveStartDateChange={(e) => handleActiveStartDateChange(e.activeStartDate)}
                    />
                    <button className='border-b border-t border-gray-300 mb-4 md:mb-[0px]' onClick={() => setShowCal(!showCal)}>^</button>
                  </div>
                }
              </div>
              {metricList}
            </div>

            <div id='journal-footer' className='flex justify-start mb-3 pb-20 md:pb-[0px]'>
              <button
                className='shadow bg-blue-800 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white dark:text-white font-bold py-2 px-4 rounded'
                type='button'
                onClick={handleSave}
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
