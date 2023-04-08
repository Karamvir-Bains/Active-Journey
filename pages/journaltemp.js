import React, { useState } from 'react';
import { faTimes }from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InputComponent from '../components/journal/InputComponent'
import ScaleComponent from '../components/journal/ScaleComponent';

export default function Journaltemp({metrics: initialMetrics}) {
  const [metrics, setMetrics] = useState(initialMetrics);

  const metricList = metrics.data.map(metric => {
  if (metric.property === "input") {
    return (
      <InputComponent
        key={metric.id}
        name={metric.name}
        value={metric.journals.metric_value}
        handleChange={event => handleChange(metric.id, event.target.value)}
        unit={metric.unit}
      />
    );
  } else if (metric.property === "scale") {
    return (
      <ScaleComponent
        key={metric.id}
        name={metric.name}
        value={metric.journals.metric_value}
        handleChange={event => handleChange(metric.id, event.target.value)}
      />
    );
    }
  });

  function handleChange(metricId, newValue) {
    console.log(newValue);
    const updatedMetricsData = metrics.data.map(metric => {
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
    setMetrics({ ...metrics, data: updatedMetricsData });
  }

  return (
    <div style={{ height: '100vh', width: '100vw', background: 'grey' }}>
      <section className="absolute z-20 left-0 flex flex-col justify-center content-center right-0 mx-auto h-auto bg-white rounded-lg w-1/2 py-6 px-10 shadow-md">
        <h3>Today</h3>
        <div className="flex justify-end w-full mb-5">
          <div className="h-5 w-5 text-gray-500">
              <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        
        <form className="w-full">
          {metricList}

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button className="shadow bg-blue-800 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                Save Journal
              </button>
            </div>
          </div>
          
        </form>
      </section>
    </div>
  )
}

export async function getServerSideProps() {
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
        name: "Log your activity:",
        unit: "minutes",
        property: "input",
        journals: {
          id: 1,
          user_id: 1,
          metric_id: 2,
          date: '2022-03-30T15:23:00.000Z',
          metric_value: 30,
        },
      },
      {
        id: 3,
        name: "Rate your sleep last night:",
        property: "scale",
        journals: {
          id: 1,
          user_id: 1,
          metric_id: 3,
          date: '2022-03-30T15:23:00.000Z',
          metric_value: 7,
        },
      },
    ]
  };

  return {
    props : { metrics }
  }
}