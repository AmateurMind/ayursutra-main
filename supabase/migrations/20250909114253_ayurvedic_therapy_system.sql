-- Location: supabase/migrations/20250909114253_ayurvedic_therapy_system.sql
-- Schema Analysis: Fresh project with no existing schema
-- Integration Type: Complete new schema creation
-- Dependencies: No existing tables to reference

-- 1. Custom Types and Enums
CREATE TYPE public.user_role AS ENUM ('patient', 'practitioner', 'admin');
CREATE TYPE public.therapy_type AS ENUM ('abhyanga', 'shirodhara', 'virechana', 'nasya', 'basti', 'raktamokshana', 'consultation');
CREATE TYPE public.session_status AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled', 'no_show');
CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'preparation_required', 'ready', 'in_session', 'completed', 'cancelled');
CREATE TYPE public.preparation_status AS ENUM ('not_started', 'in_progress', 'completed', 'partially_completed');
CREATE TYPE public.notification_type AS ENUM ('appointment_reminder', 'preparation_reminder', 'session_complete', 'feedback_request', 'booking_confirmation');

-- 2. Core Tables (no foreign keys)

-- User profiles table (critical intermediary for PostgREST compatibility)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    date_of_birth DATE,
    gender TEXT,
    role public.user_role DEFAULT 'patient'::public.user_role,
    is_active BOOLEAN DEFAULT true,
    avatar_url TEXT,
    address JSONB,
    emergency_contact JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Practitioner profiles for detailed practitioner information
CREATE TABLE public.practitioners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    specialization TEXT[] DEFAULT ARRAY[]::TEXT[],
    experience_years INTEGER DEFAULT 0,
    qualifications TEXT[] DEFAULT ARRAY[]::TEXT[],
    consultation_fee DECIMAL(10,2) DEFAULT 0,
    bio TEXT,
    available_therapies public.therapy_type[] DEFAULT ARRAY[]::public.therapy_type[],
    availability JSONB DEFAULT '{"monday": {"start": "09:00", "end": "17:00"}, "tuesday": {"start": "09:00", "end": "17:00"}, "wednesday": {"start": "09:00", "end": "17:00"}, "thursday": {"start": "09:00", "end": "17:00"}, "friday": {"start": "09:00", "end": "17:00"}, "saturday": {"start": "09:00", "end": "13:00"}, "sunday": {"closed": true}}'::jsonb,
    rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Patient health profiles for Ayurvedic assessments
CREATE TABLE public.patient_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    prakriti JSONB DEFAULT '{"vata": 0, "pitta": 0, "kapha": 0}'::jsonb,
    vikriti JSONB DEFAULT '{"vata": 0, "pitta": 0, "kapha": 0}'::jsonb,
    medical_history TEXT[] DEFAULT ARRAY[]::TEXT[],
    current_medications TEXT[] DEFAULT ARRAY[]::TEXT[],
    allergies TEXT[] DEFAULT ARRAY[]::TEXT[],
    dietary_preferences TEXT[] DEFAULT ARRAY[]::TEXT[],
    lifestyle_factors JSONB DEFAULT '{}'::jsonb,
    chief_complaints TEXT[] DEFAULT ARRAY[]::TEXT[],
    treatment_goals TEXT[] DEFAULT ARRAY[]::TEXT[],
    previous_ayurvedic_treatments TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Therapy definitions and pricing
CREATE TABLE public.therapy_definitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    therapy_type public.therapy_type NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    preparation_instructions TEXT[] DEFAULT ARRAY[]::TEXT[],
    contraindications TEXT[] DEFAULT ARRAY[]::TEXT[],
    benefits TEXT[] DEFAULT ARRAY[]::TEXT[],
    equipment_needed TEXT[] DEFAULT ARRAY[]::TEXT[],
    oils_used TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Dependent Tables (with foreign keys)

