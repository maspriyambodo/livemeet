import { useState, useEffect } from 'react'
import { Room } from 'livekit-client'
import { liveKitService } from '../services/livekit'

export function useLiveKitRoom(roomName: string) {
  const [room, setRoom] = useState<Room | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    if (!roomName) return

    const connectToRoom = async () => {
      try {
        setIsConnecting(true)
        setError(null)

        const connectedRoom = await liveKitService.connect({
          roomName,
          userName: 'User', // In a real app, get this from user input or auth
        })

        setRoom(connectedRoom)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect')
      } finally {
        setIsConnecting(false)
      }
    }

    connectToRoom()

    // Cleanup on unmount or roomName change
    return () => {
      liveKitService.disconnect()
      setRoom(null)
    }
  }, [roomName])

  return { room, error, isConnecting }
}
