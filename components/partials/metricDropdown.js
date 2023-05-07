export default function MetricDropdown(props) {
  function setSelected(range) {
    props.onClick(range);
  }

  // const buttons = props.metrics.map(rangeVal => {
  //   const selected = (rangeVal === props.rangeState);
  //   return (
  //     <RangeButton 
  //       key={rangeVal}
  //       range={rangeVal}
  //       selected={selected}
  //       onClick={() => setSelected(rangeVal)}
  //     />
  //   );
  // });

  return (
    <div className="inline-flex rounded-md shadow-sm border dark:border-orange-900">
     
    </div>
  )
};