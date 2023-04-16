import { useState, useEffect } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InputComponent from './InputComponent'
import ScaleComponent from './ScaleComponent'
import CalendarIcon from './CalendarIcon'
import CalendarWidget from 'react-calendar'
import { convertDateToISO, getDateText, formatDate } from '../../helpers/data';

export default function Journal (props) {
  const [data, setData] = useState([])
  const [showCal, setShowCal] = useState(false);

  useEffect(() => {
    async function fetchData () {
      const date = new Date(props.day);
      const res = await fetch(
        `/api/userMetricData?date=${convertDateToISO(date)}`
      )
      const { metrics } = await res.json()
      setData(metrics)
    }
    fetchData();
  }, [props.day])

  // Render a list of metrics
  const metricList = data.map(metric => {
    const { id, name, property, unit, user_metric_data } = metric
    const value = user_metric_data[0]?.metric_value

    // Render InputComponent if property is 'input'
    if (property === 'input') {
      return (
        <InputComponent
          key={id}
          name={name}
          value={value}
          handleChange={event => handleChange(metric.id, event.target.value)}
          unit={unit}
        />
      )
      // Render ScaleComponent if property is 'scale'
    } else if (property === 'scale') {
      return (
        <ScaleComponent
          key={id}
          name={name}
          value={value}
          handleChange={event => handleChange(id, event.target.value)}
        />
      )
    }
    // Render nothing if the property is not valid
    return null
  })

  // Function to update the data when a metric value is changed
  function handleChange (metricId, newValue) {
    const parsedValue = parseFloat(newValue)
    const updatedData = data.map(metric => {
      if (metric.id === metricId) {
        return {
          ...metric,
          user_metric_data: [
            {
              ...metric.user_metric_data[0],
              metric_value: parsedValue
            }
          ]
        }
      }
      return metric
    })
    setData(updatedData)
  }

  const handleSave = async () => {
    try {
      const res = await fetch('/api/userMetricData', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await res.json()
      console.log(result);
      handleClose()
    } catch (error) {
      console.error(error)
    }
  }

  const handleClose = () => {
    props.onClose()
  }

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden md:p-4'>
      <div className='absolute left-0 right-0 mx-auto w-full h-full md:w-[75%] lg:w-[800px] overflow-scroll'>
        <div className='relative sm:pl-[75px] md:pl-0'>
          <section className='flex flex-col justify-center bg-white dark:bg-slate-800 dark:text-white rounded-lg py-6 px-10 shadow-md'>
            <div id='journal-header' className='flex justify-between w-full border-b-2 pb-4'>
                <div className="w-[33%] flex">
                  <button
                    onClick={() => props.setDay(props.today)}
                    className='flex flex-col justify-center content-center rounded-full text-blue-900 dark:text-white bg-blue-100 dark:bg-blue-800 hover:bg-blue-50 dark:hover:bg-blue-700 py-1 px-5 mr-auto'
                  >
                    Today
                  </button>
                </div>
                <h3 className='w-[33%] text-blue-950 dark:text-white text-lg text-center font-bold whitespace-nowrap self-center'>
                  {formatDate(props.day)}
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
                {/* Replacing this with the React Calendar
                <DatePicker
                  selected={props.day}
                  onChange={(date) => props.setDay(date)}
                  showMonthDropdown={true}
                  showYearDropdown={true}
                  customInput={<CalendarIcon />}
                  withPortal={true}
                />
                */}
                {showCal && 
                  <CalendarWidget
                    className="bg-white dark:bg-slate-900 dark:text-white  rounded-lg p-2"
                    value={new Date(props.day)}
                    activeStartDate={new Date(props.day)}
                    onChange={(newDay) => props.setDay(newDay)}
                    maxDate={props.today}
                    onActiveStartDateChange={(e) => {props.handleCalNav(e)}}
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
