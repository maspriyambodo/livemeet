import { create } from 'zustand'

interface MediaState {
  isMicEnabled: boolean
  isCameraEnabled: boolean
  isScreenSharing: boolean
  selectedMic: string | null
  selectedCamera: string | null
  selectedSpeaker: string | null
  toggleMic: () => void
  toggleCamera: () => void
  toggleScreenShare: () => void
  setMic: (deviceId: string) => void
  setCamera: (deviceId: string) => void
  setSpeaker: (deviceId: string) => void
}

export const useMediaStore = create<MediaState>((set) => ({
  isMicEnabled: true,
  isCameraEnabled: true,
  isScreenSharing: false,
  selectedMic: null,
  selectedCamera: null,
  selectedSpeaker: null,
  toggleMic: () =>
    set((state) => ({ isMicEnabled: !state.isMicEnabled })),
  toggleCamera: () =>
    set((state) => ({ isCameraEnabled: !state.isCameraEnabled })),
  toggleScreenShare: () =>
    set((state) => ({ isScreenSharing: !state.isScreenSharing })),
  setMic: (deviceId: string) =>
    set(() => ({ selectedMic: deviceId })),
  setCamera: (deviceId: string) =>
    set(() => ({ selectedCamera: deviceId })),
  setSpeaker: (deviceId: string) =>
    set(() => ({ selectedSpeaker: deviceId })),
}))
