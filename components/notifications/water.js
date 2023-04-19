import { useState } from 'react';
import { formatDate } from '../../helpers/data';
export default function WaterNotification(props) {
  const [message, setMessage] = useState('In the past 90 days, here is a list of days where you logged less than 6 cups of water:');

  let count = 0;
  const waterDays = props.metrics.user_metric_data.map((item, idx) => {
    if (item.metric_value < 1500) {
      count ++;
      return (
        <li key={idx}>{formatDate(new Date(item.date))}</li>
      )
    }
  });

  return (
    <section className='mb-8'>
      <h3 className='font-bold text-xl mb-4'>Water</h3>
      <p className='mb-4'>The National Academy of Medicine suggests an adequate intake of daily fluids of about 13 cups and 9 cups for healthy men and women, respectively, with 1 cup equaling 8 ounces. (250mL) <br /><small>(<a href="https://www.hsph.harvard.edu/nutritionsource/water/#:~:text=General%20recommendations,exposed%20to%20very%20warm%20climates.">Source: School of Public Health, Harvard EDU</a> )</small></p>
      
        { count > 0 &&
          <p className="p-4 bg-blue-200 dark:bg-slate-800 bg-opacity-50 rounded-xl mb-4">
            {message}
            <ul className='list-disc ml-4'>{waterDays}</ul>
          </p>
        }
        { count === 0 && 
          <p className="p-4 bg-blue-200 dark:bg-slate-800 bg-opacity-50 rounded-xl mb-4">Great Job! In the past 90 days, you have logged more than 6 cups of water per day.</p>
        }
      
    </section>
  )
}