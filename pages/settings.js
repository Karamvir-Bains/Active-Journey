import Layout from '../components/Layout'
import { PrismaClient } from '@prisma/client'
import { useState } from 'react';
import { ThemeProvider } from '../store/ThemeContext';
import { JournalProvider } from '../store/JournalContext';

export async function updateUser(id, user) {
  let newUser = user;
  if (user === '' || user === null) {
    return
  }

  try {
    const userid = Number(id);
    const response = await fetch(`/api/users/${userid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
    });

    const jsonData = await response.json();
    console.log(jsonData);
  }
  catch (err) {
    console.log(err);
  }
}

export default function Settings (props) {
  const [userBackground, setUserBackground] = useState(props.user.background || 'none');
  const [firstName, setFirstName] = useState(props.user.first_name);
  const [lastName, setLastName]= useState(props.user.last_name);
  const [message, setMessage] = useState("");

  const handleSave = () => {
    console.log("Saved");
    const user = {
      first_name: firstName,
      last_name: lastName,
      background: userBackground
    }
    console.log(user);
    updateUser(1, user).catch((err) => {
      console.lor(err);
    });
    setMessage(
      "Saved"
    )
  }

  return (
    <JournalProvider>
      <ThemeProvider initial={props.user.dark_mode}>
        <Layout 
          title="Settings"
          background={userBackground} 
          darkMode={props.user.dark_mode}
          firstName={firstName}
        >
          <section className='mx-3 p-6 md:p-8 bg-white dark:bg-slate-800 dark:text-white  rounded-lg'>
            <h2 className='text-xl text-blue-500 dark:text-white font-semibold mb-3'>
              {firstName} {lastName}
            </h2>
            <form action="/users/1/settings" method="post" className='lg:w-[60%] mb-6' onSubmit={(e) => e.preventDefault()}>
              {message && (
                <div className='bg-emerald-300 border-emerald-400 border rounded-sm text-slate-950 px-4 py-2 mb-3'>
                {message}
                </div>
              )}
              <div className='my-6 flex'>
                <label className='w-[33%] self-center font-bold text-blue-900 dark:text-orange-100' htmlFor="first">First name:</label>
                <input
                  className='border-2 p-3 w-full dark:bg-slate-700'
                  type="text"
                  id="first"
                  name="first"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value) }
                />
              </div>
              <div className='my-6 flex content-stretch'>
                <label className='w-[33%] self-center font-bold text-blue-900 dark:text-orange-100' htmlFor="last">Last name:</label>
                <input className='border-2 p-3 w-full dark:bg-slate-700' type="text" id="last" name="last"
                value={lastName}
                onChange={(e) => setLastName(e.target.value) }
                />
              </div>
              <div className='flex my-6'>
                <label className='w-[33%] self-center font-bold text-blue-900 dark:text-orange-100'
                htmlFor="background">Set a background image:</label>
                <select className='border-2 p-3 w-full dark:bg-slate-700'    
                  name="background" 
                  id="background"
                  value={userBackground}
                  onChange={(e) => setUserBackground(e.target.value)}
                >
                    <option value="none">None</option>
                    <option value="mountains">Mountains</option>
                    <option value="sunset">Sunset</option>
                </select>
              </div>
              
              <button className='bg-blue-800 hover:bg-blue-700 dark:bg-orange-700 dark:hover:bg-orange-600 text-white px-4 py-3 rounded-lg text-lg font-md' type="submit" onClick={handleSave}>Save Settings</button>
            </form>
            
          </section>
        </Layout>
      </ThemeProvider>
    </JournalProvider>
  )
}

export async function getServerSideProps () {
  const prisma = new PrismaClient()

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

  user = JSON.parse(JSON.stringify(user));

  return {
    props: { user }
  }
}
