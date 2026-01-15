import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { VideoGrid } from '../components/VideoGrid/VideoGrid'
import { ControlBar } from '../components/ControlBar/ControlBar'
import { useLiveKitRoom } from '../hooks/useLiveKitRoom'
import { useMediaStore } from '../stores/mediaStore'

function Room() {
  const { roomName } = useParams<{ roomName: string }>()
  const navigate = useNavigate()
  const [isConnecting, setIsConnecting] = useState(true)
  const { room, error } = useLiveKitRoom(roomName!)
  const { isMicEnabled, isCameraEnabled, isScreenSharing } = useMediaStore()

  useEffect(() => {
    if (room) {
      setIsConnecting(false)
    }
  }, [room])

  useEffect(() => {
    if (error) {
      console.error('Room connection error:', error)
    }
  }, [error])

  const handleLeaveRoom = () => {
    navigate('/leave')
  }

  if (isConnecting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Connecting to room...</p>
        </div>
      </div>
    )
  }

  if (error || !room) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">Failed to connect to room</p>
          <button onClick={() => navigate('/')} className="btn">
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800">
        <div>
          <h1 className="text-xl font-semibold">Room: {roomName}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className={`w-2 h-2 rounded-full ${isMicEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>Mic {isMicEnabled ? 'On' : 'Off'}</span>
            <div className={`w-2 h-2 rounded-full ${isCameraEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>Camera {isCameraEnabled ? 'On' : 'Off'}</span>
            {isScreenSharing && (
              <>
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>Screen Sharing</span>
              </>
            )}
          </div>
        </div>
        <button
          onClick={() => navigate(`/room/${roomName}/settings`)}
          className="btn-secondary"
        >
          Settings
        </button>
      </div>

      {/* Video Grid */}
      <div className="flex-1">
        <VideoGrid room={room} />
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-gray-800">
        <ControlBar room={room} onLeave={handleLeaveRoom} />
      </div>
    </div>
  )
}

export default Room
