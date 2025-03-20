'use client'

import { useState } from 'react';
import currentTime from './utils/currentTime';
import { sendGeminiRequest } from './actions/sendGeminiRequest';

export default function Home() {

  const [messages, setMessages] = useState([
    {
      role: 'coach',
      content: 'Hello! I am the flexible coach. How can I help you today?',
      time: currentTime()
    },
    {
      role: 'user',
      content: 'I need some advice on how to start a flexible diet',
      time: currentTime(),
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentInput.trim() === '') return; // Prevent sending empty messages
    setMessages([...messages, { role: 'user', content: currentInput, time: currentTime()}]); // Add the user message to the chat
    console.log('before:', messages)
    const response = await sendGeminiRequest({message: currentInput}); // Send the user message to the API
    setMessages([...messages, { role: 'coach', content: response, time: currentTime()}]); // Add the API response to the chat
    setCurrentInput(''); // Clear the input field after sending

  }


  const handleInput = (e) => {
    setCurrentInput(e.target.value);
  }
  
  
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-4'>
      <header>
        <h1 className="text-[8vw] font-bold uppercase">Flexible<span className='text-blue-300'>Coach</span></h1>
      </header>
      <main className='w-screen'>
        <div className="flex flex-col items-center gap-4 border-[1px] rounded-lg border-gray-400 w-[90%] md:w-2/3 h-[400px] mx-auto p-8 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`self-${message.role === 'user' ? 'end' : 'start'}`}>
              <p className={`whitespace-pre-wrap max-w-2/3 text-left px-4 py-2 rounded-lg ${message.role === 'user' ? 'bg-blue-200' : 'bg-green-300'}`}>
                {message.content}
              </p>
              <p className='text-xs px-4 py-2 rounded-full self-end text-right'>{message.time}</p> {/* You might want to add actual timestamps here */}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className='border-[1px] border-gray-400 mt-4 w-[90%] md:w-2/3 mx-auto min-h-[2rem] rounded-lg p-2'>
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
