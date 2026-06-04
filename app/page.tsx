'use client'

import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  const handleLogin = (username: string) => {
    localStorage.setItem('username', username)
    router.push('/dashboard')
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)' }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🏋️</div>
          <h1 className="text-3xl font-bold text-white mb-2">LIFT TRACKER</h1>
          <p className="text-purple-300 text-lg">9-Week Program</p>
          <p className="text-gray-400 text-sm mt-2">Who's logging in?</p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleLogin('Angel')}
            className="w-full py-5 rounded-2xl text-white text-xl font-bold transition-all active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #E040FB, #9C27B0)',
              boxShadow: '0 4px 24px rgba(224, 64, 251, 0.4)',
            }}
          >
            Angel
          </button>
          <button
            onClick={() => handleLogin('Macy')}
            className="w-full py-5 rounded-2xl text-white text-xl font-bold transition-all active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #7C4DFF, #5C35CC)',
              boxShadow: '0 4px 24px rgba(124, 77, 255, 0.4)',
            }}
          >
            Macy
          </button>
        </div>
      </div>
    </div>
  )
}
