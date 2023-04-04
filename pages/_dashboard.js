import { Responsive, WidthProvider } from  "react-grid-layout"
const ResponsiveGridLayout = WidthProvider(Responsive);
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import ActivityGoal from "./widgets/_activity-goal";
import Calendar from "./widgets/_calendar";
import DailyWater from "./widgets/_daily-water";
import Overview from "./widgets/_overview";
import Widget from "./widgets/_widget";

export default function Dashboard() {
  const layouts = {
    lg: [
      { i: "overview", x: 0, y: 0, w: 8, h: 2, static: true},
      { i: "calendar", x: 9, y: 0, w: 4, h: 2, static: true},
      { i: "dailyWater", x: 0, y: 0, w: 3, h: 1.5},
      { i: "activityGoal", x: 3, y: 7, w: 3, h: 1.5},
      { i: "a", x: 6, y: 7, w: 3, h: 1.5},
      { i: "b", x: 9, y: 7, w: 3, h: 1.5},
      { i: "c", x: 0, y: 8.5, w: 3, h: 2},
      { i: "d", x: 3, y: 8.5, w: 3, h: 2},
      { i: "e", x: 6, y: 8.5, w: 6, h: 2}
    ],
    sm: [
      { i: "overview", x: 3, y: 0, w: 6, h: 2},
      { i: "calendar", x: 0, y: 0, w: 6, h: 2, static: true},
      { i: "dailyWater", x: 0, y: 0, w: 3, h: 1.5},
      { i: "activityGoal", x: 4, y: 0, w: 3, h: 1.5},
      { i: "a", x: 0, y: 0, w: 3, h: 1.5},
      { i: "b", x: 3, y: 0, w: 3, h: 1.5},
      { i: "c", x: 0, y: 0, w: 6, h: 2},
      { i: "d", x: 3, y: 0, w: 6, h: 2},
      { i: "e", x: 0, y: 0, w: 6, h: 2}
    ]
  }

  return(
    <div className="relative bg-blue">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{
          lg: 1024,
          sm: 0
        }}
        cols={{
          lg: 12,
          sm: 6
        }}
      >
        <div key="overview">
          <Overview />
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