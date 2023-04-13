import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { PrismaClient } from '@prisma/client';
import Sidebar from '../../components/partials/Sidebar';
import Header from '../../components/partials/Header';
import Footer from '../../components/partials/Footer';
import Journal from "../../components/journal";
import { useApplicationData } from "../../hooks/useApplicationData";

const inter = Inter({ subsets: ['latin'] })

export default function Profile(props) {
  const { today, day, handleSetDay, data, setData, user, setUser, journalOpen, setJournalOpen, toggleJournal, handleCalNav } =
  useApplicationData();

  return (
    <>
      <Header
        pageTitle="Profile"
        userName={props.user.first_name}
      />
      <section className="mx-3 bg-white rounded-lg p-4">
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
