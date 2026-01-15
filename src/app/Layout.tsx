import { Outlet } from 'react-router-dom'

interface LayoutProps {
  children?: React.ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-8">
        {children || <Outlet />}
      </main>
    </div>
  )
}

export default Layout
