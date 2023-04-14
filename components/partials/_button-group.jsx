import { useState } from "react";
import Button from "./_button";

export default function ButtonGroup(props) {
  const [isActive, setIsActive] = useState(null);

  function setSelected(range) {
    // TO DO set all other buttons to inactive
    setIsActive(range);
    props.onClick(range);
  }

  return (
    <div className="inline-flex rounded-md shadow-sm">
      <Button 
        onClick={() => setSelected(props.ranges[0])} 
        range={props.ranges[0]} 
        classes={`${ isActive ? 'text-blue-700' : 'text-gray-900' } border rounded-l-lg`}
      />
      <Button 
        onClick={() => setSelected(props.ranges[1])} 
        range={props.ranges[1]}  
        classes={`${ isActive ? 'text-blue-700' : 'text-gray-900' } border-t border-b border-gray-200`}
      />
      <Button
        onClick={() => props.onClick(props.ranges[2])} 
        range={props.ranges[2]}  
        classes={`${ isActive ? 'text-blue-700' : 'text-gray-900' } border rounded-r-md`}
      />
    </div>
  )
};