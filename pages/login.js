import Head from 'next/head'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'

export default function Login() {
  return (
    <>
      <Head>
        <title>User Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main 
        style={{
          backgroundImage: `url(/pexels-simon-berger-1323550.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          // filter: 'brightness(90%)'
        }}
        className="bg-slate-100 relative mx-auto w-full max-w-200 overflow-auto {styles.main}"
      >
        <LoginForm />
        {/* <RegistrationForm /> */}
      </main>
    </>
  )
}
