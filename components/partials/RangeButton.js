import classNames from "classnames"

export default function Button(props) {
  let buttonClass = classNames('', {
    'text-blue-700 bg-gray-100 dark:bg-gray-950 dark:text-orange-500' : props.selected,
    'text-gray-900  dark:text-white' : !props.selected
  });

  return (
    <span 
      onClick={props.onClick}
      className={`button px-3 py-1 text-xs font-medium rounded-md border-gray-200 hover:bg-gray-100 dark:focus:text-white dark:focus:ring-blue-500 dark:hover:text-orange-500 dark:hover:border-orange-500 dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 focus:z-10 hover:text-blue-700 hover:cursor-pointer ${buttonClass}`}
    >
        {props.range}
    </span>
  )
};