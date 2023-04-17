import Button from "./Button";

export default function ButtonGroup(props) {
  function setSelected(range) {
    props.onClick(range);
  }

  const buttons = props.ranges.map(rangeVal => {
    const selected = (rangeVal === props.rangeState);
    return (
      <Button 
        key={rangeVal}
        range={rangeVal}
        selected={selected}
        onClick={() => setSelected(rangeVal)}
      />
    );
  });

  return (
    <div className="inline-flex rounded-md shadow-sm border border-grey-200">
      {buttons}
    </div>
  )
};