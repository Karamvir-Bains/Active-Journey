import { use, useState } from "react";

export default function Button(props) {
  const [isActive, setIsActive] = useState(props.initial || false);

  const handleClick = (event, range) => {
    setIsActive(true);
    props.onClick(range);
  }

  return (
    <span 
      onClick={() => handleClick(props.range)} 
      className={`${isActive ? 'text-blue-700' : 'text-gray-900' } ${props.classes}`}
    >
        {props.range}
    </span>
  )
};