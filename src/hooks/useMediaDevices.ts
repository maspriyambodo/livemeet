import { useState, useEffect } from 'react'

export interface MediaDevices {
  microphones: MediaDeviceInfo[]
  cameras: MediaDeviceInfo[]
  speakers: MediaDeviceInfo[]
}

export function useMediaDevices() {
  const [devices, setDevices] = useState<MediaDevices>({
    microphones: [],
    cameras: [],
    speakers: [],
  })
  const [permissionGranted, setPermissionGranted] = useState(false)

  useEffect(() => {
    const getDevices = async () => {
      try {
        // Request permissions first
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        setPermissionGranted(true)

        const deviceList = await navigator.mediaDevices.enumerateDevices()
        setDevices({
          microphones: deviceList.filter(device => device.kind === 'audioinput'),
          cameras: deviceList.filter(device => device.kind === 'videoinput'),
          speakers: deviceList.filter(device => device.kind === 'audiooutput'),
        })
      } catch (error) {
        console.error('Error accessing media devices:', error)
        setPermissionGranted(false)
      }
    }

    getDevices()

    // Listen for device changes
    const handleDeviceChange = () => {
      getDevices()
    }

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange)

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange)
    }
  }, [])

  return { devices, permissionGranted }
}
