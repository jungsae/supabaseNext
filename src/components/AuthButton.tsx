// src/components/AuthButton.tsx
'use client'

import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function AuthButton() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const signIn = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) alert(error.message)
    else alert('Check your email for the login link!')
    setLoading(false)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    location.reload()
  }

  return (
    <div className="space-y-2">
      <input
        className="border px-2 py-1"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={signIn}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Sign In with Magic Link'}
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded ml-2"
        onClick={signOut}
      >
        Sign Out
      </button>
    </div>
  )
}
