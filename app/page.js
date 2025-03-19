'use client'

import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'coach',
      content: 'Hello! I am the flexible coach. How can I help you today?'
    },
    {
      role: 'user',
      content: 'I need some advice on how to start a flexible diet'
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentInput.trim() === '') return; // Prevent sending empty messages

    setMessages([...messages, { role: 'user', content: currentInput }]);
    setCurrentInput(''); // Clear the input field after sending
    console.log(messages)
    // Here you would typically send the message to the API and get a response
    // and then update the messages state with the response.
    // Example:
    // const response = await fetch('/api/gemini', { method: 'POST', body: JSON.stringify({ messages: [...messages, { role: 'user', content: currentInput }] }) });
    // const data = await response.json();
    // setMessages([...messages, { role: 'user', content: currentInput }, { role: 'coach', content: data.response }]);
  }

  const handleInput = (e) => {
    setCurrentInput(e.target.value);
  }
  
  
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-12'>
      <header>
        <h1 className="text-8xl font-bold uppercase">Flexible<span className='text-blue-300'>Coach</span></h1>
      </header>
      <main className='w-screen'>
        <div className="flex flex-col items-center gap-4 border-[1px] rounded-lg border-gray-400 w-2/3 min-h-[400px] mx-auto p-8">
          {messages.map((message, index) => (
            <div key={index} className={`self-${message.role === 'user' ? 'end' : 'start'}`}>
              <p className={`text-left px-4 py-2 rounded-full ${message.role === 'user' ? 'bg-blue-200' : 'bg-green-300'}`}>
                {message.content}
              </p>
              <p className='text-xs px-4 py-2 rounded-full self-end text-right'>17:41</p> {/* You might want to add actual timestamps here */}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className='border-[1px] border-gray-400 mt-4 w-2/3 mx-auto min-h-[2rem] rounded-lg p-2'>
          <div className='flex'>
            <input 
              onChange={handleInput} 
              className='w-full h-full px-4 py-2' 
              type="text" 
              placeholder='Type your message here...' 
              value={currentInput} // Controlled input
            />
            <button type='submit' className='bg-blue-500 text-white px-4 rounded-lg'>Send</button>
          </div>
        </form>
      </main>
    
    </div>
  );
}
