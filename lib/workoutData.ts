export type Exercise = {
  id: number
  name: string
  warmup_sets: string
  working_sets: string
  reps: string
  rest: string
  cue: string
  is_superset: boolean
}

export type DayKey = 'A' | 'B' | 'C'

export type WeekData = {
  week: number
  phase: string
  days: Record<DayKey, Exercise[]>
}

export const DAY_NAMES: Record<DayKey, string> = {
  A: 'Day A — Squats & Glutes',
  B: 'Day B — Deadlift & Hamstrings',
  C: 'Day C — Upper Body & Core',
}

export const WORKOUT_DATA: Record<number, WeekData> = {
  1: {
    week: 1,
    phase: 'Phase 1 — Learn the Movements',
    days: {
      A: [
        { id: 1, name: 'Back Squat (or Goblet Squat)', warmup_sets: '2', working_sets: '4', reps: '8-10', rest: '3 min', cue: 'HEAVY compound first. Sit back and down, knees out. Drive through your heels.', is_superset: false },
        { id: 2, name: 'Barbell Hip Thrust', warmup_sets: '2', working_sets: '3', reps: '10-12', rest: '2-3 min', cue: 'Drive through heels. Squeeze HARD at the top — hold 1 second every rep.', is_superset: false },
        { id: 3, name: 'Bulgarian Split Squat', warmup_sets: '1', working_sets: '3', reps: '10-12', rest: '2 min', cue: 'Back foot on bench. Chest tall. 10-12 reps each leg.', is_superset: false },
        { id: 4, name: 'A1: Cable Pull-Through', warmup_sets: '0', working_sets: '3', reps: '15', rest: '0 min', cue: 'Hinge at hips, squeeze glutes hard at the top. Go straight to A2.', is_superset: true },
        { id: 5, name: 'A2: Donkey Kick (Cable or Machine)', warmup_sets: '0', working_sets: '3', reps: '15-20', rest: '90 sec', cue: 'Keep hips square. Squeeze glute at top. 15-20 reps each leg. Rest after A1+A2.', is_superset: true },
        { id: 6, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '30 sec', rest: '45 sec', cue: 'ABS FINISHER. Squeeze abs and glutes. Straight line head to heels.', is_superset: false },
        { id: 7, name: 'Cable Crunch', warmup_sets: '0', working_sets: '3', reps: '20-25', rest: '1 min', cue: 'Round your back as you crunch. Feel your abs, not your neck.', is_superset: false },
      ],
      B: [
        { id: 1, name: 'Romanian Deadlift (RDL)', warmup_sets: '2', working_sets: '4', reps: '8-10', rest: '3 min', cue: 'HEAVY compound first. Push hips back, slight knee bend. Feel the hamstring stretch at the bottom.', is_superset: false },
        { id: 2, name: 'Leg Press', warmup_sets: '1', working_sets: '3', reps: '12-15', rest: '2 min', cue: 'Feet shoulder-width, mid-platform. Control the weight on the way down.', is_superset: false },
        { id: 3, name: 'Walking Lunge (Dumbbells)', warmup_sets: '0', working_sets: '3', reps: '12/leg', rest: '2 min', cue: 'Step forward, lower until back knee nearly touches floor. Keep chest up.', is_superset: false },
        { id: 4, name: 'B1: Seated Leg Curl', warmup_sets: '0', working_sets: '3', reps: '12-15', rest: '0 min', cue: 'Squeeze hamstrings at the top. Go straight to B2.', is_superset: true },
        { id: 5, name: 'B2: Machine Hip Abduction', warmup_sets: '0', working_sets: '3', reps: '15-20', rest: '90 sec', cue: 'Squeeze glutes at the top. Rest after B1+B2.', is_superset: true },
        { id: 6, name: 'Dead Bug', warmup_sets: '0', working_sets: '3', reps: '10/side', rest: '1 min', cue: 'ABS FINISHER. Lower opposite arm + leg. Keep lower back pressed to floor.', is_superset: false },
        { id: 7, name: 'Bicycle Crunch', warmup_sets: '0', working_sets: '3', reps: '20/side', rest: '1 min', cue: 'Slow and controlled. Twist the whole torso, not just the elbow.', is_superset: false },
      ],
      C: [
        { id: 1, name: 'Lat Pulldown', warmup_sets: '2', working_sets: '3', reps: '10-12', rest: '2 min', cue: 'COMPOUND first. Pull elbows down and back toward your hips.', is_superset: false },
        { id: 2, name: 'Dumbbell Row', warmup_sets: '1', working_sets: '3', reps: '10-12', rest: '2 min', cue: 'Brace on a bench. Pull elbow straight back. 10-12 reps each arm.', is_superset: false },
        { id: 3, name: 'Dumbbell Shoulder Press', warmup_sets: '1', working_sets: '3', reps: '10-12', rest: '90 sec', cue: 'Press straight up, don\'t shrug. Control the weight down.', is_superset: false },
        { id: 4, name: 'C1: Cable Face Pull', warmup_sets: '0', working_sets: '3', reps: '15-20', rest: '0 min', cue: 'Pull toward face, elbows high. Great for posture. Go straight to C2.', is_superset: true },
        { id: 5, name: 'C2: Lateral Raise (Dumbbell)', warmup_sets: '0', working_sets: '3', reps: '12-15', rest: '90 sec', cue: 'Slight forward lean, raise to shoulder height. Rest after C1+C2.', is_superset: true },
        { id: 6, name: 'Glute Bridge (Bodyweight or Barbell)', warmup_sets: '0', working_sets: '3', reps: '20', rest: '1 min', cue: 'Glute carry-over + core. Squeeze at top 1 full second every rep.', is_superset: false },
        { id: 7, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '30 sec', rest: '45 sec', cue: 'ABS FINISHER. Squeeze everything. Finish strong.', is_superset: false },
      ],
    },
  },
  2: {
    week: 2,
    phase: 'Phase 1 — Learn the Movements',
    days: {
      A: [
        { id: 1, name: 'Back Squat (or Goblet Squat)', warmup_sets: '2', working_sets: '4', reps: '8-10', rest: '3 min', cue: 'Same as last week — aim to increase weight slightly if form felt solid.', is_superset: false },
        { id: 2, name: 'Barbell Hip Thrust', warmup_sets: '2', working_sets: '3', reps: '10-12', rest: '2-3 min', cue: 'Drive through heels. Squeeze HARD at the top — hold 1 second every rep.', is_superset: false },
        { id: 3, name: 'Bulgarian Split Squat', warmup_sets: '1', working_sets: '3', reps: '10-12', rest: '2 min', cue: 'Back foot on bench. Chest tall. 10-12 reps each leg.', is_superset: false },
        { id: 4, name: 'A1: Cable Pull-Through', warmup_sets: '0', working_sets: '3', reps: '15', rest: '0 min', cue: 'Hinge at hips, squeeze glutes hard at the top. Go straight to A2.', is_superset: true },
        { id: 5, name: 'A2: Donkey Kick (Cable or Machine)', warmup_sets: '0', working_sets: '3', reps: '15-20', rest: '90 sec', cue: 'Keep hips square. Squeeze glute at top. 15-20 reps each leg. Rest after A1+A2.', is_superset: true },
        { id: 6, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '30 sec', rest: '45 sec', cue: 'ABS FINISHER. Squeeze abs and glutes. Straight line head to heels.', is_superset: false },
        { id: 7, name: 'Cable Crunch', warmup_sets: '0', working_sets: '3', reps: '20-25', rest: '1 min', cue: 'Round your back as you crunch. Feel your abs, not your neck.', is_superset: false },
      ],
      B: [
        { id: 1, name: 'Romanian Deadlift (RDL)', warmup_sets: '2', working_sets: '4', reps: '8-10', rest: '3 min', cue: 'Push hips back, slight knee bend. Feel the hamstring stretch at the bottom.', is_superset: false },
        { id: 2, name: 'Leg Press', warmup_sets: '1', working_sets: '3', reps: '12-15', rest: '2 min', cue: 'Feet shoulder-width, mid-platform. Control the weight on the way down.', is_superset: false },
        { id: 3, name: 'Walking Lunge (Dumbbells)', warmup_sets: '0', working_sets: '3', reps: '12/leg', rest: '2 min', cue: 'Step forward, lower until back knee nearly touches floor. Keep chest up.', is_superset: false },
        { id: 4, name: 'B1: Seated Leg Curl', warmup_sets: '0', working_sets: '3', reps: '12-15', rest: '0 min', cue: 'Squeeze hamstrings at the top. Go straight to B2.', is_superset: true },
        { id: 5, name: 'B2: Machine Hip Abduction', warmup_sets: '0', working_sets: '3', reps: '15-20', rest: '90 sec', cue: 'Squeeze glutes at the top. Rest after B1+B2.', is_superset: true },
        { id: 6, name: 'Dead Bug', warmup_sets: '0', working_sets: '3', reps: '10/side', rest: '1 min', cue: 'Lower opposite arm + leg. Keep lower back pressed to floor.', is_superset: false },
        { id: 7, name: 'Bicycle Crunch', warmup_sets: '0', working_sets: '3', reps: '20/side', rest: '1 min', cue: 'Slow and controlled. Twist the whole torso, not just the elbow.', is_superset: false },
      ],
      C: [
        { id: 1, name: 'Lat Pulldown', warmup_sets: '2', working_sets: '3', reps: '10-12', rest: '2 min', cue: 'Pull elbows down and back toward your hips.', is_superset: false },
        { id: 2, name: 'Dumbbell Row', warmup_sets: '1', working_sets: '3', reps: '10-12', rest: '2 min', cue: 'Brace on a bench. Pull elbow straight back. 10-12 reps each arm.', is_superset: false },
        { id: 3, name: 'Dumbbell Shoulder Press', warmup_sets: '1', working_sets: '3', reps: '10-12', rest: '90 sec', cue: 'Press straight up, don\'t shrug. Control the weight down.', is_superset: false },
        { id: 4, name: 'C1: Cable Face Pull', warmup_sets: '0', working_sets: '3', reps: '15-20', rest: '0 min', cue: 'Pull toward face, elbows high. Great for posture. Go straight to C2.', is_superset: true },
        { id: 5, name: 'C2: Lateral Raise (Dumbbell)', warmup_sets: '0', working_sets: '3', reps: '12-15', rest: '90 sec', cue: 'Slight forward lean, raise to shoulder height. Rest after C1+C2.', is_superset: true },
        { id: 6, name: 'Glute Bridge (Bodyweight or Barbell)', warmup_sets: '0', working_sets: '3', reps: '20', rest: '1 min', cue: 'Squeeze at top 1 full second every rep.', is_superset: false },
        { id: 7, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '30 sec', rest: '45 sec', cue: 'ABS FINISHER. Squeeze everything. Finish strong.', is_superset: false },
      ],
    },
  },
  3: {
    week: 3,
    phase: 'Phase 1 — Learn the Movements',
    days: {
      A: [
        { id: 1, name: 'Back Squat (or Goblet Squat)', warmup_sets: '2', working_sets: '4', reps: '6-8', rest: '3 min', cue: 'Last week of Phase 1 — push for heavier weights with solid form.', is_superset: false },
        { id: 2, name: 'Barbell Hip Thrust', warmup_sets: '2', working_sets: '3', reps: '10-12', rest: '2-3 min', cue: 'Drive through heels. Squeeze HARD at the top — hold 1 second every rep.', is_superset: false },
        { id: 3, name: 'Bulgarian Split Squat', warmup_sets: '1', working_sets: '3', reps: '10-12', rest: '2 min', cue: 'Back foot on bench. Chest tall. 10-12 reps each leg.', is_superset: false },
        { id: 4, name: 'A1: Cable Pull-Through', warmup_sets: '0', working_sets: '3', reps: '15', rest: '0 min', cue: 'Hinge at hips, squeeze glutes hard at the top. Go straight to A2.', is_superset: true },
        { id: 5, name: 'A2: Donkey Kick (Cable or Machine)', warmup_sets: '0', working_sets: '3', reps: '15-20', rest: '90 sec', cue: 'Keep hips square. Squeeze glute at top. 15-20 reps each leg. Rest after A1+A2.', is_superset: true },
        { id: 6, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '40 sec', rest: '45 sec', cue: 'ABS FINISHER. Longer hold this week. Keep that form.', is_superset: false },
        { id: 7, name: 'Cable Crunch', warmup_sets: '0', working_sets: '3', reps: '20-25', rest: '1 min', cue: 'Round your back as you crunch. Feel your abs, not your neck.', is_superset: false },
      ],
      B: [
        { id: 1, name: 'Romanian Deadlift (RDL)', warmup_sets: '2', working_sets: '4', reps: '6-8', rest: '3 min', cue: 'Last Phase 1 push — heavier than Week 2 if possible.', is_superset: false },
        { id: 2, name: 'Leg Press', warmup_sets: '1', working_sets: '3', reps: '12-15', rest: '2 min', cue: 'Feet shoulder-width, mid-platform. Control the weight on the way down.', is_superset: false },
        { id: 3, name: 'Walking Lunge (Dumbbells)', warmup_sets: '0', working_sets: '3', reps: '12/leg', rest: '2 min', cue: 'Step forward, lower until back knee nearly touches floor. Keep chest up.', is_superset: false },
        { id: 4, name: 'B1: Seated Leg Curl', warmup_sets: '0', working_sets: '3', reps: '12-15', rest: '0 min', cue: 'Squeeze hamstrings at the top. Go straight to B2.', is_superset: true },
        { id: 5, name: 'B2: Machine Hip Abduction', warmup_sets: '0', working_sets: '3', reps: '15-20', rest: '90 sec', cue: 'Squeeze glutes at the top. Rest after B1+B2.', is_superset: true },
        { id: 6, name: 'Dead Bug', warmup_sets: '0', working_sets: '3', reps: '10/side', rest: '1 min', cue: 'Lower opposite arm + leg. Keep lower back pressed to floor.', is_superset: false },
        { id: 7, name: 'Bicycle Crunch', warmup_sets: '0', working_sets: '3', reps: '20/side', rest: '1 min', cue: 'Slow and controlled. Twist the whole torso, not just the elbow.', is_superset: false },
      ],
      C: [
        { id: 1, name: 'Lat Pulldown', warmup_sets: '2', working_sets: '3', reps: '10-12', rest: '2 min', cue: 'Pull elbows down and back toward your hips.', is_superset: false },
        { id: 2, name: 'Dumbbell Row', warmup_sets: '1', working_sets: '3', reps: '10-12', rest: '2 min', cue: 'Brace on a bench. Pull elbow straight back. 10-12 reps each arm.', is_superset: false },
        { id: 3, name: 'Dumbbell Shoulder Press', warmup_sets: '1', working_sets: '3', reps: '10-12', rest: '90 sec', cue: 'Press straight up, don\'t shrug. Control the weight down.', is_superset: false },
        { id: 4, name: 'C1: Cable Face Pull', warmup_sets: '0', working_sets: '3', reps: '15-20', rest: '0 min', cue: 'Pull toward face, elbows high. Great for posture. Go straight to C2.', is_superset: true },
        { id: 5, name: 'C2: Lateral Raise (Dumbbell)', warmup_sets: '0', working_sets: '3', reps: '12-15', rest: '90 sec', cue: 'Slight forward lean, raise to shoulder height. Rest after C1+C2.', is_superset: true },
        { id: 6, name: 'Glute Bridge (Bodyweight or Barbell)', warmup_sets: '0', working_sets: '3', reps: '20', rest: '1 min', cue: 'Squeeze at top 1 full second every rep.', is_superset: false },
        { id: 7, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '40 sec', rest: '45 sec', cue: 'ABS FINISHER. Squeeze everything. Finish strong.', is_superset: false },
      ],
    },
  },
  4: {
    week: 4,
    phase: 'Phase 2 — Build the Volume',
    days: {
      A: [
        { id: 1, name: 'Back Squat (or Goblet Squat)', warmup_sets: '2', working_sets: '5', reps: '8-10', rest: '3 min', cue: 'Phase 2 starts — added a set. Keep the weight the same or go slightly heavier.', is_superset: false },
        { id: 2, name: 'Barbell Hip Thrust', warmup_sets: '2', working_sets: '4', reps: '10-12', rest: '2-3 min', cue: 'Drive through heels. Squeeze HARD at the top.', is_superset: false },
        { id: 3, name: 'Bulgarian Split Squat', warmup_sets: '1', working_sets: '4', reps: '10-12', rest: '2 min', cue: 'Back foot on bench. Chest tall. 10-12 reps each leg.', is_superset: false },
        { id: 4, name: 'A1: Cable Pull-Through', warmup_sets: '0', working_sets: '3', reps: '15', rest: '0 min', cue: 'Hinge at hips, squeeze glutes hard at the top. Go straight to A2.', is_superset: true },
        { id: 5, name: 'A2: Donkey Kick (Cable or Machine)', warmup_sets: '0', working_sets: '3', reps: '15-20', rest: '90 sec', cue: 'Keep hips square. Squeeze glute at top. 15-20 reps each leg. Rest after A1+A2.', is_superset: true },
        { id: 6, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '45 sec', rest: '45 sec', cue: 'ABS FINISHER. Squeeze abs and glutes. Straight line head to heels.', is_superset: false },
        { id: 7, name: 'Cable Crunch', warmup_sets: '0', working_sets: '3', reps: '20-25', rest: '1 min', cue: 'Round your back as you crunch. Feel your abs, not your neck.', is_superset: false },
      ],
      B: [
        { id: 1, name: 'Romanian Deadlift (RDL)', warmup_sets: '2', working_sets: '5', reps: '8-10', rest: '3 min', cue: 'Phase 2 — added set. Push hips back, slight knee bend.', is_superset: false },
        { id: 2, name: 'Leg Press', warmup_sets: '1', working_sets: '4', reps: '12-15', rest: '2 min', cue: 'Feet shoulder-width, mid-platform. Control the weight on the way down.', is_superset: false },
        { id: 3, name: 'Walking Lunge (Dumbbells)', warmup_sets: '0', working_sets: '3', reps: '12/leg', rest: '2 min', cue: 'Step forward, lower until back knee nearly touches floor. Keep chest up.', is_superset: false },
        { id: 4, name: 'B1: Seated Leg Curl', warmup_sets: '0', working_sets: '3', reps: '12-15', rest: '0 min', cue: 'Squeeze hamstrings at the top. Go straight to B2.', is_superset: true },
        { id: 5, name: 'B2: Machine Hip Abduction', warmup_sets: '0', working_sets: '3', reps: '15-20', rest: '90 sec', cue: 'Squeeze glutes at the top. Rest after B1+B2.', is_superset: true },
        { id: 6, name: 'Dead Bug', warmup_sets: '0', working_sets: '3', reps: '10/side', rest: '1 min', cue: 'Lower opposite arm + leg. Keep lower back pressed to floor.', is_superset: false },
        { id: 7, name: 'Bicycle Crunch', warmup_sets: '0', working_sets: '3', reps: '20/side', rest: '1 min', cue: 'Slow and controlled. Twist the whole torso, not just the elbow.', is_superset: false },
      ],
      C: [
        { id: 1, name: 'Lat Pulldown', warmup_sets: '2', working_sets: '4', reps: '10-12', rest: '2 min', cue: 'Pull elbows down and back toward your hips.', is_superset: false },
        { id: 2, name: 'Dumbbell Row', warmup_sets: '1', working_sets: '4', reps: '10-12', rest: '2 min', cue: 'Brace on a bench. Pull elbow straight back. 10-12 reps each arm.', is_superset: false },
        { id: 3, name: 'Dumbbell Shoulder Press', warmup_sets: '1', working_sets: '3', reps: '10-12', rest: '90 sec', cue: 'Press straight up, don\'t shrug. Control the weight down.', is_superset: false },
        { id: 4, name: 'C1: Cable Face Pull', warmup_sets: '0', working_sets: '3', reps: '15-20', rest: '0 min', cue: 'Pull toward face, elbows high. Great for posture. Go straight to C2.', is_superset: true },
        { id: 5, name: 'C2: Lateral Raise (Dumbbell)', warmup_sets: '0', working_sets: '3', reps: '12-15', rest: '90 sec', cue: 'Slight forward lean, raise to shoulder height. Rest after C1+C2.', is_superset: true },
        { id: 6, name: 'Glute Bridge (Bodyweight or Barbell)', warmup_sets: '0', working_sets: '3', reps: '20', rest: '1 min', cue: 'Squeeze at top 1 full second every rep.', is_superset: false },
        { id: 7, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '45 sec', rest: '45 sec', cue: 'ABS FINISHER. Squeeze everything. Finish strong.', is_superset: false },
      ],
    },
  },
  5: {
    week: 5,
    phase: 'Phase 2 — Build the Volume',
    days: {
      A: [
        { id: 1, name: 'Back Squat (or Goblet Squat)', warmup_sets: '2', working_sets: '5', reps: '8-10', rest: '3 min', cue: 'Add weight if last week felt manageable. Leave 2-3 reps in the tank.', is_superset: false },
        { id: 2, name: 'Barbell Hip Thrust', warmup_sets: '2', working_sets: '4', reps: '10-12', rest: '2-3 min', cue: 'Drive through heels. Squeeze HARD at the top.', is_superset: false },
        { id: 3, name: 'Bulgarian Split Squat', warmup_sets: '1', working_sets: '4', reps: '10-12', rest: '2 min', cue: 'Back foot on bench. Chest tall. 10-12 reps each leg.', is_superset: false },
        { id: 4, name: 'A1: Cable Pull-Through', warmup_sets: '0', working_sets: '4', reps: '15', rest: '0 min', cue: 'Hinge at hips, squeeze glutes hard at the top. Go straight to A2.', is_superset: true },
        { id: 5, name: 'A2: Donkey Kick (Cable or Machine)', warmup_sets: '0', working_sets: '4', reps: '15-20', rest: '90 sec', cue: 'Keep hips square. Squeeze glute at top. 15-20 reps each leg. Rest after A1+A2.', is_superset: true },
        { id: 6, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '45 sec', rest: '45 sec', cue: 'ABS FINISHER. Squeeze abs and glutes. Straight line head to heels.', is_superset: false },
        { id: 7, name: 'Cable Crunch', warmup_sets: '0', working_sets: '3', reps: '20-25', rest: '1 min', cue: 'Round your back as you crunch. Feel your abs, not your neck.', is_superset: false },
      ],
      B: [
        { id: 1, name: 'Romanian Deadlift (RDL)', warmup_sets: '2', working_sets: '5', reps: '8-10', rest: '3 min', cue: 'Push hips back, slight knee bend. Feel the hamstring stretch.', is_superset: false },
        { id: 2, name: 'Leg Press', warmup_sets: '1', working_sets: '4', reps: '12-15', rest: '2 min', cue: 'Feet shoulder-width, mid-platform. Control the weight on the way down.', is_superset: false },
        { id: 3, name: 'Walking Lunge (Dumbbells)', warmup_sets: '0', working_sets: '4', reps: '12/leg', rest: '2 min', cue: 'Step forward, lower until back knee nearly touches floor. Keep chest up.', is_superset: false },
        { id: 4, name: 'B1: Seated Leg Curl', warmup_sets: '0', working_sets: '3', reps: '12-15', rest: '0 min', cue: 'Squeeze hamstrings at the top. Go straight to B2.', is_superset: true },
        { id: 5, name: 'B2: Machine Hip Abduction', warmup_sets: '0', working_sets: '3', reps: '15-20', rest: '90 sec', cue: 'Squeeze glutes at the top. Rest after B1+B2.', is_superset: true },
        { id: 6, name: 'Dead Bug', warmup_sets: '0', working_sets: '3', reps: '10/side', rest: '1 min', cue: 'Lower opposite arm + leg. Keep lower back pressed to floor.', is_superset: false },
        { id: 7, name: 'Bicycle Crunch', warmup_sets: '0', working_sets: '3', reps: '20/side', rest: '1 min', cue: 'Slow and controlled. Twist the whole torso, not just the elbow.', is_superset: false },
      ],
      C: [
        { id: 1, name: 'Lat Pulldown', warmup_sets: '2', working_sets: '4', reps: '10-12', rest: '2 min', cue: 'Pull elbows down and back toward your hips.', is_superset: false },
        { id: 2, name: 'Dumbbell Row', warmup_sets: '1', working_sets: '4', reps: '10-12', rest: '2 min', cue: 'Brace on a bench. Pull elbow straight back. 10-12 reps each arm.', is_superset: false },
        { id: 3, name: 'Dumbbell Shoulder Press', warmup_sets: '1', working_sets: '3', reps: '10-12', rest: '90 sec', cue: 'Press straight up, don\'t shrug. Control the weight down.', is_superset: false },
        { id: 4, name: 'C1: Cable Face Pull', warmup_sets: '0', working_sets: '3', reps: '15-20', rest: '0 min', cue: 'Pull toward face, elbows high. Go straight to C2.', is_superset: true },
        { id: 5, name: 'C2: Lateral Raise (Dumbbell)', warmup_sets: '0', working_sets: '3', reps: '12-15', rest: '90 sec', cue: 'Slight forward lean, raise to shoulder height. Rest after C1+C2.', is_superset: true },
        { id: 6, name: 'Glute Bridge (Bodyweight or Barbell)', warmup_sets: '0', working_sets: '3', reps: '20', rest: '1 min', cue: 'Squeeze at top 1 full second every rep.', is_superset: false },
        { id: 7, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '45 sec', rest: '45 sec', cue: 'ABS FINISHER. Squeeze everything. Finish strong.', is_superset: false },
      ],
    },
  },
  6: {
    week: 6,
    phase: 'Phase 2 — Build the Volume',
    days: {
      A: [
        { id: 1, name: 'Back Squat (or Goblet Squat)', warmup_sets: '2', working_sets: '5', reps: '6-8', rest: '3 min', cue: 'Last Phase 2 week — push the weight. Deload comes after Week 6... but not yet!', is_superset: false },
        { id: 2, name: 'Barbell Hip Thrust', warmup_sets: '2', working_sets: '4', reps: '8-10', rest: '2-3 min', cue: 'Drive through heels. Squeeze HARD at the top.', is_superset: false },
        { id: 3, name: 'Bulgarian Split Squat', warmup_sets: '1', working_sets: '4', reps: '8-10', rest: '2 min', cue: 'Back foot on bench. Chest tall. Heavier than last week.', is_superset: false },
        { id: 4, name: 'A1: Cable Pull-Through', warmup_sets: '0', working_sets: '4', reps: '15', rest: '0 min', cue: 'Hinge at hips, squeeze glutes hard at the top. Go straight to A2.', is_superset: true },
        { id: 5, name: 'A2: Donkey Kick (Cable or Machine)', warmup_sets: '0', working_sets: '4', reps: '15-20', rest: '90 sec', cue: 'Keep hips square. Squeeze glute at top. Rest after A1+A2.', is_superset: true },
        { id: 6, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '50 sec', rest: '45 sec', cue: 'ABS FINISHER. Squeeze abs and glutes. Straight line head to heels.', is_superset: false },
        { id: 7, name: 'Cable Crunch', warmup_sets: '0', working_sets: '4', reps: '20-25', rest: '1 min', cue: 'Round your back as you crunch. Feel your abs, not your neck.', is_superset: false },
      ],
      B: [
        { id: 1, name: 'Romanian Deadlift (RDL)', warmup_sets: '2', working_sets: '5', reps: '6-8', rest: '3 min', cue: 'Last Phase 2 week. Heavier than last week.', is_superset: false },
        { id: 2, name: 'Leg Press', warmup_sets: '1', working_sets: '4', reps: '10-12', rest: '2 min', cue: 'Feet shoulder-width, mid-platform. Control the weight on the way down.', is_superset: false },
        { id: 3, name: 'Walking Lunge (Dumbbells)', warmup_sets: '0', working_sets: '4', reps: '12/leg', rest: '2 min', cue: 'Step forward, lower until back knee nearly touches floor. Keep chest up.', is_superset: false },
        { id: 4, name: 'B1: Seated Leg Curl', warmup_sets: '0', working_sets: '4', reps: '12-15', rest: '0 min', cue: 'Squeeze hamstrings at the top. Go straight to B2.', is_superset: true },
        { id: 5, name: 'B2: Machine Hip Abduction', warmup_sets: '0', working_sets: '4', reps: '15-20', rest: '90 sec', cue: 'Squeeze glutes at the top. Rest after B1+B2.', is_superset: true },
        { id: 6, name: 'Dead Bug', warmup_sets: '0', working_sets: '3', reps: '12/side', rest: '1 min', cue: 'Lower opposite arm + leg. Keep lower back pressed to floor.', is_superset: false },
        { id: 7, name: 'Bicycle Crunch', warmup_sets: '0', working_sets: '3', reps: '25/side', rest: '1 min', cue: 'Slow and controlled. Twist the whole torso, not just the elbow.', is_superset: false },
      ],
      C: [
        { id: 1, name: 'Lat Pulldown', warmup_sets: '2', working_sets: '4', reps: '8-10', rest: '2 min', cue: 'Pull elbows down and back toward your hips. Go heavier.', is_superset: false },
        { id: 2, name: 'Dumbbell Row', warmup_sets: '1', working_sets: '4', reps: '8-10', rest: '2 min', cue: 'Brace on a bench. Pull elbow straight back. 8-10 reps each arm.', is_superset: false },
        { id: 3, name: 'Dumbbell Shoulder Press', warmup_sets: '1', working_sets: '4', reps: '10-12', rest: '90 sec', cue: 'Press straight up, don\'t shrug. Control the weight down.', is_superset: false },
        { id: 4, name: 'C1: Cable Face Pull', warmup_sets: '0', working_sets: '4', reps: '15-20', rest: '0 min', cue: 'Pull toward face, elbows high. Go straight to C2.', is_superset: true },
        { id: 5, name: 'C2: Lateral Raise (Dumbbell)', warmup_sets: '0', working_sets: '4', reps: '12-15', rest: '90 sec', cue: 'Slight forward lean, raise to shoulder height. Rest after C1+C2.', is_superset: true },
        { id: 6, name: 'Glute Bridge (Bodyweight or Barbell)', warmup_sets: '0', working_sets: '4', reps: '20', rest: '1 min', cue: 'Squeeze at top 1 full second every rep.', is_superset: false },
        { id: 7, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '50 sec', rest: '45 sec', cue: 'ABS FINISHER. Squeeze everything. Finish strong.', is_superset: false },
      ],
    },
  },
  7: {
    week: 7,
    phase: 'Phase 3 — Peak Intensity',
    days: {
      A: [
        { id: 1, name: 'Back Squat (or Goblet Squat)', warmup_sets: '2', working_sets: '5', reps: '6-8', rest: '3-4 min', cue: 'Phase 3 — leave only 1-2 reps in the tank. Heavier than anything in Phase 2.', is_superset: false },
        { id: 2, name: 'Barbell Hip Thrust', warmup_sets: '2', working_sets: '4', reps: '8-10', rest: '2-3 min', cue: 'Drive through heels. Squeeze HARD at the top.', is_superset: false },
        { id: 3, name: 'Bulgarian Split Squat', warmup_sets: '1', working_sets: '4', reps: '8-10', rest: '2 min', cue: 'Back foot on bench. Chest tall. Push to failure on last set.', is_superset: false },
        { id: 4, name: 'A1: Cable Pull-Through', warmup_sets: '0', working_sets: '4', reps: '12', rest: '0 min', cue: 'Hinge at hips, squeeze glutes hard at the top. Go straight to A2.', is_superset: true },
        { id: 5, name: 'A2: Donkey Kick (Cable or Machine)', warmup_sets: '0', working_sets: '4', reps: '15', rest: '90 sec', cue: 'Keep hips square. Squeeze glute at top. Rest after A1+A2.', is_superset: true },
        { id: 6, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '60 sec', rest: '45 sec', cue: 'ABS FINISHER. Full 60 seconds. Breathe and brace.', is_superset: false },
        { id: 7, name: 'Cable Crunch', warmup_sets: '0', working_sets: '4', reps: '20-25', rest: '1 min', cue: 'Round your back as you crunch. Feel your abs, not your neck.', is_superset: false },
      ],
      B: [
        { id: 1, name: 'Romanian Deadlift (RDL)', warmup_sets: '2', working_sets: '5', reps: '6-8', rest: '3-4 min', cue: 'Peak intensity — heaviest RDLs yet. Feel every rep in your hamstrings.', is_superset: false },
        { id: 2, name: 'Leg Press', warmup_sets: '1', working_sets: '4', reps: '10-12', rest: '2 min', cue: 'Feet shoulder-width, mid-platform. Control the weight on the way down.', is_superset: false },
        { id: 3, name: 'Walking Lunge (Dumbbells)', warmup_sets: '0', working_sets: '4', reps: '12/leg', rest: '2 min', cue: 'Step forward, lower until back knee nearly touches floor. Keep chest up.', is_superset: false },
        { id: 4, name: 'B1: Seated Leg Curl', warmup_sets: '0', working_sets: '4', reps: '10-12', rest: '0 min', cue: 'Squeeze hamstrings at the top. Go straight to B2.', is_superset: true },
        { id: 5, name: 'B2: Machine Hip Abduction', warmup_sets: '0', working_sets: '4', reps: '15-20', rest: '90 sec', cue: 'Squeeze glutes at the top. Rest after B1+B2.', is_superset: true },
        { id: 6, name: 'Dead Bug', warmup_sets: '0', working_sets: '3', reps: '12/side', rest: '1 min', cue: 'Lower opposite arm + leg. Keep lower back pressed to floor.', is_superset: false },
        { id: 7, name: 'Bicycle Crunch', warmup_sets: '0', working_sets: '4', reps: '25/side', rest: '1 min', cue: 'Slow and controlled. Twist the whole torso, not just the elbow.', is_superset: false },
      ],
      C: [
        { id: 1, name: 'Lat Pulldown', warmup_sets: '2', working_sets: '4', reps: '8-10', rest: '2 min', cue: 'Pull elbows down and back toward your hips. Heavier this phase.', is_superset: false },
        { id: 2, name: 'Dumbbell Row', warmup_sets: '1', working_sets: '4', reps: '8-10', rest: '2 min', cue: 'Brace on a bench. Pull elbow straight back. 8-10 reps each arm.', is_superset: false },
        { id: 3, name: 'Dumbbell Shoulder Press', warmup_sets: '1', working_sets: '4', reps: '8-10', rest: '90 sec', cue: 'Press straight up, don\'t shrug. Control the weight down.', is_superset: false },
        { id: 4, name: 'C1: Cable Face Pull', warmup_sets: '0', working_sets: '4', reps: '15-20', rest: '0 min', cue: 'Pull toward face, elbows high. Go straight to C2.', is_superset: true },
        { id: 5, name: 'C2: Lateral Raise (Dumbbell)', warmup_sets: '0', working_sets: '4', reps: '12-15', rest: '90 sec', cue: 'Slight forward lean, raise to shoulder height. Rest after C1+C2.', is_superset: true },
        { id: 6, name: 'Glute Bridge (Bodyweight or Barbell)', warmup_sets: '0', working_sets: '4', reps: '15-20', rest: '1 min', cue: 'Squeeze at top 1 full second every rep.', is_superset: false },
        { id: 7, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '60 sec', rest: '45 sec', cue: 'ABS FINISHER. Squeeze everything. Finish strong.', is_superset: false },
      ],
    },
  },
  8: {
    week: 8,
    phase: 'Phase 3 — Peak Intensity',
    days: {
      A: [
        { id: 1, name: 'Back Squat (or Goblet Squat)', warmup_sets: '2', working_sets: '5', reps: '5-6', rest: '3-4 min', cue: 'Heavier than Week 7. These are your peak squats. Leave 1 rep in the tank.', is_superset: false },
        { id: 2, name: 'Barbell Hip Thrust', warmup_sets: '2', working_sets: '4', reps: '8-10', rest: '2-3 min', cue: 'Drive through heels. Squeeze HARD at the top.', is_superset: false },
        { id: 3, name: 'Bulgarian Split Squat', warmup_sets: '1', working_sets: '4', reps: '8-10', rest: '2 min', cue: 'Back foot on bench. Chest tall. Heavier than last week.', is_superset: false },
        { id: 4, name: 'A1: Cable Pull-Through', warmup_sets: '0', working_sets: '4', reps: '12', rest: '0 min', cue: 'Hinge at hips, squeeze glutes hard at the top. Go straight to A2.', is_superset: true },
        { id: 5, name: 'A2: Donkey Kick (Cable or Machine)', warmup_sets: '0', working_sets: '4', reps: '15', rest: '90 sec', cue: 'Keep hips square. Squeeze glute at top. Rest after A1+A2.', is_superset: true },
        { id: 6, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '60 sec', rest: '45 sec', cue: 'ABS FINISHER. Hold that 60 seconds. You\'ve got it.', is_superset: false },
        { id: 7, name: 'Cable Crunch', warmup_sets: '0', working_sets: '4', reps: '20-25', rest: '1 min', cue: 'Round your back as you crunch. Feel your abs, not your neck.', is_superset: false },
      ],
      B: [
        { id: 1, name: 'Romanian Deadlift (RDL)', warmup_sets: '2', working_sets: '5', reps: '5-6', rest: '3-4 min', cue: 'Heavier than Week 7. These are your peak deadlifts.', is_superset: false },
        { id: 2, name: 'Leg Press', warmup_sets: '1', working_sets: '4', reps: '10-12', rest: '2 min', cue: 'Feet shoulder-width, mid-platform. Control the weight on the way down.', is_superset: false },
        { id: 3, name: 'Walking Lunge (Dumbbells)', warmup_sets: '0', working_sets: '4', reps: '12/leg', rest: '2 min', cue: 'Step forward, lower until back knee nearly touches floor. Keep chest up.', is_superset: false },
        { id: 4, name: 'B1: Seated Leg Curl', warmup_sets: '0', working_sets: '4', reps: '10-12', rest: '0 min', cue: 'Squeeze hamstrings at the top. Go straight to B2.', is_superset: true },
        { id: 5, name: 'B2: Machine Hip Abduction', warmup_sets: '0', working_sets: '4', reps: '15-20', rest: '90 sec', cue: 'Squeeze glutes at the top. Rest after B1+B2.', is_superset: true },
        { id: 6, name: 'Dead Bug', warmup_sets: '0', working_sets: '3', reps: '12/side', rest: '1 min', cue: 'Lower opposite arm + leg. Keep lower back pressed to floor.', is_superset: false },
        { id: 7, name: 'Bicycle Crunch', warmup_sets: '0', working_sets: '4', reps: '25/side', rest: '1 min', cue: 'Slow and controlled. Twist the whole torso, not just the elbow.', is_superset: false },
      ],
      C: [
        { id: 1, name: 'Lat Pulldown', warmup_sets: '2', working_sets: '4', reps: '8-10', rest: '2 min', cue: 'Pull elbows down and back toward your hips. Heavier than Week 7.', is_superset: false },
        { id: 2, name: 'Dumbbell Row', warmup_sets: '1', working_sets: '4', reps: '8-10', rest: '2 min', cue: 'Brace on a bench. Pull elbow straight back. 8-10 reps each arm.', is_superset: false },
        { id: 3, name: 'Dumbbell Shoulder Press', warmup_sets: '1', working_sets: '4', reps: '8-10', rest: '90 sec', cue: 'Press straight up, don\'t shrug. Control the weight down.', is_superset: false },
        { id: 4, name: 'C1: Cable Face Pull', warmup_sets: '0', working_sets: '4', reps: '15-20', rest: '0 min', cue: 'Pull toward face, elbows high. Go straight to C2.', is_superset: true },
        { id: 5, name: 'C2: Lateral Raise (Dumbbell)', warmup_sets: '0', working_sets: '4', reps: '12-15', rest: '90 sec', cue: 'Slight forward lean, raise to shoulder height. Rest after C1+C2.', is_superset: true },
        { id: 6, name: 'Glute Bridge (Bodyweight or Barbell)', warmup_sets: '0', working_sets: '4', reps: '15-20', rest: '1 min', cue: 'Squeeze at top 1 full second every rep.', is_superset: false },
        { id: 7, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '60 sec', rest: '45 sec', cue: 'ABS FINISHER. Squeeze everything. Finish strong.', is_superset: false },
      ],
    },
  },
  9: {
    week: 9,
    phase: 'Phase 3 — Peak Intensity',
    days: {
      A: [
        { id: 1, name: 'Back Squat (or Goblet Squat)', warmup_sets: '2', working_sets: '5', reps: '4-5', rest: '4 min', cue: 'PEAK WEEK. Your heaviest squats of the program. Write this weight down — you\'ll beat it next block.', is_superset: false },
        { id: 2, name: 'Barbell Hip Thrust', warmup_sets: '2', working_sets: '4', reps: '8-10', rest: '3 min', cue: 'Heaviest hip thrusts of the program. Every rep counts.', is_superset: false },
        { id: 3, name: 'Bulgarian Split Squat', warmup_sets: '1', working_sets: '4', reps: '8-10', rest: '2 min', cue: 'Back foot on bench. Chest tall. Heaviest of the program.', is_superset: false },
        { id: 4, name: 'A1: Cable Pull-Through', warmup_sets: '0', working_sets: '4', reps: '12', rest: '0 min', cue: 'Hinge at hips, squeeze glutes hard at the top. Go straight to A2.', is_superset: true },
        { id: 5, name: 'A2: Donkey Kick (Cable or Machine)', warmup_sets: '0', working_sets: '4', reps: '15', rest: '90 sec', cue: 'Keep hips square. Squeeze glute at top. Rest after A1+A2.', is_superset: true },
        { id: 6, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '60 sec', rest: '45 sec', cue: 'ABS FINISHER. Last peak plank. Give it everything.', is_superset: false },
        { id: 7, name: 'Cable Crunch', warmup_sets: '0', working_sets: '4', reps: '20-25', rest: '1 min', cue: 'Round your back as you crunch. Feel your abs, not your neck.', is_superset: false },
      ],
      B: [
        { id: 1, name: 'Romanian Deadlift (RDL)', warmup_sets: '2', working_sets: '5', reps: '4-5', rest: '4 min', cue: 'PEAK WEEK. Your heaviest RDLs of the program. Record this weight.', is_superset: false },
        { id: 2, name: 'Leg Press', warmup_sets: '1', working_sets: '4', reps: '8-10', rest: '2 min', cue: 'Feet shoulder-width, mid-platform. Control the weight on the way down.', is_superset: false },
        { id: 3, name: 'Walking Lunge (Dumbbells)', warmup_sets: '0', working_sets: '4', reps: '12/leg', rest: '2 min', cue: 'Step forward, lower until back knee nearly touches floor. Keep chest up.', is_superset: false },
        { id: 4, name: 'B1: Seated Leg Curl', warmup_sets: '0', working_sets: '4', reps: '10-12', rest: '0 min', cue: 'Squeeze hamstrings at the top. Go straight to B2.', is_superset: true },
        { id: 5, name: 'B2: Machine Hip Abduction', warmup_sets: '0', working_sets: '4', reps: '15-20', rest: '90 sec', cue: 'Squeeze glutes at the top. Rest after B1+B2.', is_superset: true },
        { id: 6, name: 'Dead Bug', warmup_sets: '0', working_sets: '3', reps: '12/side', rest: '1 min', cue: 'Lower opposite arm + leg. Keep lower back pressed to floor.', is_superset: false },
        { id: 7, name: 'Bicycle Crunch', warmup_sets: '0', working_sets: '4', reps: '25/side', rest: '1 min', cue: 'Slow and controlled. Twist the whole torso, not just the elbow.', is_superset: false },
      ],
      C: [
        { id: 1, name: 'Lat Pulldown', warmup_sets: '2', working_sets: '4', reps: '6-8', rest: '2-3 min', cue: 'Pull elbows down and back toward your hips. Heaviest pulldowns of the program.', is_superset: false },
        { id: 2, name: 'Dumbbell Row', warmup_sets: '1', working_sets: '4', reps: '8-10', rest: '2 min', cue: 'Brace on a bench. Pull elbow straight back. 8-10 reps each arm.', is_superset: false },
        { id: 3, name: 'Dumbbell Shoulder Press', warmup_sets: '1', working_sets: '4', reps: '8-10', rest: '90 sec', cue: 'Press straight up, don\'t shrug. Control the weight down.', is_superset: false },
        { id: 4, name: 'C1: Cable Face Pull', warmup_sets: '0', working_sets: '4', reps: '15-20', rest: '0 min', cue: 'Pull toward face, elbows high. Go straight to C2.', is_superset: true },
        { id: 5, name: 'C2: Lateral Raise (Dumbbell)', warmup_sets: '0', working_sets: '4', reps: '12-15', rest: '90 sec', cue: 'Slight forward lean, raise to shoulder height. Rest after C1+C2.', is_superset: true },
        { id: 6, name: 'Glute Bridge (Bodyweight or Barbell)', warmup_sets: '0', working_sets: '4', reps: '15', rest: '1 min', cue: 'Squeeze at top 1 full second every rep. Peak output.', is_superset: false },
        { id: 7, name: 'Plank', warmup_sets: '0', working_sets: '3', reps: '60 sec', rest: '45 sec', cue: 'ABS FINISHER. PEAK WEEK. Squeeze everything. You earned this.', is_superset: false },
      ],
    },
  },
  10: {
    week: 10,
    phase: 'Deload — Active Recovery',
    days: {
      A: [
        { id: 1, name: 'Back Squat / Goblet Squat', warmup_sets: '1', working_sets: '3', reps: '12-15', rest: '2 min', cue: 'Use ~50% of Week 9 weight. Should feel EASY. Slow and controlled. Feel every rep.', is_superset: false },
        { id: 2, name: 'Barbell Hip Thrust', warmup_sets: '1', working_sets: '3', reps: '15-20', rest: '2 min', cue: '~50% of Week 9 weight. Squeeze at the top every single rep.', is_superset: false },
        { id: 3, name: 'Romanian Deadlift', warmup_sets: '1', working_sets: '3', reps: '12', rest: '2 min', cue: '~50% weight. Hamstring stretch focus. No rush.', is_superset: false },
        { id: 4, name: 'Leg Press', warmup_sets: '0', working_sets: '2', reps: '15', rest: '90 sec', cue: '~50% weight. Full range of motion.', is_superset: false },
        { id: 5, name: 'Leg Curl', warmup_sets: '0', working_sets: '2', reps: '15', rest: '90 sec', cue: '~50% weight. Squeeze hamstrings at top.', is_superset: false },
        { id: 6, name: 'Lat Pulldown', warmup_sets: '0', working_sets: '2', reps: '12', rest: '90 sec', cue: '~50% weight. Feel the full stretch at the top.', is_superset: false },
        { id: 7, name: 'Dumbbell Row', warmup_sets: '0', working_sets: '2', reps: '12/arm', rest: '90 sec', cue: '~50% weight. Controlled. Feel your back.', is_superset: false },
        { id: 8, name: 'Plank', warmup_sets: '0', working_sets: '2', reps: '30 sec', rest: '45 sec', cue: 'Bodyweight. Breathe and brace.', is_superset: false },
        { id: 9, name: 'Cable Crunch', warmup_sets: '0', working_sets: '2', reps: '20', rest: '1 min', cue: 'Light weight. Round your back. Feel your abs.', is_superset: false },
      ],
      B: [
        { id: 1, name: 'Back Squat / Goblet Squat', warmup_sets: '1', working_sets: '3', reps: '12-15', rest: '2 min', cue: '~50% weight. Slow and controlled.', is_superset: false },
        { id: 2, name: 'Barbell Hip Thrust', warmup_sets: '1', working_sets: '3', reps: '15-20', rest: '2 min', cue: '~50% weight. Focus on the squeeze.', is_superset: false },
        { id: 3, name: 'Romanian Deadlift', warmup_sets: '1', working_sets: '3', reps: '12', rest: '2 min', cue: '~50% weight. Hamstring focus.', is_superset: false },
        { id: 4, name: 'Leg Press', warmup_sets: '0', working_sets: '2', reps: '15', rest: '90 sec', cue: '~50% weight. Full range of motion.', is_superset: false },
        { id: 5, name: 'Leg Curl', warmup_sets: '0', working_sets: '2', reps: '15', rest: '90 sec', cue: '~50% weight. Squeeze hamstrings at top.', is_superset: false },
        { id: 6, name: 'Lat Pulldown', warmup_sets: '0', working_sets: '2', reps: '12', rest: '90 sec', cue: '~50% weight. Feel the full stretch.', is_superset: false },
        { id: 7, name: 'Dumbbell Row', warmup_sets: '0', working_sets: '2', reps: '12/arm', rest: '90 sec', cue: '~50% weight. Controlled.', is_superset: false },
        { id: 8, name: 'Plank', warmup_sets: '0', working_sets: '2', reps: '30 sec', rest: '45 sec', cue: 'Bodyweight. Breathe and brace.', is_superset: false },
        { id: 9, name: 'Cable Crunch', warmup_sets: '0', working_sets: '2', reps: '20', rest: '1 min', cue: 'Light weight. Feel your abs.', is_superset: false },
      ],
      C: [
        { id: 1, name: 'Back Squat / Goblet Squat', warmup_sets: '1', working_sets: '3', reps: '12-15', rest: '2 min', cue: '~50% weight. Last deload session — enjoy the easy movement.', is_superset: false },
        { id: 2, name: 'Barbell Hip Thrust', warmup_sets: '1', working_sets: '3', reps: '15-20', rest: '2 min', cue: '~50% weight. Perfect form and mind-muscle connection.', is_superset: false },
        { id: 3, name: 'Romanian Deadlift', warmup_sets: '1', working_sets: '3', reps: '12', rest: '2 min', cue: '~50% weight. Hamstring focus. Feel that recovered body.', is_superset: false },
        { id: 4, name: 'Leg Press', warmup_sets: '0', working_sets: '2', reps: '15', rest: '90 sec', cue: '~50% weight. Full range of motion.', is_superset: false },
        { id: 5, name: 'Leg Curl', warmup_sets: '0', working_sets: '2', reps: '15', rest: '90 sec', cue: '~50% weight. Squeeze hamstrings at top.', is_superset: false },
        { id: 6, name: 'Lat Pulldown', warmup_sets: '0', working_sets: '2', reps: '12', rest: '90 sec', cue: '~50% weight. Feel the full stretch.', is_superset: false },
        { id: 7, name: 'Dumbbell Row', warmup_sets: '0', working_sets: '2', reps: '12/arm', rest: '90 sec', cue: '~50% weight. Controlled.', is_superset: false },
        { id: 8, name: 'Plank', warmup_sets: '0', working_sets: '2', reps: '30 sec', rest: '45 sec', cue: 'Bodyweight. You\'ve made it to deload week!', is_superset: false },
        { id: 9, name: 'Cable Crunch', warmup_sets: '0', working_sets: '2', reps: '20', rest: '1 min', cue: 'Light weight. Nice and easy. Program complete!', is_superset: false },
      ],
    },
  },
}
