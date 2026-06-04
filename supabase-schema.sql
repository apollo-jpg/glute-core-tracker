-- Run this in your Supabase SQL editor

create table if not exists workout_logs (
  id uuid default gen_random_uuid() primary key,
  username text not null,
  week_number int not null,
  day_key text not null,
  exercise_name text not null,
  completed boolean default false,
  weight_lbs numeric,
  note text,
  logged_at timestamptz default now(),
  unique(username, week_number, day_key, exercise_name)
);

create table if not exists user_progress (
  username text primary key,
  start_date date not null
);

-- Enable Row Level Security (optional but recommended)
-- alter table workout_logs enable row level security;
-- alter table user_progress enable row level security;
-- create policy "Public read/write" on workout_logs for all using (true) with check (true);
-- create policy "Public read/write" on user_progress for all using (true) with check (true);
