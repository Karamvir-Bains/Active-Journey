import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { PrismaClient } from '@prisma/client'
import Sidebar from '../components/partials/_sidebar'
import Header from '../components/partials/_header'
import Footer from '../components/partials/_footer'

const inter = Inter({ subsets: ['latin'] })

export default function Settings(props) {
  return (
    <>
      <Head>
        <title>Settings | ActiveJourney</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen flex-col bg-white text-body dark:bg-dark-14 dark:text-dark-body {styles.main}">
        
        <div className="flex-grow overflow-auto">
          <div className="flex flex-col order-2 sm:flex-row sm:order-1 h-full">
            <Sidebar />
            <main id="section-main" className="bg-slate-100 relative sm:mx-auto w-full h-full max-w-200 overflow-auto">
              <div className="flex h-full flex-col p-8 mb-6">
                <Header
                  pageTitle="Settings"
                  userName={props.user.first_name}
                />
                <section className="mx-3 bg-white rounded-lg p-4">
                  <h2 className="text-xl text-blue-800 font-semibold mb-3">{props.user.first_name} {props.user.last_name}</h2>
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

  return {
    props : { user }
  }
}