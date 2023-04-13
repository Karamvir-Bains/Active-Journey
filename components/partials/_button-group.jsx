import { useState } from "react";
import Button from "./_button";

export default function ButtonGroup(props) {
  function setSelected(range) {
    // TO DO set all other buttons to inactive
    props.onClick(range);
  }

  return (
    <div className="inline-flex rounded-md shadow-sm">
      <Button 
        onClick={() => setSelected(props.ranges[0])} 
        // onClick={() => props.onClick(props.ranges[0])} 
        range={props.ranges[0]} 
        initial={true} 
      />
      <Button 
        onClick={() => props.onClick(props.ranges[1])} 
        range={props.ranges[1]} 
        initial={false} 
      />
      <span onClick={() => setSelected(props.ranges[1])} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
        {props.ranges[1]}
      </span>
      <span onClick={() => setSelected(props.ranges[2])} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
        {props.ranges[2]}
      </span>
    </div>
  )
};