import { redirect } from 'next/navigation'
import { login } from '@/lib'

export default function Page() {
  return (
    <>
      <h1 className='text-xl mt-4'>Next.js App Router - Login</h1>
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
    </>
  )
}
