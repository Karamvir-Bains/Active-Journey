import { useEffect, useState } from 'react'
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
    props.user.layout ? parseLayout(props.user.layout) : defaultLayout
  )
  useEffect(() => {
    setLayout( props.user.layout ? parseLayout(props.user.layout) : defaultLayout);
  }, [])

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
          />
        </Layout>
      </ThemeProvider>
  </JournalProvider>
  )
}

/* Data Fetching */
const prisma = new PrismaClient()

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

  return {
    props: {
      user
    }
  }
}
