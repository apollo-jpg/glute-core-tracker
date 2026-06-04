export type Exercise = {
  id: number
  name: string
  warmup_sets: string
  working_sets: string
  reps: string
  rest: string
  cue: string
  is_superset: boolean
  superset_group?: string
}

export type DayKey = 'A' | 'B' | 'C'

export type WeekData = {
  week: number
  phase: string
  phaseNum: 1 | 2 | 3 | 4
  effortGuide: string
  days: Record<DayKey, Exercise[]>
}

export const DAY_NAMES: Record<DayKey, string> = {
  A: 'Squats & Glutes',
  B: 'Deadlift & Hamstrings',
  C: 'Upper Body & Core',
}

export const DAY_EMOJIS: Record<DayKey, string> = {
  A: '🍑',
  B: '🔥',
  C: '💪',
}

// Phase 1 — Weeks 1-3: Learn the movements. Higher reps, lighter load, form first.
// Phase 2 — Weeks 4-6: Build volume. Add sets, same movement patterns.
// Phase 3 — Weeks 7-9: Peak intensity. Heavier, lower reps, close to failure.
// Week 10 — Deload: 50% load, same movements, recover and grow.
//
// Key changes from original:
// - Squats: 10-12 → 8-10 → 6-8 (NOT 5-6 — too heavy for beginners)
// - Hip Thrust reps bumped to 12-15 (primary glute builder, responds to volume)
// - Bicycle Crunch → Suitcase Carry (no waist-widening oblique bulk)
// - Cable Crunch → Ab Wheel Rollout / RKC Plank (anti-flexion = flat stomach)

const dayA_week1: Exercise[] = [
  {
    id: 1,
    name: 'Back Squat (or Goblet Squat)',
    warmup_sets: '2',
    working_sets: '3',
    reps: '10-12',
    rest: '3 min',
    cue: 'Form week. Sit back and down, knees track over toes. Drive through your heels to stand. Record your weight — you\'ll beat it next week.',
    is_superset: false,
  },
  {
    id: 2,
    name: 'Barbell Hip Thrust',
    warmup_sets: '2',
    working_sets: '3',
    reps: '12-15',
    rest: '2 min',
    cue: 'THE glute builder. Upper back on bench, feet flat. Drive hips up, squeeze hard at the top for 1 full second every rep.',
    is_superset: false,
  },
  {
    id: 3,
    name: 'Bulgarian Split Squat',
    warmup_sets: '1',
    working_sets: '3',
    reps: '10-12 each leg',
    rest: '2 min',
    cue: 'Back foot on bench, front foot forward enough that knee stays behind toes. Lower slowly, feel the glute stretch.',
    is_superset: false,
  },
  {
    id: 4,
    name: 'Cable Pull-Through',
    warmup_sets: '0',
    working_sets: '3',
    reps: '15',
    rest: '0 sec',
    cue: 'Hip hinge — push hips back, feel hamstrings load. Squeeze glutes hard at the top. Go straight to Donkey Kick.',
    is_superset: true,
    superset_group: 'A',
  },
  {
    id: 5,
    name: 'Donkey Kick (Cable or Machine)',
    warmup_sets: '0',
    working_sets: '3',
    reps: '15-20 each leg',
    rest: '90 sec',
    cue: 'Hips square, squeeze glute at the top. 15-20 reps each leg. Rest 90 sec, then repeat both.',
    is_superset: true,
    superset_group: 'A',
  },
  {
    id: 6,
    name: 'Dead Bug',
    warmup_sets: '0',
    working_sets: '3',
    reps: '8-10 each side',
    rest: '60 sec',
    cue: 'Lower back GLUED to the floor the entire time. Opposite arm + leg, slow and controlled. This flattens your stomach more than any crunch.',
    is_superset: false,
  },
  {
    id: 7,
    name: 'RKC Plank',
    warmup_sets: '0',
    working_sets: '3',
    reps: '20-30 sec',
    rest: '60 sec',
    cue: 'Elbows forward (not under shoulders), squeeze abs, glutes, and quads simultaneously. Harder than a regular plank — you\'ll feel it.',
    is_superset: false,
  },
]

