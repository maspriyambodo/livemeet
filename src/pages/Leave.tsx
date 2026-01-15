import { useNavigate } from 'react-router-dom'

function Leave() {
  const navigate = useNavigate()

  const handleLeave = () => {
    // In a real app, you might want to show a confirmation dialog
    navigate('/')
  }

  const handleCancel = () => {
    // Go back to the previous page (room)
    navigate(-1)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Leave Meeting</h1>
          <p className="text-gray-400 mb-6">
            Are you sure you want to leave the meeting?
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleLeave}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Leave Meeting
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leave
