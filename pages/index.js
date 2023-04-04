import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { PrismaClient } from '@prisma/client'
import Sidebar from './_sidebar'
import Main from './_main'

const inter = Inter({ subsets: ['latin'] })

export default function Home({}) {
  return (
    <>
      <Head>
        <title>ActiveJourney</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <div className="flex h-screen flex-col bg-white text-body dark:bg-dark-14 dark:text-dark-body {styles.main}">
        
        <div className="flex-grow overflow-auto">
          <div className="flex flex-col order-2 sm:flex-row sm:order-1 h-full">
            <Sidebar />
            <Main />
          </div>
        </div>
      </div>
    </>
  )
}

// export async function getStaticProps() {
//   const prisma = new PrismaClient()
//   const blogs = await prisma.blog.findMany()

//   return {
//     props : { blogs }
//   }
// }