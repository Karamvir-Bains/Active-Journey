import { useState } from 'react';
import { formatDate } from '../../helpers/data';
export default function SocialNotification(props) {
  const [message, setMessage] = useState('In the past 90 days, here is a list of days where you logged a rating of less than 3/10 for social interactions:');

  let count = 0
  const social = props.metrics.user_metric_data.map((item, idx) => {
    if (item.metric_value < 3) {
      count++
      return (
        <li key={idx}>{formatDate(new Date(item.date))}</li>
      )
    }
  });

  return (
    <section className='mb-8'>
      <h3 className='font-bold text-xl mb-4'>Social Interactions</h3>
      <p className='mb-4'>Social interactions are crticial for mental and physical health. As the Harvard Women’s Health Watch reported, “Dozens of studies have shown that people who have satisfying relationships with family, friends and their community are happier, have fewer health problems, and live longer.” <br /><small>(<a href="https://www.nytimes.com/2017/06/12/well/live/having-friends-is-good-for-you.html">Source: Social Interaction Is Critical for Mental and Physical Health, The New York Times</a> )</small></p>
      {count > 0 && 
        <div className="p-4 bg-blue-200 dark:bg-slate-800 bg-opacity-50 rounded-xl mb-4"> 
        {message} 
          <ul className='list-disc ml-4'>{social}</ul>
        </div>
      }

      {count === 0 && 
        <p className="p-4 bg-blue-200 dark:bg-slate-800 bg-opacity-50 rounded-xl mb-4">
          In the past 90 days, you have rated your social interactions 7/10 or more - Great job! You are a social butterfly!
        </p>
      }
    </section>
  )
}