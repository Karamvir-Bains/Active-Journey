import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { PrismaClient } from '@prisma/client';
import Header from '../components/partials/Header';

const inter = Inter({ subsets: ['latin'] })

export default function Profile(props) {

  return (
    <>
      <Header
        pageTitle="Profile"
        userName={props.user.first_name}
      />
      <section className="mx-3 bg-white dark:bg-slate-800 dark:text-white  rounded-lg p-4">
        <h2 className="text-xl text-blue-800 font-semibold mb-3">{props.user.first_name} {props.user.last_name}</h2>
        <p>Member Since: March 1, 2023</p>
      </section>
    </>
  )
}


// Fetch all posts (in /pages/index.tsx)
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
    },
  })

  return {
    props : { user }
  }
}
