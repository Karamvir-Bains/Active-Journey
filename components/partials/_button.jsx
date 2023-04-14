export default function Button(props) {
  return (
    <span 
    onClick={props.onClick}
      className={`${props.classes} px-3 py-1 text-xs font-medium bg-white border-gray-200 hover:bg-gray-100 hover:bg-gray-100 dark:focus:text-white dark:focus:ring-blue-500 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 focus:z-10 hover:text-blue-700 hover:cursor-pointer`}
    >
        {props.range}
    </span>
  )
};