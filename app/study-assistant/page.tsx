'use client'

import { useEffect, useRef } from 'react'
import { useChat } from 'ai/react'

export default function StudyAssistantPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(m => (
          <div key={m.id} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <input
          ref={inputRef}
          className="w-full p-2 border rounded"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask your study question..."
        />
      </form>
    </div>
  )
}

