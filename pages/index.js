import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { PrismaClient } from '@prisma/client'
import Header from '../components/partials/Header'
import Dashboard from '../components/dashboard'
import Footer from '../components/partials/Footer'
import { defaultLayout } from '../helpers/data'
import { useApplicationData } from '../hooks/useApplicationData'
import { updateLayout, parseLayout } from '../helpers/selectors'

export default function Home (props) {
  const {
    today,
    day,
    handleSetDay,
    data,
    setData,
    user,
    toggleJournal,
    handleCalNav
  } = useApplicationData()

  /**
   * Customize the Dashboard Layout
   */

  const [layout, setLayout] = useState(
    parseLayout(props.user.layout) || defaultLayout
  )

  const handleLayoutChange = async layoutsObj => {
    setLayout(layoutsObj)
    await updateLayout(user.id, { layout: layoutsObj })
  }

  return (
    <>
        <Header pageTitle='Dashboard' userName={props.user.first_name} />
        <Dashboard
          user={user}
          today={today}
          entries={props.entries}
          water={props.water}
          sleep={props.sleep}
          energy={props.energy}
          mood={props.mood}
          day={day}
          setDay={handleSetDay}
          layout={layout}
          dailyWater={props.dailyWater}
          onLayoutChange={handleLayoutChange}
          toggleJournal={toggleJournal}
          handleCalNav={handleCalNav}
        />
    </>
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

// Fetch all posts (in /pages/index.tsx)
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
      layout: true
    }
  })

  const now = Date.now()
  const lteVal = new Date(now)
  let dailyWater = await prisma.User_metric_data.findMany({
    where: {
      user_id: userid,
      metric_id: 1,
      date: {
        lte: lteVal
      }
    },
    include: {
      metrics: true
    }
  })
  dailyWater = JSON.parse(JSON.stringify(dailyWater))

  // const currDate = new Date();
  const mockCurrDate = '2023-05-04T07:00:00.000Z'
  let today = await fetchSingleMetric({ date: mockCurrDate }) // Try using lteVal
  let water = await fetchSingleMetric({ metric_id: 1 })
  let sleep = await fetchSingleMetric({ metric_id: 2 })
  let energy = await fetchSingleMetric({ metric_id: 4 })
  let mood = await fetchSingleMetric({ metric_id: 5 })

  let entries = await prisma.User_metric_data.findMany({
    where: { user_id: 1 },
    include: { metrics: true },
    take: 30
  })
  entries = JSON.parse(JSON.stringify(entries))

  return {
    props: {
      user,
      entries,
      water,
      sleep,
      energy,
      mood,
      dailyWater
    }
  }
}