const dayB_week1: Exercise[] = [
  {
    id: 1,
    name: 'Romanian Deadlift (RDL)',
    warmup_sets: '2',
    working_sets: '3',
    reps: '10-12',
    rest: '3 min',
    cue: 'Push hips back, soft knee bend, bar drags down your legs. Feel the hamstring stretch at the bottom. This is the hamstring-glute tie-in exercise.',
    is_superset: false,
  },
  {
    id: 2,
    name: 'Leg Press',
    warmup_sets: '1',
    working_sets: '3',
    reps: '12-15',
    rest: '2 min',
    cue: 'Feet hip-width, mid-platform. Full range — lower until 90 degrees. Don\'t lock out at top.',
    is_superset: false,
  },
  {
    id: 3,
    name: 'Walking Lunge (Dumbbells)',
    warmup_sets: '0',
    working_sets: '3',
    reps: '10-12 each leg',
    rest: '2 min',
    cue: 'Step forward, lower until back knee nearly touches floor. Push through front heel to stand. Chest up the whole time.',
    is_superset: false,
  },
  {
    id: 4,
    name: 'Seated Leg Curl',
    warmup_sets: '0',
    working_sets: '3',
    reps: '12-15',
    rest: '0 sec',
    cue: 'Full range of motion. Squeeze hamstrings at the top of each rep. Go straight to Hip Abduction.',
    is_superset: true,
    superset_group: 'B',
  },
  {
    id: 5,
    name: 'Machine Hip Abduction',
    warmup_sets: '0',
    working_sets: '3',
    reps: '15-20',
    rest: '90 sec',
    cue: 'Push out against the pad, squeeze glutes at end range. Rest 90 sec, then repeat both exercises.',
    is_superset: true,
    superset_group: 'B',
  },
  {
    id: 6,
    name: 'Dead Bug',
    warmup_sets: '0',
    working_sets: '3',
    reps: '8-10 each side',
    rest: '60 sec',
    cue: 'Lower back pressed to floor. Extend opposite arm and leg simultaneously. Breathe out as you lower.',
    is_superset: false,
  },
  {
    id: 7,
    name: 'Suitcase Carry',
    warmup_sets: '0',
    working_sets: '3',
    reps: '30-40 steps each side',
    rest: '60 sec',
    cue: 'Hold one dumbbell at your side. Walk tall — don\'t let your torso tilt. Your core fights the lean. This trims your waist without widening it.',
    is_superset: false,
  },
]

const dayC_week1: Exercise[] = [
  {
    id: 1,
    name: 'Lat Pulldown',
    warmup_sets: '2',
    working_sets: '3',
    reps: '10-12',
    rest: '2 min',
    cue: 'Pull elbows down and back toward your hips. Lean back slightly. Full stretch at top, full squeeze at bottom.',
    is_superset: false,
  },
  {
    id: 2,
    name: 'Dumbbell Row',
    warmup_sets: '1',
    working_sets: '3',
    reps: '10-12 each arm',
    rest: '2 min',
    cue: 'Brace on a bench. Pull elbow straight back, don\'t flare out. Squeeze at top.',
    is_superset: false,
  },
  {
    id: 3,
    name: 'Dumbbell Shoulder Press',
    warmup_sets: '1',
    working_sets: '3',
    reps: '10-12',
    rest: '90 sec',
    cue: 'Press straight up, neutral grip or pronated. Don\'t shrug. Control the weight back down.',
    is_superset: false,
  },
  {
    id: 4,
    name: 'Cable Face Pull',
    warmup_sets: '0',
    working_sets: '3',
    reps: '15-20',
    rest: '0 sec',
    cue: 'Pull to forehead, elbows high and wide. Great for posture. Go straight to Lateral Raise.',
    is_superset: true,
    superset_group: 'C',
  },
  {
    id: 5,
    name: 'Lateral Raise (Dumbbell)',
    warmup_sets: '0',
    working_sets: '3',
    reps: '12-15',
    rest: '90 sec',
    cue: 'Slight forward lean. Raise to shoulder height, pinky slightly higher than thumb. Rest 90 sec, then repeat both.',
    is_superset: true,
    superset_group: 'C',
  },
  {
    id: 6,
    name: 'Glute Bridge (Bodyweight or Barbell)',
    warmup_sets: '0',
    working_sets: '3',
    reps: '15-20',
    rest: '60 sec',
    cue: 'Upper back flat on floor. Drive hips up, squeeze hard at top for 1 second. Add weight when bodyweight feels easy.',
    is_superset: false,
  },
  {
    id: 7,
    name: 'Ab Wheel Rollout (or Plank)',
    warmup_sets: '0',
    working_sets: '3',
    reps: '8-10 (or 30 sec plank)',
    rest: '60 sec',
    cue: 'Roll out as far as you can control, abs braced. Pull back in. If no wheel, do RKC plank — elbows forward, squeeze everything.',
    is_superset: false,
  },
]

