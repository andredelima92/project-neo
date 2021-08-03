import React, { createContext, useState, useEffect } from 'react'
import { AuthService } from '../services/auth'
import User from '../models/user'
import Router from 'next/router'
import { parseCookies, setCookie } from 'nookies'

interface SignInData {
  email: string
  pass: string
}

interface AuthContextData {
  loading: boolean
  user: User | null
  signIn: ({ email, pass }: SignInData) => Promise<void>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async function getUser() {
      const { cefis_studios_auth: key } = parseCookies()

      if (key) {
        const user = await AuthService.getUser()
        setUser(user)
      }
      setLoading(false)
    })()
  }, [])

  async function signIn({ email, pass }: SignInData): Promise<void> {
    setLoading(true)
    const { key, user } = await AuthService.login(email, pass)
    setLoading(false)

    setCookie(undefined, 'cefis_studios_auth', key, {
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })

    if (user) {
      setUser(user)

      Router.push('/')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        loading: loading,
        signIn: signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
