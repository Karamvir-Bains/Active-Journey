import { useState } from 'react';
export default function SocialNotification(props) {
  const social = props.metrics.user_metric_data.map(item => item.metric_value);
  const count = social.filter(item => Number(item) > 5).length;

  const [message, setMessage] = useState(`In the past 90 days, you logged ${count} days with a rating of less than 5/10 for social interactions.`);

  return (
    <section className="rounded-lg bg-white dark:bg-slate-800 dark:text-white  shadow-sm w-full h-full p-4 md:p-6 text-center">
      <h3 className='font-bold text-lg md:text-xl mb-4'>Social Interactions</h3>
      {count > 0 && 
        <div className="p-4 bg-blue-200 dark:bg-slate-800 bg-opacity-50 rounded-xl mb-4"> 
        {message}
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