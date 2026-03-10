-- Insert a coach
INSERT INTO auth.users (id, email, raw_user_meta_data)
VALUES ('00000000-0000-0000-0000-000000000001', 'tomer@tftracker.com', '{"full_name": "תומר פרידמן"}');

UPDATE public.profiles SET role = 'coach' WHERE id = '00000000-0000-0000-0000-000000000001';

-- Insert a client
INSERT INTO auth.users (id, email, raw_user_meta_data)
VALUES ('00000000-0000-0000-0000-000000000002', 'client@example.com', '{"full_name": "ישראל ישראלי"}');

UPDATE public.profiles 
SET role = 'premium', goal = 'lose_weight', daily_calories_target = 1800
WHERE id = '00000000-0000-0000-0000-000000000002';

INSERT INTO public.subscriptions (user_id, tier, status)
VALUES ('00000000-0000-0000-0000-000000000002', 'premium', 'active');
