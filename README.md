# LiveMeet - Video Conferencing App

A Zoom-like video conferencing application built with React, TypeScript, and LiveKit.

## Features

- **Real-time video conferencing** with LiveKit WebRTC
- **Adaptive video grid** supporting 1-100+ participants
- **Audio/Video controls** (mute/unmute, camera on/off)
- **Screen sharing** capabilities
- **Device selection** (microphone, camera, speaker)
- **Connection quality indicators**
- **Responsive design** with Tailwind CSS
- **TypeScript** for type safety
- **Modern React** with hooks and functional components

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Routing**: React Router v7 (Data Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Video Conferencing**: LiveKit Client SDK
- **Build Tool**: Vite
- **Linting**: ESLint + Prettier

## Project Structure

```
src/
├── app/
│   ├── App.tsx          # Main app component with routing
│   └── Layout.tsx       # Layout wrapper
├── components/
│   ├── VideoGrid/       # Video grid component
│   ├── ControlBar/      # Meeting controls
│   └── ParticipantTile/ # Individual participant video
├── pages/
│   ├── Landing.tsx      # Join/Create room page
│   ├── Room.tsx         # Main meeting room
│   ├── Settings.tsx     # Device settings
│   └── Leave.tsx        # Leave confirmation
├── hooks/
│   ├── useLiveKitRoom.ts    # LiveKit room connection hook
│   └── useMediaDevices.ts   # Media device management
├── stores/
│   └── mediaStore.ts    # Zustand state management
├── services/
│   ├── livekit.ts       # LiveKit service wrapper
│   └── api.ts          # API service for tokens
├── styles/
│   └── index.css       # Global styles and Tailwind
└── utils/              # Utility functions
```

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- LiveKit server (for production)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd livemeet
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional for development):
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the root directory:

```env
# LiveKit Server Configuration
VITE_LIVEKIT_SERVER_URL=wss://your-livekit-server.com
VITE_LIVEKIT_API_KEY=your-api-key
VITE_LIVEKIT_API_SECRET=your-api-secret

# API Base URL (for token generation)
VITE_API_BASE_URL=https://your-backend-api.com
```

## Docker Setup

### Build the Docker Image

```bash
docker build -t livemeet .
```

### Run with Docker

```bash
docker run -p 3000:3000 livemeet
```

### Docker Compose (with LiveKit)

```yaml
version: '3.8'
services:
  livemeet:
    build: .
    ports:
      - "3000:3000"
    environment:
      - VITE_LIVEKIT_SERVER_URL=wss://livekit-server:7880
    depends_on:
      - livekit-server

  livekit-server:
    image: livekit/livekit-server:latest
    ports:
      - "7880:7880"
      - "7881:7881"
      - "5000:5000"
    environment:
      - LIVEKIT_KEYS_FILE=/livekit/keys.yaml
    volumes:
      - ./livekit-config:/livekit
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Code Quality

The project uses ESLint and Prettier for code quality. Run `npm run lint` and `npm run format` before committing.

### Architecture Notes

- **Lazy Loading**: Route components are lazy-loaded for better performance
- **State Management**: Zustand is used for global state (media controls, device selection)
- **LiveKit Integration**: Custom hooks and services wrap LiveKit functionality
- **Responsive Design**: Tailwind CSS provides responsive grid layouts
- **Type Safety**: Full TypeScript coverage with strict mode enabled

## Backend Requirements

This is a frontend-only application. You'll need a backend service that:

1. Generates LiveKit access tokens
2. Handles room creation/management
3. Provides authentication (optional)

### Token Generation Example

```typescript
// Backend endpoint for token generation
app.post('/api/token', async (req, res) => {
  const { roomName, userName } = req.body

  const token = new AccessToken(apiKey, apiSecret, {
    identity: userName,
    name: userName,
  })

  token.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
  })

  res.json({ token: token.toJwt() })
})
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

ISC License

## Acknowledgments

- [LiveKit](https://livekit.io/) for the WebRTC infrastructure
- [React](https://reactjs.org/) for the UI framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
