import { useState } from 'react';
export default function WaterNotification(props) {
  const waterDays = props.metrics.user_metric_data.map((item) => {
    item.metric_value;
  });
  const count = waterDays.filter(item => item > (8 * 250)).length
  const [message, setMessage] = useState(`In the past 90 days, you have logged ${count} days with less than 6 cups of water`);

  return (
    <section className='mb-8'>
      <h3 className='font-bold text-md md:text-xl mb-2 md:mb-4'>Water</h3>      
        {count > 0 &&
          <p className="p-4 bg-blue-200 dark:bg-slate-800 bg-opacity-50 rounded-xl mb-4">
            {message}
          </p>
        }
        {count === 0 && 
          <p className="p-4 bg-blue-200 dark:bg-slate-800 bg-opacity-50 rounded-xl mb-4">Great Job! In the past 90 days, you have met the daily recommended amount of 8 cups of water per day.</p>
        }
      
    </section>
  )
}