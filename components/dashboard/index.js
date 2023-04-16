import { useState } from "react";
import { Responsive, WidthProvider } from  "react-grid-layout"
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import ActivityGoal from "../widgets/ActivityGoal";
import Calendar from "../widgets/Calendar";
import DailyWater from "../widgets/DailyWater";
import Overview from "../widgets/Overview";
import Nutrition from "../widgets/Nutrition";
import Widget from "../widgets/Widget";
import AvgMood from "../widgets/AvgMood";
import Journal from "../journal";
import { useApplicationData } from "../../hooks/useApplicationData";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Dashboard(props) {

  return (
    <div className="relative">
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
            today={props.today}
            handleSetDay={props.handleSetDay}
            handleCalNav={props.handleCalNav}
            journalOpen={props.journalOpen}
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
          <ActivityGoal />
        </div>
        <div key="stress">
          <Widget title="Stress" desc="Past 7 days" />
        </div>
        <div key="mood">
          <AvgMood mood={props.mood} />
        </div>
        <div key="sleep">
          <Widget title="Sleep Quality vs Hours" desc="Past 7 days" />
        </div>
        <div key="social">
          <Widget title="Quality of Social Interactions" desc="Past 30 days" />
        </div>
        <div key="alcohol">
          <Widget title="Alcohol Intake" desc="Past 7 days" />
        </div>
        <div key="nutrition">
          <Nutrition entries={props.entries} />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

