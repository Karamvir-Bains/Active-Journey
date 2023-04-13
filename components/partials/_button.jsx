import { use, useState } from "react";

export default function Button(props) {
  const [isActive, setIsActive] = useState(props.initial);

  const handleClick = (event, range) => {
    setIsActive(true);
    props.onClick(range);
  }

  return (
    <span onClick={() => handleClick(props.range)} className={`${isActive ? 'text-blue-700' : 'text-gray-900' } px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white`}>
      {props.range}
    </span>
  )
};