export default function Button(props) {
  return (
    <span 
    onClick={props.onClick}
      className={`${props.classes} hover:cursor-pointer`}
    >
        {props.range}
    </span>
  )
};