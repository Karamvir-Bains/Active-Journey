import { useState } from "react";
import { Responsive, WidthProvider } from  "react-grid-layout"
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import ActivityGoal from "../widgets/_activity-goal";
import Calendar from "../widgets/_calendar";
import DailyWater from "../widgets/_daily-water";
import Overview from "../widgets/_overview";
import Nutrition from "../widgets/_nutrition";
import Widget from "../widgets/_widget";
const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Dashboard(props) {
  console.log('index entries', props.entries);
  return(
    <div className="relative bg-blue">
      <ResponsiveGridLayout
        className="layout"
        layouts={props.layout}
        breakpoints={{
          lg: 1024,
          sm: 0
        }}
        cols={{
          lg: 12,
          sm: 6
        }}
        onLayoutChange={(e, f) => props.onLayoutChange(e, f)}
        isDraggable={true}
        isRearrangeable={true}
        isResizable={false}
      >
        <div key="overview">
          <Overview entries={props.entries} water={props.water} />
        </div>
        <div key="calendar">
          <Calendar />
        </div>
        <div key="dailyWater">
          <DailyWater />
        </div>
        <div key="activityGoal">
          <ActivityGoal />
        </div>
        <div key="a">
          <Widget title="Weekly Stress" />
        </div>
        <div key="b">
          <Widget title="Average Mood" />
        </div>
        <div key="c">
          <Widget title="Widget Title" />
        </div>
        <div key="d">
          <Widget title="Widget Title" />
        </div>
        <div key="e">
          <Nutrition entries={props.entries} />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

