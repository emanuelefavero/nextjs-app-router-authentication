import { redirect } from 'next/navigation'
import { getSession, login, logout } from '@/lib'

export default async function Home() {
  // Get the session with the user credentials
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
        className='mb-2 flex flex-col border border-gray-500 border-opacity-50 p-2 rounded-md w-fit'
      >
        <input
          type='email'
          placeholder='Email'
          name='email'
          className='mb-2'
          required
        />
        <input
          type='text'
          placeholder='Name'
          name='name'
          className='mb-2'
          required
        />
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

      <h2 className='text-xl mt-4'>Session - user credentials</h2>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  )
}
