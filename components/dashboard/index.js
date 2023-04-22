import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout'
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
import WeeklyStress from "../widgets/WeeklyStress";

const ResponsiveGridLayout = WidthProvider(Responsive)

export default function Dashboard (props) {
  const [zoomSleep, setZoomSleep] = useState(false);
  const [zoomSocial, setZoomSocial] = useState(false);

  const handleZoomSleep = () => {
    console.log("Clicked");
    setZoomSleep(prev => !prev);
  }

  const handleZoomSocial = () => {
    console.log("Clicked");
    setZoomSocial(prev => !prev);
  }

  return (
    <div className='relative'>
    {zoomSleep && 
      <div className='md:mx-3'>
        <Sleep
          zoom={zoomSleep}
          onChange={handleZoomSleep}
        />
      </div>
    }

    {zoomSocial && 
      <div className='mx-3'>
        <Social
          zoom={zoomSocial}
          onChange={handleZoomSocial}
        />
      </div>
    }

    {!zoomSleep && !zoomSocial && 
      <ResponsiveGridLayout
        className='layout'
        layouts={props.layout}
        breakpoints={{
          xl: 1024,
          lg: 768,
          md: 640,
          sm: 0
        }}
        cols={{
          xl: 12,
          lg: 12,
          md: 6,
          sm: 1
        }}
        onLayoutChange={(e, layoutsObj) => props.onLayoutChange(layoutsObj)}
        isDraggable={true}
        isRearrangeable={true}
        isResizable={true}
      >
        <div key='overview'>
          <Overview
            entries={props.entries}
            water={props.water}
            sleep={props.sleep}
            energy={props.energy}
            mood={props.mood}
          />
        </div>
        <div key='calendar'>
          <Calendar />
        </div>
        <div key='dailyWater'>
          <DailyWater
          />
        </div>
        <div key="activityGoal">
          <RadialChart />
        </div>
        <div key="stress">
            <WeeklyStress 
              stress={props.stress} 
              entries={props.entries} 
              title="Stress" 
              desc="Past 7 days" />
        </div>
        <div key='mood'>
          <AvgMood 
          />
        </div>
        <div key='sleep'>
          <Sleep
            sleep={props.sleep}
            sleepQuality={props.sleepQuality}
            entries={props.entries}
            title='Sleep Quality vs Hours'
            desc='Past 7 days'
          />
        </div>
        <div key='social'>
          <Social
            social={props.social}
            title='Quality of Social Interactions'
            desc='Past 30 days'
            zoom={zoomSocial}
            onChange={handleZoomSocial}
          />
        </div>
        <div key='alcohol'>
          <Alcohol
            alcohol={props.alcohol}
            title='Alcohol Intake'
            desc='Past 7 days'
          />
        </div>
        <div key='nutrition'>
          <Nutrition 
            nutrition={props.nutrition}
          />
        </div>
      </ResponsiveGridLayout>
      }
      </div>
    )
  }