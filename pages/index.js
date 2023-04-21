import { useState } from 'react';
import prisma from '../lib/prisma';
import Layout from '../components/Layout';
import Dashboard from '../components/dashboard';
import { defaultLayout } from '../helpers/data';
import { updateLayout, parseLayout } from '../helpers/selectors';
import { ThemeProvider } from '../store/ThemeContext';
import { JournalProvider } from '../store/JournalContext';

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
            sleep={props.sleep}
            sleepQuality={props.sleepQuality}
            stress={props.stress}
            social={props.social}
            nutrition={props.nutrition}
          />
        </Layout>
      </ThemeProvider>
  </JournalProvider>
  )
}

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

  let today = await fetchSingleMetric({ date: lteVal })
  let water = await fetchSingleMetric({ metric_id: 1 })
  let energy = await fetchSingleMetric({ metric_id: 4 })
  let mood = await fetchSingleMetric({ metric_id: 5 })
  let stress = await fetchSingleMetric({ metric_id: 6 });
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

  let nutrition = await prisma.User_metric_data.findMany({
    where: { 
      user_id: 1,
      metric_id: 9,
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
    take: 10
  })

  dailyWater = JSON.parse(JSON.stringify(dailyWater))
  sleep = JSON.parse(JSON.stringify(sleep))
  sleepQuality = JSON.parse(JSON.stringify(sleepQuality))
  social = JSON.parse(JSON.stringify(social))
  nutrition = JSON.parse(JSON.stringify(nutrition))
  entries = JSON.parse(JSON.stringify(entries))

  return {
    props: {
      user,
      sleep,
      energy,
      mood,
      dailyWater,
      stress,
      sleepQuality,
      social,
      nutrition
    }
  }
}
