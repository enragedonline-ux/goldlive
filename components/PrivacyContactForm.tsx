'use client'

import { useState } from 'react'

const RECIPIENT = 'enraged.online@gmail.com'

export default function PrivacyContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [opened, setOpened] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const subject = 'Message from GoldRateToday privacy page'
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`
    window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setOpened(true)
  }

  return (
    <form className="privacy-form" onSubmit={handleSubmit}>
      <label>
        Your name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Your email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Your message
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} required />
      </label>
      <button type="submit" className="btn-solid">Send message</button>
      {opened ? <p>Your email app should now open with your message addressed to us.</p> : null}
      <p>Or email us directly at {RECIPIENT}.</p>
    </form>
  )
}
