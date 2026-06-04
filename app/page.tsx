'use client'

import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()

  const login = (username: string) => {
    localStorage.setItem('username', username)
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0D0D1A' }}>
      {/* Top decorative gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(224,64,251,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative flex flex-col flex-1 items-center justify-between px-6 py-12">
        {/* Logo area */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="mb-6">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 text-4xl"
              style={{ background: 'linear-gradient(135deg, #E040FB22, #7C4DFF22)', border: '1px solid rgba(224,64,251,0.3)' }}
            >
              🏋️
            </div>
            <h1
              className="text-4xl font-black tracking-tight text-white mb-2"
              style={{ letterSpacing: '-0.02em' }}
            >
              LIFT TRACKER
            </h1>
            <p className="text-base" style={{ color: '#9966CC' }}>
              9-Week Glute &amp; Core Program
            </p>
          </div>

          <div
            className="rounded-2xl px-5 py-4 mb-8 text-sm text-center max-w-xs"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#888' }}
          >
            Track your weights, mark sets done,<br />and never lose your progress.
          </div>
        </div>

        {/* Login buttons */}
        <div className="w-full max-w-sm">
          <p className="text-center text-sm mb-4" style={{ color: '#666' }}>
            Who's training today?
          </p>

          <div className="flex flex-col gap-3">
            <UserButton name="Angel" color="#E040FB" shadow="rgba(224,64,251,0.35)" onPress={() => login('Angel')} />
            <UserButton name="Macy" color="#7C4DFF" shadow="rgba(124,77,255,0.35)" onPress={() => login('Macy')} />
          </div>
        </div>

        <div className="h-8" />
      </div>
    </div>
  )
}

function UserButton({
  name,
  color,
  shadow,
  onPress,
}: {
  name: string
  color: string
  shadow: string
  onPress: () => void
}) {
  return (
    <button
      onClick={onPress}
      className="w-full rounded-2xl flex items-center justify-between px-6 transition-all active:scale-95"
      style={{
        background: `linear-gradient(135deg, ${color}22, ${color}11)`,
        border: `1px solid ${color}44`,
        height: '72px',
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black text-white"
          style={{ background: color, boxShadow: `0 4px 14px ${shadow}` }}
        >
          {name[0]}
        </div>
        <span className="text-white text-lg font-bold">{name}</span>
      </div>
      <span style={{ color: color }} className="text-2xl">→</span>
    </button>
  )
}
