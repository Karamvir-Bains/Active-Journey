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
import AvgMood from "../widgets/_avg-mood";
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
        isDraggable={true}
        isRearrangeable={true}
        isResizable={false}
      >
        <div key="overview">
          <Overview 
            entries={props.entries}
            water={props.water}
            sleep={props.sleep} 
            energy={props.energy}
            mood={props.mood}
          />
        </div>
        <div key="calendar">
          <Calendar
            day={props.day}
            setDay={props.setDay}
          />
        </div>
        <div key="dailyWater">
          <DailyWater
            day={props.day}
            dailyWater={props.dailyWater}
          />
        </div>
        <div key="activityGoal">
          <ActivityGoal />
        </div>
        <div key="a">
          <Widget title="Stress" desc="Past 7 days" />
        </div>
        <div key="b">
          <AvgMood mood={props.mood} />
        </div>
        <div key="c">
          <Widget title="Sleep Quality vs Hours" desc="Past 7 days" />
        </div>
        <div key="d">
          <Widget title="Quality of Social Interactions" desc="Past 30 days" />
        </div>
        <div key="d">
          <Widget title="Alcohol Intake" desc="Past 7 days" />
        </div>
        <div key="e">
          <Nutrition entries={props.entries} />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

