import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Landing() {
  const [roomName, setRoomName] = useState('')
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault()
    if (roomName.trim() && userName.trim()) {
      navigate(`/room/${roomName.trim()}`)
    }
  }

  const handleCreateRoom = () => {
    const randomRoom = `room-${Math.random().toString(36).substr(2, 9)}`
    setRoomName(randomRoom)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">LiveMeet</h1>
          <p className="text-gray-400">Join or create a video meeting</p>
        </div>

        <form onSubmit={handleJoinRoom} className="space-y-6">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="input w-full"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="roomName" className="block text-sm font-medium text-gray-300 mb-2">
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="input w-full"
              placeholder="Enter room name"
              required
            />
          </div>

          <div className="flex gap-4">
            <button type="submit" className="btn flex-1">
              Join Room
            </button>
            <button type="button" onClick={handleCreateRoom} className="btn-secondary flex-1">
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Landing
