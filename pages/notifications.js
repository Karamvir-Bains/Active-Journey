import Layout from '../components/Layout'
import Image from 'next/image'
import { PrismaClient } from '@prisma/client'
import { useApplicationData } from '../hooks/useApplicationData'

export default function Settings (props) {
  const { today, day, handleSetDay, data, setData, user, setUser, journalOpen, toggleJournal, handleCalNav } =
  useApplicationData();

  return (
    <Layout title="Notifications">
      <section className='mx-3 bg-white dark:bg-slate-800 dark:text-white  rounded-lg p-4'>
        <h2 className='text-xl text-blue-800 font-semibold mb-3'>
          {props.user.first_name} {props.user.last_name}
        </h2>
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
