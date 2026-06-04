'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase, WorkoutLog } from '@/lib/supabase'
import { WORKOUT_DATA, DAY_NAMES, DayKey, Exercise } from '@/lib/workoutData'
import { Suspense } from 'react'

type LogMap = Record<string, { completed: boolean; weight_lbs: number | null; note: string | null }>

function WorkoutContent() {
  const router = useRouter()
  const params = useSearchParams()
  const week = parseInt(params.get('week') ?? '1')
  const day = (params.get('day') ?? 'A') as DayKey

  const [username, setUsername] = useState('')
  const [logs, setLogs] = useState<LogMap>({})
  const [saving, setSaving] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)

  const weekData = WORKOUT_DATA[week]
  const exercises = weekData?.days[day] ?? []

  useEffect(() => {
    const user = localStorage.getItem('username')
    if (!user) { router.push('/'); return }
    setUsername(user)
    loadLogs(user)
  }, [week, day])

  async function loadLogs(user: string) {
    const { data } = await supabase
      .from('workout_logs')
      .select('*')
      .eq('username', user)
      .eq('week_number', week)
      .eq('day_key', day)

    if (data) {
      const map: LogMap = {}
      data.forEach((row: WorkoutLog) => {
        map[row.exercise_name] = {
          completed: row.completed,
          weight_lbs: row.weight_lbs,
          note: row.note,
        }
      })
      setLogs(map)
    }
    setLoading(false)
  }

  const saveLog = useCallback(
    async (exercise: Exercise, field: 'completed' | 'weight_lbs' | 'note', value: boolean | number | string | null) => {
      const current = logs[exercise.name] ?? { completed: false, weight_lbs: null, note: null }
      const updated = { ...current, [field]: value }

      setLogs(prev => ({ ...prev, [exercise.name]: updated }))
      setSaving(prev => ({ ...prev, [exercise.name]: true }))

      await supabase.from('workout_logs').upsert(
        {
          username,
          week_number: week,
          day_key: day,
          exercise_name: exercise.name,
          completed: updated.completed,
          weight_lbs: updated.weight_lbs,
          note: updated.note,
          logged_at: new Date().toISOString(),
        },
        { onConflict: 'username,week_number,day_key,exercise_name' }
      )

      setSaving(prev => ({ ...prev, [exercise.name]: false }))
    },
    [logs, username, week, day]
  )

  const completedCount = exercises.filter(e => logs[e.name]?.completed).length
  const allDone = completedCount === exercises.length && exercises.length > 0

  // Group exercises into supersets
  type GroupedItem = { type: 'single'; exercise: Exercise } | { type: 'superset'; label: string; exercises: Exercise[] }

  function groupExercises(exs: Exercise[]): GroupedItem[] {
    const groups: GroupedItem[] = []
    let i = 0
    while (i < exs.length) {
      const ex = exs[i]
      if (ex.is_superset) {
        const prefix = ex.name.split(':')[0] // e.g. "A1"
        const setLetter = prefix.replace(/\d/, '')
        const supersetGroup: Exercise[] = [ex]
        i++
        while (i < exs.length && exs[i].is_superset && exs[i].name.startsWith(setLetter)) {
          supersetGroup.push(exs[i])
          i++
        }
        groups.push({ type: 'superset', label: `Superset ${setLetter}`, exercises: supersetGroup })
      } else {
        groups.push({ type: 'single', exercise: ex })
        i++
      }
    }
    return groups
  }

  const grouped = groupExercises(exercises)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#1A1A2E' }}>
        <div className="text-purple-400 animate-pulse">Loading workout...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: '#1A1A2E' }}>
      {/* Header */}
      <div
        className="px-5 pt-12 pb-5 sticky top-0 z-10"
        style={{ background: 'linear-gradient(180deg, #0F3460 0%, #1A1A2E 100%)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-gray-400 text-2xl leading-none"
          >
            ‹
          </button>
          <div className="flex-1">
            <p className="text-gray-400 text-xs">Week {week} · {weekData?.phase}</p>
            <h1 className="text-white font-bold text-lg leading-tight">{DAY_NAMES[day]}</h1>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold" style={{ color: allDone ? '#4ade80' : '#E040FB' }}>
              {completedCount}/{exercises.length}
            </span>
            <p className="text-gray-500 text-xs">done</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${exercises.length ? (completedCount / exercises.length) * 100 : 0}%`,
              background: allDone ? '#4ade80' : '#E040FB',
            }}
          />
        </div>
      </div>

      {/* Exercises */}
      <div className="px-4 pt-4 flex flex-col gap-3">
        {grouped.map((group, gi) => {
          if (group.type === 'superset') {
            return (
              <div
                key={gi}
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(124, 77, 255, 0.4)', background: 'rgba(124, 77, 255, 0.06)' }}
              >
                <div className="px-4 py-2 flex items-center gap-2" style={{ background: 'rgba(124,77,255,0.15)' }}>
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                    ⚡ {group.label} — Do back to back, no rest between
                  </span>
                </div>
                {group.exercises.map((ex, ei) => (
                  <div key={ei} className="border-t" style={{ borderColor: 'rgba(124,77,255,0.2)' }}>
                    <ExerciseCard
                      exercise={ex}
                      log={logs[ex.name]}
                      saving={saving[ex.name]}
                      onSave={(field, val) => saveLog(ex, field, val)}
                    />
                  </div>
                ))}
              </div>
            )
          }
          return (
            <ExerciseCard
              key={gi}
              exercise={group.exercise}
              log={logs[group.exercise.name]}
              saving={saving[group.exercise.name]}
              onSave={(field, val) => saveLog(group.exercise, field, val)}
            />
          )
        })}
      </div>

      {/* Bottom done button */}
      {allDone && (
        <div className="fixed bottom-0 left-0 right-0 px-4 pb-8 pt-4" style={{ background: 'linear-gradient(0deg, #1A1A2E 80%, transparent)' }}>
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg, #4ade80, #22c55e)', boxShadow: '0 4px 20px rgba(74,222,128,0.4)' }}
          >
            Workout Complete! 🎉
          </button>
        </div>
      )}
    </div>
  )
}

function ExerciseCard({
  exercise,
  log,
  saving,
  onSave,
}: {
  exercise: Exercise
  log: LogMap[string] | undefined
  saving: boolean | undefined
  onSave: (field: 'completed' | 'weight_lbs' | 'note', value: boolean | number | string | null) => void
}) {
  const completed = log?.completed ?? false
  const weight = log?.weight_lbs ?? ''
  const note = log?.note ?? ''
  const [showNote, setShowNote] = useState(!!note)
  const [noteVal, setNoteVal] = useState(note ?? '')
  const [noteTimer, setNoteTimer] = useState<ReturnType<typeof setTimeout> | null>(null)

  const cleanName = exercise.name.replace(/^[ABC][12]: /, '')

  return (
    <div
      className="rounded-2xl p-4 transition-all"
      style={{
        background: completed ? 'rgba(224, 64, 251, 0.1)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${completed ? 'rgba(224,64,251,0.3)' : 'rgba(255,255,255,0.07)'}`,
      }}
    >
      {/* Top row: name + toggle */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-base leading-snug">{cleanName}</h3>
          <p className="text-gray-400 text-xs mt-0.5">
            {exercise.working_sets} sets × {exercise.reps}
            {exercise.warmup_sets && exercise.warmup_sets !== '0' && ` · ${exercise.warmup_sets} warm-up`}
            {exercise.rest && exercise.rest !== '0 min' && ` · rest ${exercise.rest}`}
          </p>
        </div>

        {/* Complete toggle */}
        <button
          onClick={() => onSave('completed', !completed)}
          className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all active:scale-90"
          style={{
            background: completed ? '#E040FB' : 'rgba(255,255,255,0.1)',
          }}
        >
          {completed ? (
            <span className="text-white text-lg">✓</span>
          ) : (
            <span className="text-gray-500 text-lg">○</span>
          )}
        </button>
      </div>

      {/* Weight input */}
      <div className="mt-3 flex items-center gap-2">
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2 flex-1"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <span className="text-gray-400 text-sm">🏋️</span>
          <input
            type="number"
            inputMode="decimal"
            placeholder="Weight (lbs)"
            value={weight === null || weight === '' ? '' : weight}
            onChange={e => {
              const v = e.target.value === '' ? null : parseFloat(e.target.value)
              onSave('weight_lbs', v)
            }}
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-600 min-w-0"
          />
          <span className="text-gray-600 text-xs">lbs</span>
        </div>

        <button
          onClick={() => setShowNote(v => !v)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0"
          style={{ background: showNote || noteVal ? 'rgba(224,64,251,0.2)' : 'rgba(255,255,255,0.07)' }}
        >
          📝
        </button>
      </div>

      {/* Note */}
      {showNote && (
        <div className="mt-2">
          <textarea
            rows={2}
            placeholder="Optional note..."
            value={noteVal}
            onChange={e => {
              setNoteVal(e.target.value)
              if (noteTimer) clearTimeout(noteTimer)
              const t = setTimeout(() => onSave('note', e.target.value || null), 800)
              setNoteTimer(t)
            }}
            className="w-full rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 outline-none resize-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          />
        </div>
      )}

      {/* Coaching cue */}
      {exercise.cue && (
        <p className="mt-2 text-xs italic leading-relaxed" style={{ color: '#7766aa' }}>
          💡 {exercise.cue}
        </p>
      )}

      {saving && (
        <p className="text-right text-xs mt-1" style={{ color: '#555' }}>saving...</p>
      )}
    </div>
  )
}

export default function WorkoutPage() {
  return (
    <Suspense>
      <WorkoutContent />
    </Suspense>
  )
}
