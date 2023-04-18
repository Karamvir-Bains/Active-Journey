import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Layout from '../components/Layout'
import Image from 'next/image'
import { PrismaClient } from '@prisma/client'
import { ThemeProvider } from '../store/ThemeContext';

export default function List (props) {
  const entries = props.entries.map((entry, idx) => {
    const formatDate = format(new Date(entry.date), 'MMMM d,  yyyy')
    return (
      <tr key={idx}>
        <td className='p-2 border border-slate-200'>{formatDate}</td>
        <td className='p-2 border border-slate-200'>{entry.metrics.name}</td>
        <td className='p-2 border border-slate-200'>
          {entry.metric_value}&nbsp;
          {entry.metrics.unit}
        </td>
      </tr>
    )
  });
  return (
    <ThemeProvider>
      <Layout title="Journal List View">
        <section className='mx-3 bg-white dark:bg-slate-900 dark:text-white  rounded-lg p-6 overflow-auto'>
          <table className='table-fixed border-collapse border border-slate-300 w-full mb-4 text-sm sm:text-base'>
            <thead>
              <tr className='bg-blue-900 dark:bg-blue-800 text-white'>
                <th className='text-left p-2 border border-slate-200'>Day</th>
                <th className='text-left p-2 border border-slate-200'>Metric</th>
                <th className='text-left p-2 border border-slate-200'>Value</th>
              </tr>
            </thead>
            <tbody>{entries}</tbody>
          </table>
        </section>
      </Layout>
    </ThemeProvider>
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

  const today = new Date()

  let entries = await prisma.User_metric_data.findMany({
    where: {
      user_id: 1,
      date: {
        lte: new Date(),
        gte: new Date(new Date().setDate(today.getDate() - 30))
      }
    },
    include: {
      metrics: true
    },
    orderBy: {
      date: 'desc'
    }
  })

  entries = JSON.parse(JSON.stringify(entries))

  return {
    props: { user, entries }
  }
}
