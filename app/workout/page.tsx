'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase, WorkoutLog } from '@/lib/supabase'
import { WORKOUT_DATA, DAY_NAMES, DAY_EMOJIS, DayKey, Exercise } from '@/lib/workoutData'

type Log = { completed: boolean; weight_lbs: number | null; note: string | null }
type LogMap = Record<string, Log>

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
    load(user)
  }, [week, day])

  async function load(user: string) {
    const { data } = await supabase
      .from('workout_logs')
      .select('*')
      .eq('username', user)
      .eq('week_number', week)
      .eq('day_key', day)

    if (data) {
      const map: LogMap = {}
      data.forEach((r: WorkoutLog) => {
        map[r.exercise_name] = { completed: r.completed, weight_lbs: r.weight_lbs, note: r.note }
      })
      setLogs(map)
    }
    setLoading(false)
  }

  const save = useCallback(async (
    exercise: Exercise,
    field: keyof Log,
    value: boolean | number | string | null
  ) => {
    const cur = logs[exercise.name] ?? { completed: false, weight_lbs: null, note: null }
    const updated = { ...cur, [field]: value }
    setLogs(prev => ({ ...prev, [exercise.name]: updated }))
    setSaving(prev => ({ ...prev, [exercise.name]: true }))

    await supabase.from('workout_logs').upsert({
      username,
      week_number: week,
      day_key: day,
      exercise_name: exercise.name,
      completed: updated.completed,
      weight_lbs: updated.weight_lbs,
      note: updated.note,
      logged_at: new Date().toISOString(),
    }, { onConflict: 'username,week_number,day_key,exercise_name' })

    setSaving(prev => ({ ...prev, [exercise.name]: false }))
  }, [logs, username, week, day])

  const doneCount = exercises.filter(e => logs[e.name]?.completed).length
  const allDone = doneCount === exercises.length && exercises.length > 0

  // Group into supersets
  type Group =
    | { type: 'single'; exercise: Exercise }
    | { type: 'superset'; label: string; exercises: Exercise[] }

  function group(exs: Exercise[]): Group[] {
    const out: Group[] = []
    let i = 0
    while (i < exs.length) {
      const ex = exs[i]
      if (ex.is_superset && ex.superset_group) {
        const g = ex.superset_group
        const pairs: Exercise[] = []
        while (i < exs.length && exs[i].is_superset && exs[i].superset_group === g) {
          pairs.push(exs[i]); i++
        }
        out.push({ type: 'superset', label: `Superset ${g}`, exercises: pairs })
      } else {
        out.push({ type: 'single', exercise: ex }); i++
      }
    }
    return out
  }

  const grouped = group(exercises)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0D0D1A' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          <p className="text-sm" style={{ color: '#666' }}>Loading workout...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#0D0D1A' }}>

      {/* Sticky header */}
      <div
        className="sticky top-0 z-20 px-4 pt-12 pb-4"
        style={{ background: 'linear-gradient(180deg, #141428 0%, #0D0D1Aee 90%, transparent)' }}
      >
        {/* Back + title */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 active:scale-90 transition-all"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          >
            <span className="text-white text-xl leading-none" style={{ marginTop: '-1px' }}>‹</span>
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs" style={{ color: '#666' }}>
              Week {week} · {weekData?.phase?.split('—')[0].trim()}
            </p>
            <h1 className="text-white font-black text-lg leading-tight truncate" style={{ letterSpacing: '-0.01em' }}>
              {DAY_EMOJIS[day]} {DAY_NAMES[day]}
            </h1>
          </div>
          <div
            className="flex-shrink-0 px-3 py-1.5 rounded-xl text-sm font-black"
            style={{
              background: allDone ? 'rgba(74,222,128,0.15)' : 'rgba(224,64,251,0.15)',
              color: allDone ? '#4ade80' : '#E040FB',
            }}
          >
            {doneCount}/{exercises.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${exercises.length ? (doneCount / exercises.length) * 100 : 0}%`,
              background: allDone
                ? '#4ade80'
                : 'linear-gradient(90deg, #E040FB, #9C27B0)',
            }}
          />
        </div>
      </div>

      {/* Effort guide */}
      {weekData?.effortGuide && (
        <div className="px-4 mb-2">
          <div
            className="rounded-xl px-4 py-2.5 text-xs leading-relaxed"
            style={{ background: 'rgba(224,64,251,0.07)', color: '#9966BB' }}
          >
            💡 {weekData.effortGuide}
          </div>
        </div>
      )}

      {/* Exercise list */}
      <div className="px-4 pb-36 flex flex-col gap-3">
        {grouped.map((g, gi) => {
          if (g.type === 'superset') {
            return (
              <div
                key={gi}
                className="rounded-2xl overflow-hidden"
                style={{ border: '1.5px solid rgba(124,77,255,0.35)', background: 'rgba(124,77,255,0.05)' }}
              >
                <div
                  className="px-4 py-2.5 flex items-center gap-2"
                  style={{ background: 'rgba(124,77,255,0.12)', borderBottom: '1px solid rgba(124,77,255,0.2)' }}
                >
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#9988EE' }}>
                    ⚡ {g.label} — No rest between, go back-to-back
                  </span>
                </div>
                {g.exercises.map((ex, ei) => (
                  <div
                    key={ei}
                    style={ei > 0 ? { borderTop: '1px solid rgba(124,77,255,0.15)' } : {}}
                  >
                    <ExerciseCard
                      exercise={ex}
                      log={logs[ex.name]}
                      saving={saving[ex.name]}
                      onSave={(f, v) => save(ex, f, v)}
                    />
                  </div>
                ))}
              </div>
            )
          }
          return (
            <ExerciseCard
              key={gi}
              exercise={g.exercise}
              log={logs[g.exercise.name]}
              saving={saving[g.exercise.name]}
              onSave={(f, v) => save(g.exercise, f, v)}
            />
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 px-4 pb-10 pt-6"
        style={{ background: 'linear-gradient(0deg, #0D0D1A 70%, transparent)' }}
      >
        {allDone ? (
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-4 rounded-2xl text-white font-black text-lg transition-all active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #4ade80, #22c55e)',
              boxShadow: '0 4px 24px rgba(74,222,128,0.4)',
              letterSpacing: '-0.01em',
            }}
          >
            Workout Complete 🎉
          </button>
        ) : (
          <div
            className="w-full py-3.5 rounded-2xl text-center text-sm font-semibold"
            style={{ background: 'rgba(255,255,255,0.04)', color: '#555', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {exercises.length - doneCount} exercise{exercises.length - doneCount !== 1 ? 's' : ''} remaining
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Exercise Card ──────────────────────────────────────────────────────────

function ExerciseCard({
  exercise,
  log,
  saving,
  onSave,
}: {
  exercise: Exercise
  log: Log | undefined
  saving: boolean | undefined
  onSave: (field: keyof Log, value: boolean | number | string | null) => void
}) {
  const completed = log?.completed ?? false
  const weightVal = log?.weight_lbs
  const [noteOpen, setNoteOpen] = useState(!!(log?.note))
  const [noteText, setNoteText] = useState(log?.note ?? '')
  const [noteDebounce, setNoteDebounce] = useState<ReturnType<typeof setTimeout> | null>(null)

  const cleanName = exercise.name.replace(/^[ABC][12]: /, '')

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      style={{
        background: completed ? 'rgba(224,64,251,0.08)' : 'rgba(255,255,255,0.04)',
        border: `1.5px solid ${completed ? 'rgba(224,64,251,0.25)' : 'rgba(255,255,255,0.08)'}`,
      }}
    >
      {/* Exercise name + sets/reps */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-base leading-snug">{cleanName}</h3>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: '#666' }}>
              <span className="font-semibold" style={{ color: '#9966CC' }}>{exercise.working_sets} sets</span>
              {' · '}
              <span className="font-semibold" style={{ color: '#9966CC' }}>{exercise.reps}</span>
              {exercise.warmup_sets && exercise.warmup_sets !== '0' && (
                <span> · {exercise.warmup_sets} warm-up sets</span>
              )}
              {exercise.rest && exercise.rest !== '0 sec' && exercise.rest !== '0 min' && (
                <span> · rest {exercise.rest}</span>
              )}
            </p>
          </div>

          {/* Big complete toggle */}
          <button
            onClick={() => onSave('completed', !completed)}
            className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all active:scale-90"
            style={{
              background: completed
                ? 'linear-gradient(135deg, #E040FB, #9C27B0)'
                : 'rgba(255,255,255,0.08)',
              boxShadow: completed ? '0 4px 14px rgba(224,64,251,0.4)' : 'none',
            }}
          >
            {completed
              ? <span className="text-white text-xl">✓</span>
              : <span className="text-2xl" style={{ color: '#444' }}>○</span>
            }
          </button>
        </div>
      </div>

      {/* Weight input row */}
      <div
        className="mx-4 mb-3 rounded-xl flex items-center gap-3 px-4"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', height: 52 }}
      >
        <span className="text-lg flex-shrink-0">🏋️</span>
        <input
          type="number"
          inputMode="decimal"
          placeholder="Weight used"
          value={weightVal ?? ''}
          onChange={e => {
            const v = e.target.value === '' ? null : parseFloat(e.target.value)
            onSave('weight_lbs', v)
          }}
          className="flex-1 bg-transparent text-white text-base font-semibold outline-none min-w-0"
          style={{ '::placeholder': { color: '#444' } } as any}
        />
        <span className="text-sm flex-shrink-0 font-medium" style={{ color: '#555' }}>lbs</span>
        <button
          onClick={() => setNoteOpen(v => !v)}
          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all"
          style={{ background: noteOpen || noteText ? 'rgba(224,64,251,0.2)' : 'rgba(255,255,255,0.07)' }}
        >
          <span className="text-sm">📝</span>
        </button>
      </div>

      {/* Note */}
      {noteOpen && (
        <div className="px-4 pb-3">
          <textarea
            rows={2}
            placeholder="Add a note (optional)..."
            value={noteText}
            onChange={e => {
              setNoteText(e.target.value)
              if (noteDebounce) clearTimeout(noteDebounce)
              const t = setTimeout(() => onSave('note', e.target.value || null), 600)
              setNoteDebounce(t)
            }}
            className="w-full rounded-xl px-3 py-2.5 text-sm text-white outline-none resize-none"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#ccc',
            }}
          />
        </div>
      )}

      {/* Coaching cue */}
      <div
        className="px-4 py-3 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
      >
        <p className="text-xs leading-relaxed italic" style={{ color: '#5a4a6a' }}>
          {exercise.cue}
        </p>
      </div>

      {saving && (
        <div className="px-4 py-1 text-right">
          <span className="text-xs" style={{ color: '#444' }}>saving...</span>
        </div>
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
