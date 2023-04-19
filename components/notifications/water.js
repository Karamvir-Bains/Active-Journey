import { useState } from 'react';
import { formatDate } from '../../helpers/data';
export default function WaterNotification(props) {
  console.log(props.metrics.user_metric_data);
  const [message, setMessage] = useState('In the past 90 days, here is a list of days where you logged less than 6 cups of water:');

  const waterDays = props.metrics.user_metric_data.map((item, idx) => {
    if (item.metric_value < 1500) {
      return (
        <li key="idx">{formatDate(new Date(item.date))}</li>
      )
    }
  });

  return (
    <section>
      <h3 className='font-bold text-xl'>Water</h3>
      <p className='mb-4'>The National Academy of Medicine suggests an adequate intake of daily fluids of about 13 cups and 9 cups for healthy men and women, respectively, with 1 cup equaling 8 ounces. (250mL) <br />(<a href="https://www.hsph.harvard.edu/nutritionsource/water/#:~:text=General%20recommendations,exposed%20to%20very%20warm%20climates.">Source: School of Public Health, Harvard EDU</a> )</p>
      <div className="p-4 bg-blue-200 bg-opacity-50 rounded-xl mb-4"> 
      {message}
        <ul className='list-disc ml-4'>{waterDays}</ul>
      </div>
    </section>
  )
}