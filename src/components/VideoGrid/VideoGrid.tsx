import { Room, Track } from 'livekit-client'
import {
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from '@livekit/components-react'

interface VideoGridProps {
  room: Room | null
}

export function VideoGrid({ room }: VideoGridProps) {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
    { source: Track.Source.ScreenShare, withPlaceholder: false },
  ])

  if (!room) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Connecting to room...</p>
      </div>
    )
  }

  return (
    <div className="h-full w-full bg-gray-900 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
        {tracks.map((track) => (
          <ParticipantTile key={track.participant.identity} trackRef={track} />
        ))}
      </div>
      <RoomAudioRenderer />
    </div>
  )
}
