import { useState, useEffect } from 'react'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { PrismaClient } from '@prisma/client'
import Sidebar from '../components/partials/_sidebar'
import Header from '../components/partials/_header'
import Footer from '../components/partials/_footer'

const inter = Inter({ subsets: ['latin'] })

export default function Settings(props) {
  const entries = props.entries.map((entry, idx) => {
    console.log(entry);
    const formatDate = format(new Date(entry.date), 'MMMM d,  yyyy');
    return (
      <tr key={idx}>
        <td className="p-2 border border-slate-200">{formatDate}</td>
        <td className="p-2 border border-slate-200">{entry.metrics.name}</td>
        <td className="p-2 border border-slate-200">{entry.metric_value} {entry.metrics.unit}</td>
      </tr>
    )
  })
  return (
    <>
      <Head>
        <title>Journal Listing | ActiveJourney</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen flex-col bg-white text-body dark:bg-dark-14 dark:text-dark-body {styles.main}">
        
        <div className="flex-grow">
          <div className="flex flex-col order-2 sm:flex-row sm:order-1 h-full">
            <Sidebar />
            <main id="section-main" className="bg-slate-100 relative sm:mx-auto w-full h-full max-w-200 overflow-auto">
              <div className="flex h-full flex-col p-8 mb-6">
                <Header
                  pageTitle="Journal Listing"
                  userName={props.user.first_name}
                />
                <section className="mx-3 bg-white rounded-lg p-6 overflow-auto">
                  <table className="table-fixed border-collapse border border-slate-300 w-full mb-4 text-sm sm:text-base">
                    <thead>
                      <tr className='bg-blue-900 text-white'>
                        <th className="text-left p-2 border border-slate-200">Day</th>
                        <th className="text-left p-2 border border-slate-200">Metric</th>
                        <th className="text-left p-2 border border-slate-200">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries}                      
                    </tbody>
                  </table> 
                </section>
                
                
                <Footer />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}


// Fetch all posts (in /pages/index.tsx)
export async function getServerSideProps() {
  const prisma = new PrismaClient()

  const user = await prisma.user.findUnique({
    where: {
      id: 1,
    }
  })

  const today = new Date();

  let entries = await prisma.User_metric_data.findMany({
    where: {
      user_id: 1,
      date: {
        lte: new Date(),
        gte: new Date(new Date().setDate(today.getDate() - 30))
      },
    },
    include: {
      metrics: true,
    },
    orderBy: {
      date: "desc",
    }
  })

  entries = JSON.parse(JSON.stringify(entries))

  return {
    props : { user, entries }
  }
}
