import React, { useState } from 'react';
import { faTimes }from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InputComponent from '../components/journal/InputComponent'
import ScaleComponent from '../components/journal/ScaleComponent';

export default function Journaltemp({metrics}) {
  const [data, setData] = useState(metrics.data);
  const [selectedDate, setSelectedDate] = useState(new Date(2023, 3, 5));

  //Render a list of metrics
  const metricList = data.map(metric => {
    const { id, name, property, unit, journals } = metric;
    const value = journals?.metric_value;

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
    const updatedData = data.map(metric => {
      if (metric.id === metricId) {
        return {
          ...metric,
          journals: {
            ...metric.journals,
            metric_value: newValue
          }
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

  const headerText = getDateText(selectedDate);

  return (
    <div className="h-screen w-screen bg-gray-300 flex items-center justify-center">
      <section className="flex flex-col justify-center bg-white rounded-lg w-1/3 h-4/5 py-6 px-10 shadow-md">
        
        <div id="journal-header">
          <h3 className='font-bold'>{headerText}</h3>
          <div className="flex justify-end w-full mb-5">
            <div className="h-5 w-5 text-gray-500">
                <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        </div>

        <div id="journal-entries" className="w-full overflow-y-scroll mb-4 pr-9">
          {metricList}
        </div>

        <div id="journal-footer" className='flex justify-end'>
          <button className="shadow bg-blue-800 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
            Save Journal
          </button>
        </div>

      </section>
    </div>
  )
}

export async function getServerSideProps() {

  // // Fetch all metrics and their associated journals
  // const metrics = await prisma.metric.findMany({
  //   include: {
  //     journals: true,
  //   },
  // });

  // Temporary example metric data
  const metrics = {
    data: [
      {
        id: 1,
        name: "How much sleep did you get last night?",
        unit: "hours",
        property: "input",
        journals: {
          id: 1,
          user_id: 1,
          metric_id: 1,
          date: '2022-03-30T15:23:00.000Z',
          metric_value: 8,
        },
      },
      {
        id: 2,
        name: "Rate your sleep last night:",
        property: "scale",
        journals: {},
      },
      {
        id: 3,
        name: "Log your exercise for today:",
        unit: "minutes",
        property: "input",
        journals: {},
      },
      {
        id: 4,
        name: "Rate your energy levels for today:",
        unit: "minutes",
        property: "input",
        journals: {
          id: 1,
          user_id: 1,
          metric_id: 4,
          date: '2022-03-30T15:23:00.000Z',
          metric_value: 30,
        },
      },
      {
        id: 5,
        name: "Rate your stress levels for today:",
        unit: "steps",
        property: "scale",
        journals: {
          id: 1,
          user_id: 1,
          metric_id: 5,
          date: '2022-03-30T15:23:00.000Z',
          metric_value: 3,
        },
      },
      {
        id: 6,
        name: "How many cups of water did you drink today?",
        unit: "cups",
        property: "input",
        journals: {
          id: 1,
          user_id: 1,
          metric_id: 6,
          date: '2022-03-31T15:23:00.000Z',
          metric_value: 6,
        },
      },
      {
        id: 7,
        name: "How many steps did you take today?",
        unit: "steps",
        property: "input",
        journals: {
          id: 1,
          user_id: 1,
          metric_id: 7,
          date: '2022-03-30T15:23:00.000Z',
          metric_value: 10000,
        },
      },
      {
        id: 8,
        name: "Rate your mood today:",
        property: "scale",
        journals: {
          id: 1,
          user_id: 1,
          metric_id: 8,
          date: '2022-03-31T15:23:00.000Z',
          metric_value: 8,
        },
      }, 
    ]
  };

  return {
    props : { metrics }
  }
}