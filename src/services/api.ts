// Mock API service - in production, this would call your backend
export interface JoinRoomRequest {
  roomName: string
  userName: string
}

export interface JoinRoomResponse {
  token: string
  serverUrl: string
}

export const api = {
  async joinRoom(_request: JoinRoomRequest): Promise<JoinRoomResponse> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock response - in production, this would be a real API call
    return {
      token: `mock-token-${Date.now()}`,
      serverUrl: 'wss://your-livekit-server.com'
    }
  }
}
