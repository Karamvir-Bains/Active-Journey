import Image from 'next/image';
import Layout from '../components/Layout';
import { PrismaClient } from '@prisma/client';
import { ThemeProvider } from '../store/ThemeContext';
import { JournalProvider } from '../store/JournalContext';

export default function Profile(props) {
  return (
    <JournalProvider>
      <ThemeProvider initial={props.user.dark_mode}>
        <Layout 
          title="Profile" 
          background={props.user.background} 
          darkMode={props.user.dark_mode}
          firstName={props.user.first_name}
        > 
          <section className="mx-3 bg-white dark:bg-slate-900 dark:text-white  rounded-lg p-4">
            <h2 className="text-xl text-blue-500 font-semibold mb-3">{props.user.first_name} {props.user.last_name}</h2>
            <p>Member Since: March 1, 2023</p>
          </section>
        </Layout>
      </ThemeProvider>
    </JournalProvider>

  )
}

export async function getServerSideProps() {
  const prisma = new PrismaClient()

  const user = await prisma.user.findUnique({
    where: {
      id: 1,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      layout: true,
      dark_mode: true,
      background: true
    },
  })

  return {
    props : { user }
  }
}
