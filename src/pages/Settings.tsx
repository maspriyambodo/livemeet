import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useMediaStore } from '../stores/mediaStore'

function Settings() {
  const { roomName } = useParams<{ roomName: string }>()
  const navigate = useNavigate()
  const {
    selectedMic,
    selectedCamera,
    selectedSpeaker,
    setMic,
    setCamera,
    setSpeaker,
  } = useMediaStore()

  const [devices, setDevices] = useState<{
    microphones: MediaDeviceInfo[]
    cameras: MediaDeviceInfo[]
    speakers: MediaDeviceInfo[]
  }>({
    microphones: [],
    cameras: [],
    speakers: [],
  })

  useEffect(() => {
    const getDevices = async () => {
      try {
        const deviceList = await navigator.mediaDevices.enumerateDevices()
        setDevices({
          microphones: deviceList.filter(device => device.kind === 'audioinput'),
          cameras: deviceList.filter(device => device.kind === 'videoinput'),
          speakers: deviceList.filter(device => device.kind === 'audiooutput'),
        })
      } catch (error) {
        console.error('Error getting devices:', error)
      }
    }

    getDevices()
  }, [])

  const handleSave = () => {
    navigate(`/room/${roomName}`)
  }

  const handleCancel = () => {
    navigate(`/room/${roomName}`)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Device Settings</h1>

        {/* Microphone Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Microphone
          </label>
          <select
            value={selectedMic || ''}
            onChange={(e) => setMic(e.target.value)}
            className="input w-full"
          >
            <option value="">Default</option>
            {devices.microphones.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Microphone ${device.deviceId.slice(0, 8)}`}
              </option>
            ))}
          </select>
        </div>

        {/* Camera Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Camera
          </label>
          <select
            value={selectedCamera || ''}
            onChange={(e) => setCamera(e.target.value)}
            className="input w-full"
          >
            <option value="">Default</option>
            {devices.cameras.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId.slice(0, 8)}`}
              </option>
            ))}
          </select>
        </div>

        {/* Speaker Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Speaker
          </label>
          <select
            value={selectedSpeaker || ''}
            onChange={(e) => setSpeaker(e.target.value)}
            className="input w-full"
          >
            <option value="">Default</option>
            {devices.speakers.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Speaker ${device.deviceId.slice(0, 8)}`}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button onClick={handleSave} className="btn flex-1">
            Save Settings
          </button>
          <button onClick={handleCancel} className="btn-secondary flex-1">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
