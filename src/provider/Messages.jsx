import React, { useState } from 'react'
import {
  FaPaperPlane,
  FaSearch,
  FaCircle
} from "react-icons/fa";

function Messages() {

  const [selectedChat, setSelectedChat] = useState(0)

  const [message, setMessage] = useState("")

  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Arjun",
      service: "Fan Repair",
      online: true,
      messages: [
        { sender: "customer", text: "Hi, are you available today?" },
        { sender: "provider", text: "Yes, I am available after 3 PM." }
      ]
    },

    {
      id: 2,
      name: "Nikhil",
      service: "AC Installation",
      online: false,
      messages: [
        { sender: "customer", text: "Can you come tomorrow morning?" }
      ]
    },

    {
      id: 3,
      name: "Sreehari",
      service: "Electrical Wiring",
      online: true,
      messages: [
        { sender: "provider", text: "Work completed successfully." }
      ]
    }
  ])

  const handleSend = () => {

    if (!message.trim()) return

    const updatedChats = [...chats]

    updatedChats[selectedChat].messages.push({
      sender: "provider",
      text: message
    })

    setChats(updatedChats)

    setMessage("")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <div className="bg-white rounded-[35px] shadow-2xl overflow-hidden h-[92vh] flex">

        {/* Sidebar */}
        <div className="w-[350px] border-r hidden md:flex flex-col">

          {/* Top */}
          <div className="p-5 border-b">

            <h1 className="text-3xl font-black text-gray-800">
              Messages
            </h1>

            {/* Search */}
            <div className="mt-5 relative">

              <FaSearch className="absolute top-4 left-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search chats..."
                className="w-full bg-gray-100 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-amber-500"
              />

            </div>

          </div>

          {/* Chat List */}
<div className="flex-1 overflow-y-auto">

  {
    chats.map((chat, index) => (

      <div
        key={chat.id}
        onClick={() => setSelectedChat(index)}
        className={`p-5 cursor-pointer border-b transition-all hover:bg-gray-100
      
        ${selectedChat === index && "bg-amber-50"}
        `}
      >

        <div className="flex items-center justify-between">

          <div>

            <h2 className="font-bold text-lg">
              {chat.name}
            </h2>

            <p className="text-gray-500 text-sm">
              {chat.service}
            </p>

          </div>

          {
            chat.online && (
              <FaCircle className="text-green-500 text-xs" />
            )
          }

        </div>

      </div>

    ))
  }

</div>

        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col">

          {/* Chat Header */}
          <div className="p-5 border-b flex items-center gap-4 bg-white">

            

            <div>

              <h2 className="font-bold text-xl">
                {chats[selectedChat].name}
              </h2>

              <p className="text-gray-500">
                {chats[selectedChat].service}
              </p>

            </div>

          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">

            {
              chats[selectedChat].messages.map((msg, index) => (

                <div
                  key={index}
                  className={`flex 
                  
                  ${msg.sender === "provider"
                      ? "justify-end"
                      : "justify-start"}
                  `}
                >

                  <div
                    className={`max-w-[300px] px-5 py-3 rounded-3xl shadow
                      
                    ${msg.sender === "provider"
                        ? "bg-amber-500 text-white rounded-br-md"
                        : "bg-white text-gray-800 rounded-bl-md"}
                    `}
                  >
                    {msg.text}
                  </div>

                </div>

              ))
            }

          </div>

          {/* Input */}
          <div className="p-5 border-t bg-white flex items-center gap-4">

            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-gray-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-amber-500"
            />

            <button
              onClick={handleSend}
              className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 text-white p-4 rounded-2xl shadow-lg"
            >
              <FaPaperPlane />
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Messages