import { useState } from "react";
import { Responsive, WidthProvider } from  "react-grid-layout"
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import ActivityGoal from "../widgets/_activity-goal";
import Calendar from "../widgets/_calendar";
import DailyWater from "../widgets/_daily-water";
import Overview from "../widgets/_overview";
import Widget from "../widgets/_widget";
const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Dashboard(props) {
  return (
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
        onLayoutChange={(e, layoutsObj) => props.onLayoutChange(layoutsObj)}
      >
        <div key="overview">
          <Overview />
        </div>
        <div key="calendar">
          <Calendar
            day={props.day}
            setDay={props.setDay}
          />
        </div>
        <div key="dailyWater">
          <DailyWater
            dailyWater={props.dailyWater}
          />
        </div>
        <div key="activityGoal">
          <ActivityGoal />
        </div>
        <div key="a">
          <Widget />
        </div>
        <div key="b">
          <Widget />
        </div>
        <div key="c">
          <Widget />
        </div>
        <div key="d">
          <Widget />
        </div>
        <div key="e">
          <Widget />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

