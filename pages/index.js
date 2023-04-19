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
            sleep={props.sleep}
            sleepQuality={props.sleepQuality}
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

  let sleep = await fetchSingleMetric({ metric_id: 2 })
  let sleepQuality = await fetchSingleMetric({ metric_id: 7 });

  return {
    props: {
      user,
      sleep,
      sleepQuality
    }
  }
}
