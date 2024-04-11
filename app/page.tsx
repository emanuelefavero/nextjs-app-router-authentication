import { redirect } from 'next/navigation'
import { getSession, login, logout } from '@/lib'

export default async function Home() {
  const session = await getSession()

  return (
    <section>
      <h1 className='text-2xl'>Next.js App Router Auth</h1>

      <h2 className='text-xl mt-4'>Login</h2>
      <form
        action={async (formData) => {
          'use server'
          await login(formData)
          redirect('/')
        }}
        className='mb-2 border border-gray-500 border-opacity-50 p-2 rounded-md w-fit'
      >
        <input type='email' placeholder='Email' className='mb-2' />
        <br />
        <button type='submit'>Login</button>
      </form>

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

      <h2 className='text-xl mt-4'>Session</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  )
}