// Helper to build weeks — Phase 2 adds sets and bumps to 8-10, Phase 3 goes 6-8
function buildPhase2A(week: number): Exercise[] {
  return [
    { ...dayA_week1[0], working_sets: '4', reps: '8-10', cue: `Week ${week} — add weight if last week felt manageable. 8-10 hard reps, 2 left in tank.` },
    { ...dayA_week1[1], working_sets: '4', reps: '10-12', cue: 'Add weight vs last phase. Drive hips up, 1-second squeeze at top every rep.' },
    { ...dayA_week1[2], working_sets: '4', reps: '8-10 each leg', cue: 'Heavier than Phase 1. Feel the glute at the bottom of every rep.' },
    { ...dayA_week1[3], working_sets: '4', reps: '15', cue: 'Hinge deep, squeeze hard at top. Go straight to Donkey Kick.' },
    { ...dayA_week1[4], working_sets: '4', reps: '15 each leg', cue: `Hips square. 15 reps each leg. Rest 90 sec, repeat.` },
    { ...dayA_week1[5], working_sets: '3', reps: '10-12 each side', cue: 'Lower back stays glued down. Slow and controlled. Anti-extension core work.' },
    { ...dayA_week1[6], working_sets: '3', reps: '25-35 sec', cue: 'Elbows forward, squeeze everything simultaneously. Harder than it looks.' },
  ]
}

function buildPhase2B(week: number): Exercise[] {
  return [
    { ...dayB_week1[0], working_sets: '4', reps: '8-10', cue: `Week ${week} — push hips back further. Feel the stretch. Heavier than Phase 1.` },
    { ...dayB_week1[1], working_sets: '4', reps: '10-12', cue: 'Full range. Control the weight on the way down.' },
    { ...dayB_week1[2], working_sets: '4', reps: '10-12 each leg', cue: 'Heavier dumbbells vs Phase 1. Push through front heel.' },
    { ...dayB_week1[3], working_sets: '4', reps: '12-15', cue: 'Squeeze at the top. Go straight to Hip Abduction.' },
    { ...dayB_week1[4], working_sets: '4', reps: '15-20', cue: 'Squeeze glutes at end range. Rest 90 sec, repeat both.' },
    { ...dayB_week1[5], working_sets: '3', reps: '10-12 each side', cue: 'Lower back stays flat. Controlled breathing.' },
    { ...dayB_week1[6], working_sets: '3', reps: '30-40 steps each side', cue: 'Heavier dumbbell. Walk tall. Core fights the lean.' },
  ]
}

function buildPhase2C(week: number): Exercise[] {
  return [
    { ...dayC_week1[0], working_sets: '4', reps: '8-10', cue: `Week ${week} — heavier pulldown. Elbows down and back.` },
    { ...dayC_week1[1], working_sets: '4', reps: '8-10 each arm', cue: 'Heavier dumbbells. Full stretch, full squeeze.' },
    { ...dayC_week1[2], working_sets: '3', reps: '10-12', cue: 'Controlled descent. Add weight vs last phase.' },
    { ...dayC_week1[3], working_sets: '4', reps: '15-20', cue: 'Pull to forehead, elbows high. Go straight to Lateral Raise.' },
    { ...dayC_week1[4], working_sets: '4', reps: '12-15', cue: 'Raise to shoulder height. Rest 90 sec, repeat both.' },
    { ...dayC_week1[5], working_sets: '4', reps: '12-15', cue: 'Add a plate if bodyweight is easy. 1-second squeeze at top.' },
    { ...dayC_week1[6], working_sets: '3', reps: '8-10 (or 35 sec plank)', cue: 'Roll out further than Phase 1. Pull back in with abs, not hip flexors.' },
  ]
}