-- Main appointments table
CREATE TABLE public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    practitioner_id UUID REFERENCES public.practitioners(id) ON DELETE CASCADE,
    therapy_definition_id UUID REFERENCES public.therapy_definitions(id) ON DELETE SET NULL,
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    duration_minutes INTEGER NOT NULL,
    status public.appointment_status DEFAULT 'pending'::public.appointment_status,
    total_amount DECIMAL(10,2) NOT NULL,
    notes TEXT,
    preparation_checklist JSONB DEFAULT '[]'::jsonb,
    preparation_status public.preparation_status DEFAULT 'not_started'::public.preparation_status,
    room_number TEXT,
    special_instructions TEXT,
    cancellation_reason TEXT,
    cancelled_at TIMESTAMPTZ,
    cancelled_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Session records for completed therapies
CREATE TABLE public.therapy_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    practitioner_id UUID REFERENCES public.practitioners(id) ON DELETE CASCADE,
    therapy_type public.therapy_type NOT NULL,
    session_status public.session_status DEFAULT 'scheduled'::public.session_status,
    actual_start_time TIMESTAMPTZ,
    actual_end_time TIMESTAMPTZ,
    oils_used TEXT[] DEFAULT ARRAY[]::TEXT[],
    techniques_applied TEXT[] DEFAULT ARRAY[]::TEXT[],
    patient_response TEXT,
    practitioner_observations TEXT,
    pulse_reading JSONB DEFAULT '{}'::jsonb,
    tongue_examination JSONB DEFAULT '{}'::jsonb,
    post_session_advice TEXT[] DEFAULT ARRAY[]::TEXT[],
    follow_up_recommended BOOLEAN DEFAULT false,
    follow_up_date DATE,
    complications TEXT,
    session_images TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Patient feedback and reviews
