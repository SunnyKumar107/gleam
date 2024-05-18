'use client'

import Link from 'next/link'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import LoginButton from './login-button'
import { useFormState } from 'react-dom'
import { loginUser } from '@/actions/user'
import { CircleAlert, EyeOff, LucideEye } from 'lucide-react'
import { useState } from 'react'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, dispatch] = useFormState(loginUser, undefined)

  return (
    <div className="mx-3 w-full max-w-lg rounded-md bg-background px-8 py-12 shadow-sm md:p-16">
      <h1 className="text-center text-3xl font-bold">Account Login</h1>
      <p className="mt-2 text-center text-foreground/60">
        Welcome back! You&apos;ve been missed
      </p>

      <form action={dispatch} className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col items-start gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="johndoe@email.com"
            required
          />
        </div>
        <div className="relative flex flex-col items-start gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="●●●●●●●●"
            required
            minLength={6}
          />
          <button
            className="absolute bottom-2 right-5 text-lg font-medium text-gray-600"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <LucideEye /> : <EyeOff />}
          </button>
        </div>

        {errorMessage && (
          <p className="text-sm text-red-600">
            <CircleAlert className="mr-1 inline h-4 w-4" /> {errorMessage}
          </p>
        )}

        <LoginButton />
      </form>

      <p className="mt-6 text-center text-sm text-foreground/60">
        Don&apos;t have an account yet?{' '}
        <Link
          className="text-sky-600 underline-offset-4 hover:underline"
          href="/register"
        >
          Register
        </Link>
      </p>
    </div>
  )
}
