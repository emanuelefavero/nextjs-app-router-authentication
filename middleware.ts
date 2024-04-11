import { NextRequest } from 'next/server'
import { updateSession } from '@/lib'

// This middleware will run on every request and update the session
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}
