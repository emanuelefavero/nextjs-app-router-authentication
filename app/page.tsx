import { redirect } from 'next/navigation'
import { getSession, login, logout } from '@/lib'

export default async function Home() {
  // Get the session with the user credentials
  const session = await getSession()

  if (!session) redirect('/login') // Redirect to login if no session

  return (
    <section>
      <h1 className='text-2xl'>Next.js App Router Auth</h1>

      <h2 className='text-xl mt-4'>Session Data</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <h2 className='text-xl mt-4'>Output</h2>
      <p>
        Welcome, {session.user.name}! You are logged in with email:{' '}
        {session.user.email}
      </p>

      <h2 className='text-xl mt-4'>Logout</h2>
      <form
        action={async () => {
          'use server'
          await logout()
          redirect('/')
        }}
      >
        <button type='submit'>Logout</button>
      </form>
    </section>
  )
}