function buildPhase3A(week: number): Exercise[] {
  return [
    { ...dayA_week1[0], working_sets: '5', reps: '6-8', rest: '3-4 min', cue: `Week ${week} — leave 1-2 reps in the tank. This should feel HEAVY. Record the weight.` },
    { ...dayA_week1[1], working_sets: '4', reps: '8-10', rest: '2-3 min', cue: 'Heaviest hip thrusts yet. Full squeeze, every single rep.' },
    { ...dayA_week1[2], working_sets: '4', reps: '8-10 each leg', cue: 'Last set close to failure. Feel the glute at the bottom.' },
    { ...dayA_week1[3], working_sets: '4', reps: '12-15', cue: 'Heavier cable. Hinge deep. Go straight to Donkey Kick.' },
    { ...dayA_week1[4], working_sets: '4', reps: '15 each leg', cue: 'Max squeeze at top. Rest 90 sec, repeat.' },
    { ...dayA_week1[5], working_sets: '3', reps: '10-12 each side', cue: 'Slow and deliberate. Back stays flat. This is harder than it looks when you do it right.' },
    { ...dayA_week1[6], working_sets: '3', reps: '30-40 sec', cue: 'Full 30-40 seconds of maximum squeeze. Breathe out slowly.' },
  ]
}

function buildPhase3B(week: number): Exercise[] {
  return [
    { ...dayB_week1[0], working_sets: '5', reps: '6-8', rest: '3-4 min', cue: `Week ${week} — heaviest RDLs of the program. Feel the hamstring load fully.` },
    { ...dayB_week1[1], working_sets: '4', reps: '8-10', rest: '2 min', cue: 'Full range, heavy. Control the way down.' },
    { ...dayB_week1[2], working_sets: '4', reps: '10-12 each leg', cue: 'Heaviest lunges yet. Push through the front heel.' },
    { ...dayB_week1[3], working_sets: '4', reps: '10-12', cue: 'Squeeze hard at the top. Go straight to Hip Abduction.' },
    { ...dayB_week1[4], working_sets: '4', reps: '15-20', cue: 'Squeeze glutes at end range. Rest 90 sec, repeat.' },
    { ...dayB_week1[5], working_sets: '3', reps: '10-12 each side', cue: 'Lower back stays flat the entire set.' },
    { ...dayB_week1[6], working_sets: '3', reps: '40-50 steps each side', cue: 'Heaviest dumbbell yet. Walk tall, don\'t lean.' },
  ]
}

function buildPhase3C(week: number): Exercise[] {
  return [
    { ...dayC_week1[0], working_sets: '4', reps: '6-8', rest: '2-3 min', cue: `Week ${week} — heaviest pulldown. Full stretch, full squeeze.` },
    { ...dayC_week1[1], working_sets: '4', reps: '8-10 each arm', cue: 'Heaviest rows of the program. Control every rep.' },
    { ...dayC_week1[2], working_sets: '4', reps: '8-10', cue: 'Press heavy, don\'t shrug. 1-2 reps left in tank.' },
    { ...dayC_week1[3], working_sets: '4', reps: '15-20', cue: 'Pull to forehead, elbows high. Go straight to Lateral Raise.' },
    { ...dayC_week1[4], working_sets: '4', reps: '12-15', cue: 'Raise to shoulder height. Rest 90 sec, repeat.' },
    { ...dayC_week1[5], working_sets: '4', reps: '10-15', rest: '90 sec', cue: 'Loaded bridge. Squeeze hard at top. Peak glute session.' },
    { ...dayC_week1[6], working_sets: '3', reps: '10-12 (or 40 sec plank)', cue: 'Roll as far as you can control. Pull back with abs only.' },
  ]
}

