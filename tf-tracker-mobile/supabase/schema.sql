-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & PROFILES
-- ============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'free' CHECK (role IN ('free', 'premium', 'coach')),
  height_cm NUMERIC,
  birth_date DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  activity_level TEXT CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'active', 'very_active')),
  goal TEXT CHECK (goal IN ('lose_weight', 'gain_muscle', 'maintain', 'improve_health', 'athletic_performance')),
  daily_calories_target INTEGER DEFAULT 2000,
  protein_target_g INTEGER DEFAULT 150,
  carbs_target_g INTEGER DEFAULT 250,
  fat_target_g INTEGER DEFAULT 70,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- NUTRITION
-- ============================================
CREATE TABLE public.meal_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  created_by UUID REFERENCES public.profiles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.meals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  meal_plan_id UUID REFERENCES public.meal_plans(id) ON DELETE CASCADE NOT NULL,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'morning_snack', 'lunch', 'afternoon_snack', 'dinner', 'evening_snack')),
  scheduled_time TIME,
  name TEXT NOT NULL,
  total_calories INTEGER DEFAULT 0,
  total_protein NUMERIC(6,1) DEFAULT 0,
  total_carbs NUMERIC(6,1) DEFAULT 0,
  total_fat NUMERIC(6,1) DEFAULT 0,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE public.meal_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  meal_id UUID REFERENCES public.meals(id) ON DELETE CASCADE NOT NULL,
  food_name TEXT NOT NULL,
  quantity NUMERIC(8,1) NOT NULL,
  unit TEXT NOT NULL DEFAULT 'g',
  calories INTEGER DEFAULT 0,
  protein NUMERIC(6,1) DEFAULT 0,
  carbs NUMERIC(6,1) DEFAULT 0,
  fat NUMERIC(6,1) DEFAULT 0,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE public.food_substitutions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  meal_item_id UUID REFERENCES public.meal_items(id) ON DELETE CASCADE NOT NULL,
  alt_food_name TEXT NOT NULL,
  alt_quantity NUMERIC(8,1) NOT NULL,
  alt_unit TEXT NOT NULL DEFAULT 'g',
  alt_calories INTEGER DEFAULT 0,
  alt_protein NUMERIC(6,1) DEFAULT 0,
  alt_carbs NUMERIC(6,1) DEFAULT 0,
  alt_fat NUMERIC(6,1) DEFAULT 0
);

CREATE TABLE public.recipes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  calories INTEGER,
  prep_time_minutes INTEGER,
  ingredients JSONB DEFAULT '[]',
  instructions JSONB DEFAULT '[]',
  is_premium BOOLEAN DEFAULT true,
  category TEXT CHECK (category IN ('breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'drink')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- WORKOUTS
-- ============================================
CREATE TABLE public.workout_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  title TEXT NOT NULL,
  created_by UUID REFERENCES public.profiles(id),
  duration_minutes INTEGER DEFAULT 20,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.exercises (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  workout_plan_id UUID REFERENCES public.workout_plans(id) ON DELETE CASCADE NOT NULL,
  exercise_name TEXT NOT NULL,
  target_sets INTEGER NOT NULL DEFAULT 3,
  target_reps TEXT NOT NULL DEFAULT '12',
  target_weight NUMERIC(6,1),
  rest_seconds INTEGER DEFAULT 60,
  video_url TEXT,
  thumbnail_url TEXT,
  instructions TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE public.workout_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  exercise_id UUID REFERENCES public.exercises(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  set_number INTEGER NOT NULL,
  actual_reps INTEGER,
  actual_weight NUMERIC(6,1),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- METRICS & PROGRESS
-- ============================================
CREATE TABLE public.weight_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  weight_kg NUMERIC(5,1) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

CREATE TABLE public.body_metrics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  body_fat_pct NUMERIC(4,1),
  muscle_mass_kg NUMERIC(5,1),
  chest_cm NUMERIC(5,1),
  waist_cm NUMERIC(5,1),
  hips_cm NUMERIC(5,1),
  arm_cm NUMERIC(5,1),
  thigh_cm NUMERIC(5,1),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.progress_photos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  photo_url TEXT NOT NULL,
  photo_type TEXT CHECK (photo_type IN ('front', 'side', 'back')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CHAT
-- ============================================
CREATE TABLE public.conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  coach_id UUID REFERENCES public.profiles(id) NOT NULL,
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONTENT
-- ============================================
CREATE TABLE public.articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT CHECK (category IN ('nutrition', 'fitness', 'mindset', 'recipes', 'science')),
  image_url TEXT,
  is_premium BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SUBSCRIPTIONS
-- ============================================
CREATE TABLE public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('free', 'premium', 'coaching_online', 'coaching_frontal')),
  status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'expired', 'trial')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  trial_ends_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weight_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.body_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_substitutions ENABLE ROW LEVEL SECURITY;

-- Users see own data, coach sees all
CREATE POLICY "Users see own profile" ON public.profiles FOR SELECT USING (auth.uid() = id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach'));
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users see own meal plans" ON public.meal_plans FOR SELECT USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach'));
CREATE POLICY "Coach creates meal plans" ON public.meal_plans FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach') OR user_id = auth.uid());

CREATE POLICY "Users see own workouts" ON public.workout_plans FOR SELECT USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach'));
CREATE POLICY "Coach creates workouts" ON public.workout_plans FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach') OR user_id = auth.uid());

CREATE POLICY "Users see own weight" ON public.weight_logs FOR SELECT USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach'));
CREATE POLICY "Users log own weight" ON public.weight_logs FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users see own metrics" ON public.body_metrics FOR SELECT USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach'));
CREATE POLICY "Users log own metrics" ON public.body_metrics FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users see own conversations" ON public.conversations FOR SELECT USING (client_id = auth.uid() OR coach_id = auth.uid());
CREATE POLICY "Users see own messages" ON public.messages FOR SELECT USING (EXISTS (SELECT 1 FROM public.conversations WHERE id = conversation_id AND (client_id = auth.uid() OR coach_id = auth.uid())));
CREATE POLICY "Users send messages" ON public.messages FOR INSERT WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Anyone reads articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Anyone reads recipes" ON public.recipes FOR SELECT USING (true);

CREATE POLICY "Users see own subscription" ON public.subscriptions FOR SELECT USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach'));

-- Cascade policies for child tables
CREATE POLICY "meals_select" ON public.meals FOR SELECT USING (EXISTS (SELECT 1 FROM public.meal_plans WHERE id = meal_plan_id AND (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach'))));
CREATE POLICY "meal_items_select" ON public.meal_items FOR SELECT USING (EXISTS (SELECT 1 FROM public.meals m JOIN public.meal_plans mp ON m.meal_plan_id = mp.id WHERE m.id = meal_id AND (mp.user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach'))));
CREATE POLICY "exercises_select" ON public.exercises FOR SELECT USING (EXISTS (SELECT 1 FROM public.workout_plans WHERE id = workout_plan_id AND (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach'))));
CREATE POLICY "workout_logs_select" ON public.workout_logs FOR SELECT USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach'));
CREATE POLICY "workout_logs_insert" ON public.workout_logs FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "food_subs_select" ON public.food_substitutions FOR SELECT USING (true);
CREATE POLICY "progress_photos_select" ON public.progress_photos FOR SELECT USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'coach'));
CREATE POLICY "progress_photos_insert" ON public.progress_photos FOR INSERT WITH CHECK (user_id = auth.uid());

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
