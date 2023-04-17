import Layout from '../components/Layout'
import { PrismaClient } from '@prisma/client'

export default function Settings (props) {
  return (
    <Layout title="Settings">
      <section className='mx-3 p-6 md:p-8 bg-white dark:bg-slate-800 dark:text-white  rounded-lg'>
        <h2 className='text-xl text-blue-500 font-semibold mb-3'>
          {props.user.first_name} {props.user.last_name}
        </h2>
        <form action="/users/1/settings" method="post" className='lg:w-[60%] mb-6'>
          <div className='my-6'>
            <label className='font-bold text-blue-900 dark:text-blue-200' for="first">First name:</label>
            <input readonly className='border-2 p-3 w-full dark:bg-slate-700' type="text" id="first" name="first" value={props.user.first_name} />
          </div>
          <div className='my-6'>
            <label className='font-bold text-blue-900 dark:text-blue-200' for="last">Last name:</label>
            <input readonly className='border-2 p-3 w-full dark:bg-slate-700' type="text" id="last" name="last" value={props.user.last_name} />
          </div>
          <div className='my-6'>
            <label className='font-bold text-blue-900 dark:text-blue-200' for="background">Theme:</label>
            {props.user.dark_mode}
            <select readonly className='border-2 p-3 w-full dark:bg-slate-700' name="background" id="background" value="{props.user.dark_mode}">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
          </div>
          <div className='my-6'>
            <label className='font-bold text-blue-900 dark:text-blue-200' for="background">Set a background image:</label>
            <select readonly className='border-2 p-3 w-full dark:bg-slate-700' name="background" id="background" value={props.user.background}>
                <option value="none">None</option>
                <option value="mountains">Mountains</option>
                <option value="sunset">Sunset</option>
            </select>
          </div>
          <button className='bg-blue-800 hover:bg-blue-700 text-white px-4 py-3 w-full text-lg font-md' type="submit">Save Settings</button>
        </form>
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
