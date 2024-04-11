import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const secretKey = 'secret'
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('10 sec from now')
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return payload
}

// * Login
export async function login(formData: FormData) {
  // Verify credentials && get the user
  const user = { email: formData.get('email'), name: 'John' }

  // Create a the session
  const expires = new Date(Date.now() + 10 * 1000) // expires in 10 seconds
  const session = await encrypt({ user, expires })

  // Save the session in a cookie
  cookies().set('session', session, { expires, httpOnly: true })
}

// * Logout
export async function logout() {
  // Clear the session
  cookies().set('session', '', { expires: new Date(0) }) // expires immediately
}

// * Get Session
export async function getSession() {}

// * Update Session
export async function updateSession(request: NextRequest) {}
