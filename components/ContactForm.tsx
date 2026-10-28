'use client'

import { useState } from 'react'

const RECIPIENT = 'enraged.online@gmail.com'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('Price correction')
  const [message, setMessage] = useState('')
  const [opened, setOpened] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const subject = `Contact form: ${topic}`
    const body = `Name: ${name || '(not given)'}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`
    window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setOpened(true)
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Your name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" />
      </label>
      <label>
        Your email *
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
      </label>
      <label>
        Topic
        <select value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option>Price correction</option>
          <option>Broken page or chart</option>
          <option>Feedback or suggestion</option>
          <option>Partnership enquiry</option>
          <option>Other</option>
        </select>
      </label>
      <label>
        Your message *
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Tell us the page, the price you saw, and what looks wrong." required />
      </label>
      <button type="submit" className="btn-solid">Send message</button>
      {opened ? <p>Your email app should now open with your message addressed to us. Press send there to deliver it.</p> : null}
      <p>Or email us directly at {RECIPIENT}.</p>
      <p>Your email address is only used to reply to you. It is not shared or sold.</p>
    </form>
  )
}
