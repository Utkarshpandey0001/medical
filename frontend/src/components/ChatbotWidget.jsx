import React, { useEffect, useMemo, useRef, useState } from 'react'

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi there! I'm your medical assistant. Ask me general health questions and I'll do my best to help."
    }
  ])
  const [userInput, setUserInput] = useState('')
  const messagesEndRef = useRef(null)

  const knowledgeBase = useMemo(
    () => [
      {
        keywords: ['hello', 'hi', 'hey'],
        response:
          'Hello! How can I support you today? I can share general guidance about symptoms, wellness tips, and appointments.'
      },
      {
        keywords: ['appointment', 'book', 'schedule'],
        response:
          'You can book an appointment from the Doctors section. Choose a speciality, pick a doctor, and select a time that suits you.'
      },
      {
        keywords: ['fever', 'temperature', 'cold'],
        response:
          'For mild fever, stay hydrated, rest, and consider over-the-counter fever reducers if appropriate. If the fever is high, persistent, or paired with severe symptoms, please contact a healthcare professional.'
      },
      {
        keywords: ['covid', 'corona', 'virus'],
        response:
          'Common COVID-19 symptoms include fever, cough, sore throat, and loss of taste or smell. If you suspect exposure, isolate, test promptly, and consult a healthcare provider for personalised advice.'
      },
      {
        keywords: ['diet', 'nutrition', 'food', 'eat'],
        response:
          'A balanced diet includes plenty of fruits, vegetables, lean proteins, whole grains, and adequate hydration. Limit sugary drinks and processed foods, and consult a dietitian for personalised plans.'
      },
      {
        keywords: ['exercise', 'workout', 'fitness'],
        response:
          'Aim for at least 150 minutes of moderate activity or 75 minutes of vigorous activity each week, along with muscle-strengthening exercises. Always tailor workouts to your fitness level and medical history.'
      },
      {
        keywords: ['emergency', 'urgent', 'serious'],
        response:
          'If you are experiencing an emergency or severe symptoms, please contact your local emergency services or visit the nearest hospital immediately.'
      },
      {
        keywords: ['thanks', 'thank you', 'great'],
        response: "You're welcome! Let me know if there is anything else you would like to discuss."
      }
    ],
    []
  )

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getBotResponse = (question) => {
    const normalizedQuestion = question.toLowerCase()
    const matchedEntry = knowledgeBase.find((entry) =>
      entry.keywords.some((keyword) => normalizedQuestion.includes(keyword))
    )

    if (matchedEntry) {
      return matchedEntry.response
    }

    return "I'm here to provide general medical information. For personalised advice, please consult a qualified healthcare professional."
  }

  const handleSend = (event) => {
    event.preventDefault()
    const trimmedMessage = userInput.trim()

    if (!trimmedMessage) {
      return
    }

    const userMessage = { sender: 'user', text: trimmedMessage }
    const botMessage = { sender: 'bot', text: getBotResponse(trimmedMessage) }

    setMessages((prev) => [...prev, userMessage, botMessage])
    setUserInput('')
  }

  return (
    <div className='fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3'>
      {isOpen && (
        <div className='w-80 sm:w-96 rounded-3xl shadow-xl border border-primary/20 bg-white overflow-hidden'>
          <div className='bg-primary text-white px-4 py-3 flex items-start justify-between gap-4'>
            <div>
              <p className='font-semibold text-lg'>Medical Chatbot</p>
              <p className='text-xs text-white/80'>Educational use only. Always seek professional care for concerns.</p>
            </div>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='text-white/90 hover:text-white transition-colors'
              aria-label='Close chat'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          <div className='max-h-96 overflow-y-auto bg-slate-50 px-4 py-4 space-y-3'>
            {messages.map((message, index) => (
              <div key={`${message.sender}-${index}`} className='flex flex-col'>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm ${
                    message.sender === 'user'
                      ? 'self-end bg-primary text-white'
                      : 'self-start bg-white text-slate-700 border border-primary/10'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className='border-t border-slate-200 bg-white px-3 py-2 flex items-center gap-2'>
            <input
              type='text'
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
              placeholder='Ask a medical question...'
              className='flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50'
              aria-label='Message the medical chatbot'
            />
            <button
              type='submit'
              className='bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-primary/80 transition-colors'
            >
              Send
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button
          type='button'
          onClick={() => setIsOpen(true)}
          className='flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-white shadow-lg hover:bg-primary/80 transition-colors'
        >
          <span className='inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.8'
                d='M7 8h10M7 12h6m-6 4h3m12-4c0 4.418-4.03 8-9 8a9.86 9.86 0 0 1-4.2-.9L3 21l1.22-3.66C3.45 16.14 3 14.62 3 13c0-4.418 4.03-8 9-8s9 3.582 9 8z'
              />
            </svg>
          </span>
          <span className='text-base font-semibold tracking-wide'>Chatboat</span>
        </button>
      )}
    </div>
  )
}

export default ChatbotWidget
