import { useState } from "react";
import { Responsive, WidthProvider } from  "react-grid-layout"
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import Calendar from "../widgets/_calendar";
import DailyWater from "../widgets/_daily-water";
import Overview from "../widgets/_overview";
import Nutrition from "../widgets/_nutrition";
import Widget from "../widgets/_widget";
import AvgMood from "../widgets/_avg-mood";
import Sleep from "../widgets/_sleep";
import Alcohol from "../widgets/_alcohol";
import Social from "../widgets/_social";
import WeeklyStress from "../widgets/WeeklyStress";
import RadialChart from "../widgets/_activity-goal";
import CircleChart from "../widgets/_weekly-stress"
const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Dashboard(props) {
  //console.log(props)
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
            toggleJournal={props.toggleJournal}
          />
        </div>
        <div key="dailyWater">
          <DailyWater
            day={props.day}
            dailyWater={props.dailyWater}
          />
        </div>
        <div key="activityGoal">
          <RadialChart />
        </div>
        <div key="stress">
          <WeeklyStress 
            day={props.day}
            stress={props.stress}
          />
          {/* <CircleChart 
            stress={props.stress} 
            entries={props.entries} 
            title="Stress" 
            desc="Past 7 days" /> */}
        </div>
        <div key="mood">
          <AvgMood 
            mood={props.mood} 
            entries={props.entries}/>
        </div>
        <div key="sleep">
          <Sleep 
            sleep={props.sleep} 
            sleepQuality={props.sleepQuality} 
            entries={props.entries}
            title="Sleep Quality vs Hours" 
            desc="Past 7 days" />
        </div>
        <div key="social">
          <Social 
            entries={props.entries} 
            title="Quality of Social Interactions" 
            desc="Past 30 days" />
        </div>
        <div key="alcohol">
          <Alcohol 
            entries={props.entries} 
            title="Alcohol Intake" 
            desc="Past 7 days" />
        </div>
        <div key="nutrition">
          <Nutrition 
            entries={props.entries} />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

