import { Responsive, WidthProvider } from  "react-grid-layout"
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import Overview from "../widgets/Overview";
import Calendar from "../widgets/Calendar";
import DailyWater from "../widgets/DailyWater";
import Nutrition from "../widgets/Nutrition";
import AvgMood from "../widgets/AvgMood";
import Sleep from "../widgets/Sleep";
import Alcohol from "../widgets/Alcohol";
import Social from "../widgets/Social";
import RadialChart from "../widgets/ActivityGoal";
import CircleChart from "../widgets/WeeklyStress";

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
          <RadialChart />
        </div>
        <div key="stress">
          <CircleChart 
            stress={props.stress} 
            entries={props.entries} 
            title="Stress" 
            desc="Past 7 days" />
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