CREATE TABLE public.session_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.therapy_sessions(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    practitioner_id UUID REFERENCES public.practitioners(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    symptoms_before TEXT[] DEFAULT ARRAY[]::TEXT[],
    symptoms_after TEXT[] DEFAULT ARRAY[]::TEXT[],
    improvements TEXT[] DEFAULT ARRAY[]::TEXT[],
    side_effects TEXT[] DEFAULT ARRAY[]::TEXT[],
    overall_experience TEXT,
    would_recommend BOOLEAN DEFAULT true,
    pain_level_before INTEGER CHECK (pain_level_before >= 0 AND pain_level_before <= 10),
    pain_level_after INTEGER CHECK (pain_level_after >= 0 AND pain_level_after <= 10),
    energy_level_before INTEGER CHECK (energy_level_before >= 0 AND energy_level_before <= 10),
    energy_level_after INTEGER CHECK (energy_level_after >= 0 AND energy_level_after <= 10),
    sleep_quality_improvement BOOLEAN DEFAULT false,
    mood_improvement BOOLEAN DEFAULT false,
    practitioner_response TEXT,
    response_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Notifications system
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    notification_type public.notification_type NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    related_appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE,
    scheduled_for TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    read_at TIMESTAMPTZ,
    is_read BOOLEAN DEFAULT false,
    data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Treatment packages and programs
CREATE TABLE public.treatment_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    therapy_types public.therapy_type[] NOT NULL,
    total_sessions INTEGER NOT NULL,
    duration_days INTEGER NOT NULL,
    package_price DECIMAL(10,2) NOT NULL,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    benefits TEXT[] DEFAULT ARRAY[]::TEXT[],
    suitable_for TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- User progress tracking
CREATE TABLE public.treatment_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    package_id UUID REFERENCES public.treatment_packages(id) ON DELETE SET NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    total_sessions_planned INTEGER NOT NULL,
    sessions_completed INTEGER DEFAULT 0,
    current_phase TEXT DEFAULT 'preparation',
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    weight_start DECIMAL(5,2),
    weight_current DECIMAL(5,2),
    measurements JSONB DEFAULT '{}'::jsonb,
    milestones JSONB DEFAULT '[]'::jsonb,
    notes TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_practitioners_user_id ON public.practitioners(user_id);
CREATE INDEX idx_practitioners_specialization ON public.practitioners USING gin(specialization);
CREATE INDEX idx_patient_profiles_user_id ON public.patient_profiles(user_id);
CREATE INDEX idx_therapy_definitions_type ON public.therapy_definitions(therapy_type);
CREATE INDEX idx_appointments_patient_id ON public.appointments(patient_id);
CREATE INDEX idx_appointments_practitioner_id ON public.appointments(practitioner_id);
CREATE INDEX idx_appointments_date_status ON public.appointments(scheduled_date, status);
CREATE INDEX idx_therapy_sessions_appointment_id ON public.therapy_sessions(appointment_id);
CREATE INDEX idx_therapy_sessions_patient_id ON public.therapy_sessions(patient_id);
CREATE INDEX idx_session_feedback_session_id ON public.session_feedback(session_id);
CREATE INDEX idx_notifications_user_id_read ON public.notifications(user_id, is_read);
CREATE INDEX idx_treatment_progress_patient_id ON public.treatment_progress(patient_id);

-- 5. Functions (must be created before RLS policies)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'patient')::public.user_role
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

-- 6. Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practitioners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapy_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapy_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatment_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatment_progress ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies (following the 7-pattern system)

-- Pattern 1: Core user table - Simple ownership (NEVER use functions)
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 2: Simple user ownership for most tables
CREATE POLICY "users_manage_own_practitioners"
ON public.practitioners
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_patient_profiles"
ON public.patient_profiles
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "patients_manage_own_appointments"
ON public.appointments
FOR ALL
TO authenticated
USING (patient_id = auth.uid())
WITH CHECK (patient_id = auth.uid());

CREATE POLICY "users_manage_own_sessions"
ON public.therapy_sessions
FOR ALL
TO authenticated
USING (patient_id = auth.uid())
WITH CHECK (patient_id = auth.uid());

CREATE POLICY "users_manage_own_feedback"
ON public.session_feedback
FOR ALL
TO authenticated
USING (patient_id = auth.uid())
WITH CHECK (patient_id = auth.uid());

CREATE POLICY "users_manage_own_notifications"
ON public.notifications
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_progress"
ON public.treatment_progress
FOR ALL
TO authenticated
USING (patient_id = auth.uid())
WITH CHECK (patient_id = auth.uid());

-- Pattern 4: Public read, private write for reference data
CREATE POLICY "public_can_read_therapy_definitions"
ON public.therapy_definitions
FOR SELECT
TO public
USING (is_active = true);

CREATE POLICY "public_can_read_treatment_packages"
ON public.treatment_packages
FOR SELECT
TO public
USING (is_active = true);

-- Pattern 3: Operation-specific policies for practitioner access
CREATE POLICY "practitioners_can_view_appointments"
ON public.appointments
FOR SELECT
TO authenticated
USING (
  practitioner_id IN (
    SELECT id FROM public.practitioners WHERE user_id = auth.uid()
  )
);

CREATE POLICY "practitioners_can_update_appointments"
ON public.appointments
FOR UPDATE
TO authenticated
USING (
  practitioner_id IN (
    SELECT id FROM public.practitioners WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  practitioner_id IN (
    SELECT id FROM public.practitioners WHERE user_id = auth.uid()
  )
);

CREATE POLICY "practitioners_can_view_sessions"
ON public.therapy_sessions
FOR SELECT
TO authenticated
USING (
  practitioner_id IN (
    SELECT id FROM public.practitioners WHERE user_id = auth.uid()
  )
);

CREATE POLICY "practitioners_can_manage_sessions"
ON public.therapy_sessions
FOR ALL
TO authenticated
USING (
  practitioner_id IN (
    SELECT id FROM public.practitioners WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  practitioner_id IN (
    SELECT id FROM public.practitioners WHERE user_id = auth.uid()
  )
);

-- 8. Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_practitioners_updated_at
  BEFORE UPDATE ON public.practitioners
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 9. Mock Data for Testing
DO $$
DECLARE
    patient_auth_id UUID := gen_random_uuid();
    practitioner_auth_id UUID := gen_random_uuid();
    admin_auth_id UUID := gen_random_uuid();
    practitioner_profile_id UUID := gen_random_uuid();
    abhyanga_therapy_id UUID := gen_random_uuid();
    shirodhara_therapy_id UUID := gen_random_uuid();
    sample_appointment_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users with complete field structure
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (patient_auth_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'patient@ayursutra.com', crypt('patient123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Raj Pawar", "role": "patient"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (practitioner_auth_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'practitioner@ayursutra.com', crypt('practitioner123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Dr. Priya Sharma", "role": "practitioner"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (admin_auth_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@ayursutra.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create practitioner profile
    INSERT INTO public.practitioners (id, user_id, specialization, experience_years, qualifications, consultation_fee, bio, available_therapies, rating, total_reviews, is_verified)
    VALUES (
        practitioner_profile_id, 
        practitioner_auth_id, 
        ARRAY['Panchakarma Specialist', 'Neurological Ayurveda'], 
        8, 
        ARRAY['BAMS', 'MD Ayurveda', 'Certified Panchakarma Therapist'], 
        1500.00, 
        'Experienced Ayurvedic practitioner specializing in Panchakarma treatments and neurological disorders. Dedicated to holistic healing through traditional Ayurvedic methods.',
        ARRAY['abhyanga', 'shirodhara', 'virechana', 'consultation']::public.therapy_type[],
        4.8,
        156,
        true
    );

    -- Create patient profile
    INSERT INTO public.patient_profiles (user_id, prakriti, medical_history, chief_complaints, treatment_goals)
    VALUES (
        patient_auth_id,
        '{"vata": 60, "pitta": 25, "kapha": 15}'::jsonb,
        ARRAY['Chronic back pain', 'Stress and anxiety', 'Sleep disorders'],
        ARRAY['Lower back pain', 'Difficulty sleeping', 'Mental stress'],
        ARRAY['Reduce chronic pain', 'Improve sleep quality', 'Stress management']
    );

    -- Create therapy definitions
    INSERT INTO public.therapy_definitions (id, therapy_type, name, description, duration_minutes, base_price, preparation_instructions, benefits)
    VALUES
        (abhyanga_therapy_id, 'abhyanga'::public.therapy_type, 'Abhyanga - Full Body Oil Massage', 
         'Traditional Ayurvedic full-body warm oil massage that promotes deep relaxation and improves circulation', 
         90, 2500.00, 
         ARRAY['Fast for 2 hours before treatment', 'Wear comfortable, loose clothing', 'Avoid alcohol 24 hours prior'],
         ARRAY['Improves blood circulation', 'Reduces muscle tension', 'Promotes deep relaxation', 'Enhances skin health']),
        (shirodhara_therapy_id, 'shirodhara'::public.therapy_type, 'Shirodhara - Medicated Oil Therapy', 
         'Continuous pouring of warm medicated oil on the forehead to calm the nervous system and reduce stress', 
         60, 3000.00, 
         ARRAY['Empty stomach preferred', 'Avoid heavy meals 3 hours before', 'Come with clean hair'],
         ARRAY['Reduces stress and anxiety', 'Improves mental clarity', 'Promotes better sleep', 'Balances nervous system']);

    -- Create sample appointment
    INSERT INTO public.appointments (id, patient_id, practitioner_id, therapy_definition_id, scheduled_date, scheduled_time, duration_minutes, status, total_amount, room_number, preparation_status)
    VALUES (
        sample_appointment_id,
        patient_auth_id,
        practitioner_profile_id,
        abhyanga_therapy_id,
        CURRENT_DATE + INTERVAL '2 days',
        '10:00:00',
        90,
        'confirmed'::public.appointment_status,
        2500.00,
        'Room 3',
        'in_progress'::public.preparation_status
    );

    -- Create treatment package
    INSERT INTO public.treatment_packages (name, description, therapy_types, total_sessions, duration_days, package_price, benefits)
    VALUES (
        'Stress Relief Package',
        'Comprehensive 7-day program combining Abhyanga and Shirodhara therapies for deep stress relief and mental wellness',
        ARRAY['abhyanga', 'shirodhara']::public.therapy_type[],
        7,
        14,
        15000.00,
        ARRAY['Complete stress relief', 'Improved sleep quality', 'Enhanced mental clarity', 'Better emotional balance']
    );

    -- Create sample notification
    INSERT INTO public.notifications (user_id, notification_type, title, message, related_appointment_id, scheduled_for)
    VALUES (
        patient_auth_id,
        'appointment_reminder'::public.notification_type,
        'Upcoming Abhyanga Session',
        'Your Abhyanga therapy session is scheduled for tomorrow at 10:00 AM. Please follow the preparation guidelines.',
        sample_appointment_id,
        CURRENT_TIMESTAMP + INTERVAL '1 day'
    );

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;