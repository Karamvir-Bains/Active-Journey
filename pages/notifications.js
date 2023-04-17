import Layout from '../components/Layout'
import Image from 'next/image'
import { PrismaClient } from '@prisma/client'
import { useDarkMode } from '../hooks/useDarkMode';

export default function Settings (props) {
  const [darkMode, toggleDarkMode] = useDarkMode();
  return (
    <Layout title="Notifications" darkMode={darkMode} toggleDarkMode={toggleDarkMode}>
      <section className='mx-3 bg-white dark:bg-slate-900 dark:text-white  rounded-lg p-6 md:p-10'>
        <ul className="list-disc ml-6">
          <li>You have not entered any metrics for the last week</li>
          <li>You&rsquo;ve reached your goal of 8 glasses of water per day 20 out of 30 days this month!</li>
          <li>You havent logged enough activity this week. Try going for a walk today.</li>
        </ul>
      </section>
    </Layout>
  )
}

export async function getServerSideProps () {
  const prisma = new PrismaClient()

  const user = await prisma.user.findUnique({
    where: {
      id: 1
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      layout: true
    }
  })

  return {
    props: { user }
  }
}
