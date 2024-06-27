'use client'

import Link from 'next/link'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useState } from 'react'
import { CircleAlert, EyeOff, LucideEye } from 'lucide-react'
import RegisterButton from './register-button'
import { useFormState } from 'react-dom'
import { createUser } from '@/actions/user'

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, dispatch] = useFormState(createUser, undefined)

  return (
    <div className="mx-3 w-full max-w-lg rounded-md bg-background px-8 py-12 shadow-sm md:p-16">
      <h1 className="text-center text-3xl font-bold">Create Account</h1>
      <p className="mt-2 text-center text-foreground/60">
        Explore the world&apos;s best photo sharing community
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
            className="lowercase"
          />
        </div>
        <div className="flex flex-col items-start gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="johndoe"
            required
            minLength={3}
            className="lowercase"
          />
        </div>
        <div className="flex flex-col items-start gap-3">
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            type="text"
            id="fullname"
            name="name"
            placeholder="John Doe"
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
            {showPassword ? <EyeOff /> : <LucideEye />}
          </button>
        </div>

        {errorMessage && (
          <p className="text-sm text-red-600">
            <CircleAlert className="mr-1 inline h-4 w-4" /> {errorMessage}
          </p>
        )}

        <RegisterButton />
      </form>

      <p className="mt-6 text-center text-sm text-foreground/60">
        Already have an account?{' '}
        <Link
          className="text-sky-600 underline-offset-4 hover:underline"
          href="/login"
        >
          Log in
        </Link>
      </p>
    </div>
  )
}