export const WORKOUT_DATA: Record<number, WeekData> = {
  1: {
    week: 1,
    phase: 'Phase 1 — Learn the Movements',
    phaseNum: 1,
    effortGuide: 'Leave 3-4 reps in tank. Focus on feeling each muscle, not moving weight.',
    days: { A: dayA_week1, B: dayB_week1, C: dayC_week1 },
  },
  2: {
    week: 2,
    phase: 'Phase 1 — Learn the Movements',
    phaseNum: 1,
    effortGuide: 'Beat Week 1\'s weights slightly. Form should feel more natural now.',
    days: {
      A: dayA_week1.map((e, i) => i === 0
        ? { ...e, cue: 'Beat last week\'s weight if form felt solid. 3 reps left in tank.' }
        : e),
      B: dayB_week1.map((e, i) => i === 0
        ? { ...e, cue: 'Slightly heavier RDL. Feel the hamstring stretch each rep.' }
        : e),
      C: dayC_week1.map((e, i) => i === 0
        ? { ...e, cue: 'Add a little weight vs Week 1. Pull elbows down and back.' }
        : e),
    },
  },
  3: {
    week: 3,
    phase: 'Phase 1 — Learn the Movements',
    phaseNum: 1,
    effortGuide: 'Last Phase 1 week — push to 2 reps left in tank. Note all your weights for Phase 2.',
    days: {
      A: dayA_week1.map((e, i) => {
        if (i === 0) return { ...e, reps: '8-10', cue: 'Last Phase 1 week. Push heavier — 2 reps left in tank. Write down this weight.' }
        if (i === 6) return { ...e, reps: '25-35 sec', cue: 'RKC plank. Elbows forward, squeeze everything. Harder each week.' }
        return e
      }),
      B: dayB_week1.map((e, i) => {
        if (i === 0) return { ...e, reps: '8-10', cue: 'Heaviest Phase 1 RDL. Record this weight — Phase 2 starts heavier.' }
        return e
      }),
      C: dayC_week1.map((e, i) => {
        if (i === 0) return { ...e, reps: '8-10', cue: 'Last Phase 1 pulldown. Note your weight — Phase 2 builds from here.' }
        return e
      }),
    },
  },
  4: {
    week: 4,
    phase: 'Phase 2 — Build the Volume',
    phaseNum: 2,
    effortGuide: 'More sets, slightly heavier. Leave 2 reps in tank each working set.',
    days: { A: buildPhase2A(4), B: buildPhase2B(4), C: buildPhase2C(4) },
  },
  5: {
    week: 5,
    phase: 'Phase 2 — Build the Volume',
    phaseNum: 2,
    effortGuide: 'Add weight vs Week 4 wherever possible. Progressive overload is the goal.',
    days: { A: buildPhase2A(5), B: buildPhase2B(5), C: buildPhase2C(5) },
  },
  6: {
    week: 6,
    phase: 'Phase 2 — Build the Volume',
    phaseNum: 2,
    effortGuide: 'Last Phase 2 week — push hard. Phase 3 is peak intensity. Earn it.',
    days: {
      A: buildPhase2A(6).map((e, i) => i === 0
        ? { ...e, reps: '6-8', cue: 'Last Phase 2 week — your heaviest squats yet. 2 reps left in tank.' }
        : e),
      B: buildPhase2B(6).map((e, i) => i === 0
        ? { ...e, reps: '6-8', cue: 'Last Phase 2 RDL — push the weight. Phase 3 starts next week.' }
        : e),
      C: buildPhase2C(6).map((e, i) => i === 0
        ? { ...e, reps: '6-8', cue: 'Last Phase 2 pulldown. Heaviest yet. Good form always.' }
        : e),
    },
  },
  7: {
    week: 7,
    phase: 'Phase 3 — Peak Intensity',
    phaseNum: 3,
    effortGuide: 'Leave 1-2 reps in tank. This should feel hard. You\'ve earned these weights.',
    days: { A: buildPhase3A(7), B: buildPhase3B(7), C: buildPhase3C(7) },
  },
  8: {
    week: 8,
    phase: 'Phase 3 — Peak Intensity',
    phaseNum: 3,
    effortGuide: 'Heavier than Week 7. Last set of each compound should be close to failure.',
    days: { A: buildPhase3A(8), B: buildPhase3B(8), C: buildPhase3C(8) },
  },
  9: {
    week: 9,
    phase: 'Phase 3 — Peak Intensity',
    phaseNum: 3,
    effortGuide: 'PEAK WEEK. Heaviest of the program. Record every weight — you beat these next block.',
    days: {
      A: buildPhase3A(9).map((e, i) => i === 0
        ? { ...e, reps: '5-6', rest: '4 min', cue: 'PEAK WEEK. Max effort squats. These are YOUR numbers. Write them down.' }
        : e),
      B: buildPhase3B(9).map((e, i) => i === 0
        ? { ...e, reps: '5-6', rest: '4 min', cue: 'PEAK WEEK. Heaviest RDLs of the program. Record this.' }
        : e),
      C: buildPhase3C(9).map((e, i) => i === 0
        ? { ...e, reps: '5-6', rest: '2-3 min', cue: 'PEAK WEEK. Heaviest pulldowns. Every rep with full range.' }
        : e),
    },
  },
  10: {
    week: 10,
    phase: 'Deload — Active Recovery',
    phaseNum: 4,
    effortGuide: 'Use ~50% of Week 9 weights. Everything should feel EASY. This is where you grow.',
    days: {
      A: [
        { id: 1, name: 'Back Squat (or Goblet Squat)', warmup_sets: '1', working_sets: '3', reps: '12-15', rest: '2 min', cue: '~50% of Week 9 weight. Slow and controlled. Feel every rep.', is_superset: false },
        { id: 2, name: 'Barbell Hip Thrust', warmup_sets: '1', working_sets: '3', reps: '15-20', rest: '2 min', cue: '~50% weight. Squeeze at the top every single rep.', is_superset: false },
        { id: 3, name: 'Romanian Deadlift (RDL)', warmup_sets: '1', working_sets: '3', reps: '12', rest: '2 min', cue: '~50% weight. Hamstring stretch focus. No rush.', is_superset: false },
        { id: 4, name: 'Leg Press', warmup_sets: '0', working_sets: '2', reps: '15', rest: '90 sec', cue: '~50% weight. Full range of motion.', is_superset: false },
        { id: 5, name: 'Leg Curl', warmup_sets: '0', working_sets: '2', reps: '15', rest: '90 sec', cue: '~50% weight. Feel the hamstrings.', is_superset: false },
        { id: 6, name: 'Dead Bug', warmup_sets: '0', working_sets: '2', reps: '8 each side', rest: '60 sec', cue: 'Bodyweight. Lower back flat. Breathe out.', is_superset: false },
        { id: 7, name: 'RKC Plank', warmup_sets: '0', working_sets: '2', reps: '20 sec', rest: '60 sec', cue: 'Easy hold. Breathe and brace. Deload week — enjoy it.', is_superset: false },
      ],
      B: [
        { id: 1, name: 'Romanian Deadlift (RDL)', warmup_sets: '1', working_sets: '3', reps: '12', rest: '2 min', cue: '~50% weight. Slow hinge, feel the stretch.', is_superset: false },
        { id: 2, name: 'Leg Press', warmup_sets: '1', working_sets: '3', reps: '15', rest: '90 sec', cue: '~50% weight. Full range.', is_superset: false },
        { id: 3, name: 'Barbell Hip Thrust', warmup_sets: '1', working_sets: '3', reps: '15-20', rest: '2 min', cue: '~50% weight. Mind-muscle connection only.', is_superset: false },
        { id: 4, name: 'Leg Curl', warmup_sets: '0', working_sets: '2', reps: '15', rest: '90 sec', cue: '~50% weight. Feel the hamstrings squeeze.', is_superset: false },
        { id: 5, name: 'Machine Hip Abduction', warmup_sets: '0', working_sets: '2', reps: '20', rest: '90 sec', cue: 'Light weight. Squeeze glutes.', is_superset: false },
        { id: 6, name: 'Dead Bug', warmup_sets: '0', working_sets: '2', reps: '8 each side', rest: '60 sec', cue: 'Controlled. Back stays flat.', is_superset: false },
        { id: 7, name: 'Suitcase Carry', warmup_sets: '0', working_sets: '2', reps: '20 steps each side', rest: '60 sec', cue: 'Light dumbbell. Walk tall.', is_superset: false },
      ],
      C: [
        { id: 1, name: 'Lat Pulldown', warmup_sets: '1', working_sets: '2', reps: '12', rest: '2 min', cue: '~50% weight. Feel the full stretch at the top.', is_superset: false },
        { id: 2, name: 'Dumbbell Row', warmup_sets: '0', working_sets: '2', reps: '12 each arm', rest: '90 sec', cue: '~50% weight. Controlled. Feel your back.', is_superset: false },
        { id: 3, name: 'Dumbbell Shoulder Press', warmup_sets: '0', working_sets: '2', reps: '12', rest: '90 sec', cue: '~50% weight. Easy press.', is_superset: false },
        { id: 4, name: 'Cable Face Pull', warmup_sets: '0', working_sets: '2', reps: '15-20', rest: '60 sec', cue: 'Light. Perfect form. Elbows high.', is_superset: false },
        { id: 5, name: 'Glute Bridge (Bodyweight or Barbell)', warmup_sets: '0', working_sets: '3', reps: '20', rest: '60 sec', cue: 'Easy weight. Squeeze every rep. You made it to deload! 🎉', is_superset: false },
        { id: 6, name: 'Dead Bug', warmup_sets: '0', working_sets: '2', reps: '8 each side', rest: '60 sec', cue: 'Last core session. Breathe and enjoy the easy week.', is_superset: false },
        { id: 7, name: 'RKC Plank', warmup_sets: '0', working_sets: '2', reps: '20 sec', rest: '60 sec', cue: 'Program complete after this. Start Block 2 next week stronger than ever.', is_superset: false },
      ],
    },
  },
}
