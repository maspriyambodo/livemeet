import { Room } from 'livekit-client'
import { api, JoinRoomRequest } from './api'

export class LiveKitService {
  private room: Room | null = null

  async connect(request: JoinRoomRequest): Promise<Room> {
    try {
      // Get token from backend
      const { token, serverUrl } = await api.joinRoom(request)

      // Create room instance
      this.room = new Room({
        adaptiveStream: true,
        dynacast: true,
      })

      // Connect to room
      await this.room.connect(serverUrl, token)

      return this.room
    } catch (error) {
      console.error('Failed to connect to LiveKit room:', error)
      throw error
    }
  }

  disconnect() {
    if (this.room) {
      this.room.disconnect()
      this.room = null
    }
  }

  getRoom(): Room | null {
    return this.room
  }

  // Helper methods for common operations
  async enableCamera(enabled: boolean) {
    if (!this.room) return

    if (enabled) {
      await this.room.localParticipant.setCameraEnabled(true)
    } else {
      await this.room.localParticipant.setCameraEnabled(false)
    }
  }

  async enableMic(enabled: boolean) {
    if (!this.room) return

    if (enabled) {
      await this.room.localParticipant.setMicrophoneEnabled(true)
    } else {
      await this.room.localParticipant.setMicrophoneEnabled(false)
    }
  }

  async startScreenShare() {
    if (!this.room) return

    try {
      await this.room.localParticipant.setScreenShareEnabled(true)
    } catch (error) {
      console.error('Failed to start screen share:', error)
    }
  }

  async stopScreenShare() {
    if (!this.room) return

    try {
      await this.room.localParticipant.setScreenShareEnabled(false)
    } catch (error) {
      console.error('Failed to stop screen share:', error)
    }
  }
}

export const liveKitService = new LiveKitService()
