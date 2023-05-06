import RangeButton from "./RangeButton";

export default function ButtonGroup(props) {
  function setSelected(range) {
    props.onClick(range);
  }

  const buttons = props.ranges.map(rangeVal => {
    const selected = (rangeVal === props.rangeState);
    return (
      <RangeButton 
        key={rangeVal}
        range={rangeVal}
        selected={selected}
        onClick={() => setSelected(rangeVal)}
      />
    );
  });

  return (
    <div className="inline-flex rounded-md shadow-sm border dark:border-orange-900">
      {buttons}
    </div>
  )
};