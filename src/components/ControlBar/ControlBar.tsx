import { Room } from 'livekit-client'
import { useMediaStore } from '../../stores/mediaStore'
import { liveKitService } from '../../services/livekit'

interface ControlBarProps {
  room: Room | null
  onLeave: () => void
}

export function ControlBar({ onLeave }: ControlBarProps) {
  const {
    isMicEnabled,
    isCameraEnabled,
    isScreenSharing,
    toggleMic,
    toggleCamera,
    toggleScreenShare,
  } = useMediaStore()

  const handleMicToggle = async () => {
    toggleMic()
    await liveKitService.enableMic(!isMicEnabled)
  }

  const handleCameraToggle = async () => {
    toggleCamera()
    await liveKitService.enableCamera(!isCameraEnabled)
  }

  const handleScreenShareToggle = async () => {
    toggleScreenShare()
    if (!isScreenSharing) {
      await liveKitService.startScreenShare()
    } else {
      await liveKitService.stopScreenShare()
    }
  }

  const handleLeave = () => {
    liveKitService.disconnect()
    onLeave()
  }

  return (
    <div className="flex items-center justify-center gap-4 p-4">
      {/* Microphone */}
      <button
        onClick={handleMicToggle}
        className={`p-3 rounded-full transition-colors ${
          isMicEnabled
            ? 'bg-gray-700 hover:bg-gray-600 text-white'
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
        title={isMicEnabled ? 'Mute microphone' : 'Unmute microphone'}
      >
        {isMicEnabled ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.95.85c-.19-.19-.39-.34-.61-.48-.22-.14-.45-.24-.68-.34-.34-.14-.7-.22-1.05-.22-1.66 0-3 1.34-3 3v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1-.25 0-.5.05-.74.14-.34.11-.65.28-.92.51zM12 1c-1.66 0-3 1.34-3 3v6c0 1.66 1.34 3 3 3s3-1.34 3-3V4c0-1.66-1.34-3-3-3zM6.18 6.18L4.95 7.41C4.32 8.02 3.8 8.74 3.5 9.5H2c0-1.19.34-2.3.9-3.28l1.23-1.23c-.56.98-.9 2.09-.9 3.28h1.7c0-.74.16-1.43.43-2.05zM21 14v-2c0-3.53-2.61-6.43-6-6.92V3.08c3.39.49 6 3.39 6 6.92h1.7c0 1.19-.34 2.3-.9 3.28l-1.23-1.23c.56-.98.9-2.09.9-3.28z"/>
          </svg>
        )}
      </button>

      {/* Camera */}
      <button
        onClick={handleCameraToggle}
        className={`p-3 rounded-full transition-colors ${
          isCameraEnabled
            ? 'bg-gray-700 hover:bg-gray-600 text-white'
            : 'bg-red-600 hover:bg-red-700 text-white'
        }`}
        title={isCameraEnabled ? 'Turn off camera' : 'Turn on camera'}
      >
        {isCameraEnabled ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 6.5l-4 4V7c0-.55-.45-1-1-1H9.82L21 17.18V6.5zM3.27 2L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.55-.18L19.73 21 21 19.73 3.27 2z"/>
          </svg>
        )}
      </button>

      {/* Screen Share */}
      <button
        onClick={handleScreenShareToggle}
        className={`p-3 rounded-full transition-colors ${
          isScreenSharing
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-700 hover:bg-gray-600 text-white'
        }`}
        title={isScreenSharing ? 'Stop screen share' : 'Start screen share'}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 3H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H4V5h16v12z"/>
          <path d="M6 8.25h8v1.5H6zm0 3h8v1.5H6z"/>
        </svg>
      </button>

      {/* Leave Room */}
      <button
        onClick={handleLeave}
        className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
        title="Leave meeting"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 12l-2.58 2.59zM5 4h14v2H5V4zm0 16h14v-2H5v2z"/>
        </svg>
      </button>
    </div>
  )
}
