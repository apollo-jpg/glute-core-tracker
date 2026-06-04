'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, UserProgress } from '@/lib/supabase'
import { getCurrentWeek } from '@/lib/utils'
import { WORKOUT_DATA, DAY_NAMES, DAY_EMOJIS, DayKey } from '@/lib/workoutData'

export default function DashboardPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [currentWeek, setCurrentWeek] = useState(1)
  const [completedDays, setCompletedDays] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('username')
    if (!user) { router.push('/'); return }
    setUsername(user)
    init(user)
  }, [])

  async function init(user: string) {
    const { data } = await supabase
      .from('user_progress')
      .select('*')
      .eq('username', user)
      .single()

    let week = 1
    if (!data) {
      const today = new Date().toISOString().split('T')[0]
      await supabase.from('user_progress').upsert({ username: user, start_date: today })
    } else {
      week = getCurrentWeek((data as UserProgress).start_date)
    }
    setCurrentWeek(week)

    const { data: logs } = await supabase
      .from('workout_logs')
      .select('week_number, day_key')
      .eq('username', user)
      .eq('completed', true)

    if (logs) {
      const done = new Set<string>()
      logs.forEach((l: any) => done.add(`${l.week_number}-${l.day_key}`))
      setCompletedDays(done)
    }
    setLoading(false)
  }

  const isDayDone = (w: number, d: DayKey) => completedDays.has(`${w}-${d}`)

  const weekDoneCount = (w: number) =>
    (['A', 'B', 'C'] as DayKey[]).filter(d => isDayDone(w, d)).length

  const displayWeek = selectedWeek ?? currentWeek
  const weekData = WORKOUT_DATA[displayWeek]
  const totalWeeksDone = Array.from({ length: 10 }, (_, i) => i + 1).filter(w => weekDoneCount(w) === 3).length

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0D0D1A' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          <p className="text-sm" style={{ color: '#666' }}>Loading your program...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-10" style={{ background: '#0D0D1A' }}>

      {/* Header */}
      <div className="pt-14 pb-5 px-5" style={{ background: 'linear-gradient(180deg, #141428 0%, #0D0D1A 100%)' }}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm mb-1" style={{ color: '#9966CC' }}>Hey {username} 👋</p>
            <h1 className="text-2xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              LIFT TRACKER
            </h1>
          </div>
          <button
            onClick={() => { localStorage.removeItem('username'); router.push('/') }}
            className="mt-1 px-3 py-1.5 rounded-xl text-xs font-medium"
            style={{ background: 'rgba(255,255,255,0.07)', color: '#888' }}
          >
            Switch
          </button>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 mt-5">
          <StatChip label="Current Week" value={`Wk ${currentWeek}`} accent="#E040FB" />
          <StatChip label="Weeks Done" value={`${totalWeeksDone}/10`} accent="#7C4DFF" />
          <StatChip label="This Week" value={`${weekDoneCount(currentWeek)}/3`} accent="#00BCD4" />
        </div>
      </div>

      {/* Week selector */}
      <div className="px-5 mt-4">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#555' }}>
          Jump to week
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map(w => {
            const done = weekDoneCount(w)
            const isCurrent = w === currentWeek
            const isSelected = w === displayWeek
            return (
              <button
                key={w}
                onClick={() => setSelectedWeek(w === displayWeek ? null : w)}
                className="flex-shrink-0 flex flex-col items-center justify-center rounded-2xl transition-all active:scale-90"
                style={{
                  width: 52,
                  height: 52,
                  background: isSelected
                    ? 'linear-gradient(135deg, #E040FB, #9C27B0)'
                    : isCurrent
                    ? 'rgba(224,64,251,0.15)'
                    : 'rgba(255,255,255,0.05)',
                  border: isCurrent && !isSelected ? '1.5px solid rgba(224,64,251,0.5)' : '1.5px solid transparent',
                  boxShadow: isSelected ? '0 4px 14px rgba(224,64,251,0.4)' : 'none',
                }}
              >
                <span className="text-sm font-black text-white">
                  {w === 10 ? '💤' : w}
                </span>
                {done > 0 && !isSelected && (
                  <div className="flex gap-0.5 mt-1">
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full"
                        style={{ background: i < done ? '#E040FB' : 'rgba(255,255,255,0.15)' }}
                      />
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected week workouts */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-white font-bold text-lg">
              {displayWeek === 10 ? 'Deload Week 💤' : `Week ${displayWeek}`}
            </h2>
            <p className="text-xs mt-0.5" style={{ color: '#666' }}>
              {weekData?.phase}
            </p>
          </div>
          {displayWeek !== currentWeek && (
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                background: displayWeek < currentWeek ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.06)',
                color: displayWeek < currentWeek ? '#4ade80' : '#666',
              }}
            >
              {displayWeek < currentWeek ? '✓ Past' : 'Upcoming'}
            </span>
          )}
        </div>

        {/* Effort guide */}
        {weekData?.effortGuide && (
          <div
            className="rounded-2xl px-4 py-3 mb-3 text-xs leading-relaxed"
            style={{ background: 'rgba(224,64,251,0.08)', border: '1px solid rgba(224,64,251,0.15)', color: '#CC88EE' }}
          >
            💡 {weekData.effortGuide}
          </div>
        )}

        <div className="flex flex-col gap-2.5">
          {(['A', 'B', 'C'] as DayKey[]).map(day => {
            const done = isDayDone(displayWeek, day)
            const exCount = weekData?.days[day]?.length ?? 7
            return (
              <button
                key={day}
                onClick={() => router.push(`/workout?week=${displayWeek}&day=${day}`)}
                className="w-full rounded-2xl p-4 text-left transition-all active:scale-98"
                style={{
                  background: done ? 'rgba(74,222,128,0.07)' : 'rgba(255,255,255,0.05)',
                  border: `1.5px solid ${done ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{
                      background: done
                        ? 'rgba(74,222,128,0.15)'
                        : 'rgba(255,255,255,0.07)',
                    }}
                  >
                    {done ? '✅' : DAY_EMOJIS[day]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: done ? 'rgba(74,222,128,0.2)' : 'rgba(255,255,255,0.1)', color: done ? '#4ade80' : '#aaa' }}
                      >
                        Day {day}
                      </span>
                      {done && <span className="text-xs font-semibold" style={{ color: '#4ade80' }}>Complete</span>}
                    </div>
                    <p className="text-white font-semibold text-sm mt-1">{DAY_NAMES[day]}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#555' }}>{exCount} exercises</p>
                  </div>
                  <span className="text-xl flex-shrink-0" style={{ color: '#444' }}>›</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Full program overview */}
      <div className="px-5 mt-6">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#555' }}>
          Full program
        </p>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map(w => {
            const done = weekDoneCount(w)
            const isCurrent = w === currentWeek
            const pct = Math.round((done / 3) * 100)
            return (
              <button
                key={w}
                onClick={() => { setSelectedWeek(w); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left border-b last:border-b-0 active:bg-white/5 transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                  style={{
                    background: isCurrent
                      ? 'linear-gradient(135deg, #E040FB, #9C27B0)'
                      : done === 3
                      ? 'rgba(74,222,128,0.15)'
                      : 'rgba(255,255,255,0.07)',
                    color: isCurrent ? 'white' : done === 3 ? '#4ade80' : '#666',
                    boxShadow: isCurrent ? '0 2px 10px rgba(224,64,251,0.4)' : 'none',
                  }}
                >
                  {w === 10 ? '💤' : w}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-white">
                      {w === 10 ? 'Deload' : `Week ${w}`}
                      {isCurrent && (
                        <span className="ml-2 text-xs font-normal" style={{ color: '#9966CC' }}>← you are here</span>
                      )}
                    </span>
                    <span className="text-xs" style={{ color: done === 3 ? '#4ade80' : '#444' }}>
                      {done}/3
                    </span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        background: done === 3 ? '#4ade80' : 'linear-gradient(90deg, #E040FB, #9C27B0)',
                      }}
                    />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function StatChip({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div
      className="flex-1 rounded-2xl px-3 py-3 flex flex-col gap-1"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <span className="text-xs" style={{ color: '#555' }}>{label}</span>
      <span className="text-base font-black" style={{ color: accent }}>{value}</span>
    </div>
  )
}
