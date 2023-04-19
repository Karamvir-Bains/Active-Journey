import { useState } from 'react'
import { PrismaClient } from '@prisma/client'
import Layout from '../components/Layout'
import Dashboard from '../components/dashboard'
import { defaultLayout } from '../helpers/data'
import { updateLayout, parseLayout } from '../helpers/selectors'
import { ThemeProvider } from '../store/ThemeContext';
import { JournalProvider } from '../store/JournalContext'

export default function Home (props) {

  /**
   * Customize the Dashboard Layout
   */
  const [layout, setLayout] = useState(
    parseLayout(props.user.layout) ? parseLayout(props.user.layout) : defaultLayout
  )

  const handleLayoutChange = async layoutsObj => {
    setLayout(layoutsObj)
    await updateLayout(props.user.id, { layout: layoutsObj })
  }

  return (
    <JournalProvider>
      <ThemeProvider initial={props.user.dark_mode}>
        <Layout
          title="Dashboard"
          background={props.user.background}
          darkMode={props.user.dark_mode}
          firstName={props.user.first_name}
        >
          <Dashboard 
            user={props.user}
            layout={layout}
            onLayoutChange={handleLayoutChange}
            entries={props.entries}
            water={props.water}        
            energy={props.energy}
            mood={props.mood}
            sleep={props.sleep}
            sleepQuality={props.sleepQuality}
            stress={props.stress}
            social={props.social}
          />
        </Layout>
      </ThemeProvider>
  </JournalProvider>
  )
}

/* Data Fetching */
const prisma = new PrismaClient()

// Fetch all entries by metric
async function fetchSingleMetric (condition) {
  let result = await prisma.User_metric_data.findMany({ where: condition })
  result = JSON.parse(JSON.stringify(result))
  return result
}

export async function getServerSideProps () {
  const userid = 1
  const user = await prisma.user.findUnique({
    where: {
      id: userid
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      layout: true,
      dark_mode: true,
      background: true
    }
  })

  const now = Date.now()
  const lteVal = new Date(now).toISOString()

  let dailyWater = await prisma.User_metric_data.findMany({
    where: {
      user_id: userid,
      metric_id: 1,
      date: {
        lte: lteVal
      },
    },
    orderBy: {
      date: 'desc',
    },
    include: {
      metrics: true
    },
    take: 1
  })

  const currDate = new Date();
  console.log(currDate);
  const mockCurrDate = '2023-05-04T07:00:00.000Z'
  let today = await fetchSingleMetric({ date: lteVal }) // Try using lteVal
  let water = await fetchSingleMetric({ metric_id: 1 })
  // let sleep = await fetchSingleMetric({ metric_id: 2 })
  let energy = await fetchSingleMetric({ metric_id: 4 })
  let mood = await fetchSingleMetric({ metric_id: 5 })
  let stress = await fetchSingleMetric({ metric_id: 6 });
  // let sleepQuality = await fetchSingleMetric({ metric_id: 7 });
  let entries = await prisma.User_metric_data.findMany({
    where: { user_id: 1 },
    include: { metrics: true },
    take: 30
  })

  let sleep = await prisma.User_metric_data.findMany({
    where: { 
      user_id: userid,
      metric_id: 2,
      date: {
        lte: lteVal
      },
    },
    orderBy: {
      date: 'desc',
    },
    include: {
      metrics: true
    },
    take: 7
  })

  let sleepQuality = await prisma.User_metric_data.findMany({
    where: { 
      user_id: userid,
      metric_id: 7,
      date: {
        lte: lteVal
      },
    },
    orderBy: {
      date: 'desc',
    },
    include: {
      metrics: true
    },
    take: 7
  })

  let social = await prisma.User_metric_data.findMany({
    where: { 
      user_id: 1,
      metric_id: 8,
      date: {
        lte: lteVal
      },
    },
    orderBy: {
      date: 'desc',
    },
    include: {
      metrics: true
    },
    take: 30
  })

  dailyWater = JSON.parse(JSON.stringify(dailyWater))
  sleep = JSON.parse(JSON.stringify(sleep))
  sleepQuality = JSON.parse(JSON.stringify(sleepQuality))
  social = JSON.parse(JSON.stringify(social))
  entries = JSON.parse(JSON.stringify(entries))

  return {
    props: {
      user,
      entries,
      water,
      sleep,
      energy,
      mood,
      dailyWater,
      stress,
      sleepQuality,
      social
    }
  }
}
