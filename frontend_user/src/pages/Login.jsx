import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { signIn } = useAuth()
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await signIn({ email, password })
      nav('/dashboard')
    } catch (err) {
      setError(err.message ?? String(err))
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 420, margin: '40px auto' }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 8 }}>
          <label>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              style={{ width: '100%', padding: 8 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              style={{ width: '100%', padding: 8 }}
            />
          </label>
        </div>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button type="submit" style={{ padding: '8px 12px' }}>
          Sign in
        </button>
      </form>
      <p style={{ marginTop: 12 }}>
        (This is a minimal login UI. You can replace with the HTML from the legacy `login-main.html` later.)
      </p>
    </div>
  )
}
