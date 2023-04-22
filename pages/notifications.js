import Layout from '../components/Layout';
import Image from 'next/image';
import prisma from '../lib/prisma';
import { ThemeProvider } from '../store/ThemeContext';
import { JournalProvider } from '../store/JournalContext';
import WaterNotification from '../components/notifications/water';
import SocialNotification from '../components/notifications/social';

export default function Notifications (props) {
  return (
  <JournalProvider>
    <ThemeProvider initial={props.user.dark_mode}>
      <Layout 
        title="Notifications"
        background={props.user.background}
        darkMode={props.user.dark_mode}
        firstName={props.user.first_name}
      >
        <section className='mx-3 bg-white dark:bg-slate-900 dark:text-white  rounded-lg p-6 md:p-10'>
          <WaterNotification
            metrics={props.metrics[0]}
          />
          <SocialNotification
            metrics={props.metrics[7]}
          />
        </section>
      </Layout>
    </ThemeProvider>
  </JournalProvider>

  )
}

export async function getServerSideProps () {
  let user = await prisma.user.findUnique({
    where: {
      id: 1
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      layout: true,
      background: true,
      dark_mode: true
    }
  })

  const date = new Date();

  // Start of day 90 days ago in UTC
  const gte = new Date(new Date(date).toISOString().slice(0, 10) + "T00:00:00.000Z");
  gte.setUTCDate(gte.getUTCDate() - 90);

  // End of day in UTC
  const lt = new Date(new Date(date).toISOString().slice(0, 10) + "T23:59:59.999Z");

  let metrics = await prisma.metric.findMany({
    include: {
      user_metric_data: {
        where: { date: { gte, lt } }
      }
    }
  });

  user = JSON.parse(JSON.stringify(user));
  metrics = JSON.parse(JSON.stringify(metrics));


  return {
    props: { user, metrics }
  }

}
