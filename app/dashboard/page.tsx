'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, UserProgress } from '@/lib/supabase'
import { getCurrentWeek } from '@/lib/utils'
import { WORKOUT_DATA, DAY_NAMES, DayKey } from '@/lib/workoutData'

export default function DashboardPage() {
  const router = useRouter()
  const [username, setUsername] = useState<string>('')
  const [currentWeek, setCurrentWeek] = useState(1)
  const [startDate, setStartDate] = useState<string>('')
  const [completedDays, setCompletedDays] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('username')
    if (!user) {
      router.push('/')
      return
    }
    setUsername(user)
    initUser(user)
  }, [])

  async function initUser(user: string) {
    // Get or create user progress
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('username', user)
      .single()

    if (error || !data) {
      // New user — set start date to today
      const today = new Date().toISOString().split('T')[0]
      await supabase.from('user_progress').upsert({ username: user, start_date: today })
      setStartDate(today)
      setCurrentWeek(1)
    } else {
      const progress = data as UserProgress
      setStartDate(progress.start_date)
      const week = getCurrentWeek(progress.start_date)
      setCurrentWeek(week)
    }

    // Load completed days for all weeks
    const { data: logs } = await supabase
      .from('workout_logs')
      .select('week_number, day_key, completed')
      .eq('username', user)
      .eq('completed', true)

    if (logs) {
      const done = new Set<string>()
      logs.forEach((log: any) => {
        done.add(`${log.week_number}-${log.day_key}`)
      })
      setCompletedDays(done)
    }

    setLoading(false)
  }

  function isDayDone(week: number, day: DayKey): boolean {
    return completedDays.has(`${week}-${day}`)
  }

  function getWeekProgress(week: number): number {
    const days: DayKey[] = ['A', 'B', 'C']
    const done = days.filter(d => isDayDone(week, d)).length
    return Math.round((done / 3) * 100)
  }

  const displayWeek = selectedWeek ?? currentWeek
  const weekData = WORKOUT_DATA[displayWeek]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#1A1A2E' }}>
        <div className="text-purple-400 text-lg animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-8" style={{ background: '#1A1A2E' }}>
      {/* Header */}
      <div
        className="px-5 pt-12 pb-6"
        style={{ background: 'linear-gradient(180deg, #0F3460 0%, #1A1A2E 100%)' }}
      >
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-purple-300 text-sm">Welcome back</p>
            <h1 className="text-white text-2xl font-bold">{username} 💪</h1>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('username')
              router.push('/')
            }}
            className="text-gray-500 text-sm px-3 py-1 rounded-lg border border-gray-700"
          >
            Switch
          </button>
        </div>

        {/* Current week banner */}
        <div
          className="mt-4 rounded-2xl p-4"
          style={{ background: 'rgba(224, 64, 251, 0.15)', border: '1px solid rgba(224, 64, 251, 0.3)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-xs uppercase tracking-wider mb-1">Current Week</p>
              <p className="text-white text-xl font-bold">
                Week {currentWeek} {currentWeek === 10 ? '— DELOAD' : `of 9`}
              </p>
              <p className="text-purple-300 text-sm mt-0.5">{WORKOUT_DATA[currentWeek]?.phase}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold" style={{ color: '#E040FB' }}>
                {getWeekProgress(currentWeek)}%
              </div>
              <p className="text-gray-400 text-xs">this week</p>
            </div>
          </div>
        </div>
      </div>

      {/* Week selector */}
      <div className="px-5 mt-4">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Jump to Week</p>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {Array.from({ length: 10 }, (_, i) => i + 1).map(w => (
            <button
              key={w}
              onClick={() => setSelectedWeek(w === (selectedWeek ?? currentWeek) ? null : w)}
              className="flex-shrink-0 w-10 h-10 rounded-xl text-sm font-bold transition-all"
              style={{
                background: w === displayWeek
                  ? '#E040FB'
                  : w === currentWeek
                  ? 'rgba(224, 64, 251, 0.2)'
                  : 'rgba(255,255,255,0.07)',
                color: w === displayWeek ? 'white' : w < currentWeek ? '#888' : '#ddd',
                border: w === currentWeek && w !== displayWeek ? '1px solid rgba(224,64,251,0.4)' : 'none',
              }}
            >
              {w === 10 ? 'D' : w}
            </button>
          ))}
        </div>
      </div>

      {/* Workout days for selected week */}
      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold text-lg">
            Week {displayWeek} {displayWeek === 10 ? '— Deload' : ''}
          </h2>
          {displayWeek !== currentWeek && (
            <span className="text-xs text-gray-500 px-2 py-1 rounded-lg bg-gray-800">
              {displayWeek < currentWeek ? 'Completed' : 'Upcoming'}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {(['A', 'B', 'C'] as DayKey[]).map(day => {
            const done = isDayDone(displayWeek, day)
            return (
              <button
                key={day}
                onClick={() => router.push(`/workout?week=${displayWeek}&day=${day}`)}
                className="w-full rounded-2xl p-4 text-left transition-all active:scale-98"
                style={{
                  background: done
                    ? 'rgba(224, 64, 251, 0.12)'
                    : 'rgba(255,255,255,0.06)',
                  border: done
                    ? '1px solid rgba(224, 64, 251, 0.4)'
                    : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: done ? '#E040FB' : 'rgba(255,255,255,0.1)',
                          color: 'white',
                        }}
                      >
                        Day {day}
                      </span>
                      {done && <span className="text-green-400 text-xs">✓ Done</span>}
                    </div>
                    <p className="text-white font-medium text-sm">{DAY_NAMES[day]}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {weekData?.days[day]?.length ?? 7} exercises
                    </p>
                  </div>
                  <span className="text-gray-500 text-xl">›</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* All weeks overview */}
      <div className="px-5 mt-6">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Program Progress</p>
        <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map(w => {
            const pct = getWeekProgress(w)
            const isCurrent = w === currentWeek
            return (
              <button
                key={w}
                onClick={() => { setSelectedWeek(w); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left border-b last:border-b-0"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: isCurrent ? '#E040FB' : pct === 100 ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.07)',
                    color: isCurrent ? 'white' : pct === 100 ? '#4ade80' : '#888',
                  }}
                >
                  {w === 10 ? 'D' : w}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white">
                      {w === 10 ? 'Deload' : `Week ${w}`}
                      {isCurrent && <span className="text-purple-400 text-xs ml-2">← you are here</span>}
                    </span>
                    <span className="text-xs text-gray-500">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: pct === 100 ? '#4ade80' : '#E040FB',
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
