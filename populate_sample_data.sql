-- Sample Data Population Script for AyurSutra
-- Run this in your Supabase SQL Editor to populate the database with sample data

-- Insert sample therapy definitions
INSERT INTO public.therapy_definitions (therapy_type, name, description, duration_minutes, base_price, preparation_instructions, contraindications, benefits, equipment_needed, oils_used) VALUES
('abhyanga', 'Abhyanga (अभ्यंग)', 'Traditional full-body oil massage using warm medicated oils selected according to your Prakriti (constitution) and current Vikriti (imbalance). This therapy improves circulation, nourishes tissues, and promotes deep relaxation while balancing Vata dosha.', 60, 2500, ARRAY['Light meal 2 hours before', 'Comfortable clothing', 'Avoid cold drinks'], ARRAY['Fever', 'Indigestion', 'Skin infections'], ARRAY['Improved circulation', 'Muscle relaxation', 'Skin nourishment', 'Stress relief'], ARRAY['Massage table', 'Medicated oils', 'Steam facility', 'Towels'], ARRAY['Sesame oil', 'Coconut oil', 'Herbal oils']),

('shirodhara', 'Shirodhara (शिरोधारा)', 'Continuous pouring of warm medicated oil or other liquids over the forehead in a steady stream. This deeply relaxing therapy calms the nervous system, reduces stress, and promotes mental clarity by balancing Vata and Pitta doshas.', 45, 3500, ARRAY['Empty stomach preferred', 'Avoid heavy meals', 'Wear old clothes'], ARRAY['Head injuries', 'Severe cold', 'Third trimester pregnancy'], ARRAY['Mental relaxation', 'Improved sleep', 'Stress reduction', 'Hair nourishment'], ARRAY['Shirodhara table', 'Oil warming system', 'Specialized vessel', 'Towels'], ARRAY['Sesame oil', 'Brahmi oil', 'Bhringraj oil']),

('virechana', 'Virechana (विरेचन)', 'Controlled therapeutic purgation using herbal medicines to eliminate excess Pitta dosha and accumulated toxins from the body. This procedure is particularly effective for digestive disorders, skin conditions, and metabolic imbalances.', 300, 8500, ARRAY['7 days Purva Karma', 'Oleation therapy', 'Dietary preparation', 'Medical supervision'], ARRAY['Pregnancy', 'Severe weakness', 'Chronic diarrhea', 'Heart conditions'], ARRAY['Pitta dosha balance', 'Digestive improvement', 'Skin purification', 'Metabolic reset'], ARRAY['Monitoring equipment', 'Herbal medicines', 'Comfort facilities', 'Emergency support'], ARRAY['Castor oil', 'Triphala', 'Herbal decoctions']),

('nasya', 'Nasya (नस्य)', 'Administration of medicated oils, powders, or decoctions through the nasal passages. This therapy is highly effective for conditions related to head, neck, and respiratory system, particularly for Kapha-related disorders.', 30, 1800, ARRAY['Avoid cold foods', 'Light head massage', 'Comfortable position'], ARRAY['Nasal injuries', 'Severe cold', 'Pregnancy (certain types)'], ARRAY['Sinus clearance', 'Headache relief', 'Mental clarity', 'Respiratory health'], ARRAY['Nasal administration tools', 'Medicated preparations', 'Comfort support'], ARRAY['Anu oil', 'Shadbindu oil', 'Herbal powders']),

('basti', 'Basti (बस्ति)', 'Administration of medicated decoctions or oils through the rectum for therapeutic purposes. Considered the most important therapy in Ayurveda, Basti is highly effective for Vata disorders and overall rejuvenation.', 45, 4200, ARRAY['Proper diet', 'Oleation therapy', 'Mental preparation', 'Medical consultation'], ARRAY['Rectal disorders', 'Severe diarrhea', 'Pregnancy', 'Acute fever'], ARRAY['Vata dosha balance', 'Digestive health', 'Joint mobility', 'Nervous system support'], ARRAY['Basti equipment', 'Medicated preparations', 'Monitoring tools', 'Comfort facilities'], ARRAY['Sesame oil', 'Herbal decoctions', 'Medicated oils']),

('raktamokshana', 'Raktamokshana (रक्तमोक्षण)', 'Therapeutic bloodletting procedure to remove impure blood and balance Pitta dosha. This ancient technique helps in treating various skin disorders, inflammatory conditions, and blood-related ailments.', 60, 5500, ARRAY['Pre-procedure assessment', 'Proper hydration', 'Light meal before', 'Medical clearance'], ARRAY['Anemia', 'Blood disorders', 'Pregnancy', 'Severe weakness'], ARRAY['Blood purification', 'Skin health', 'Inflammation reduction', 'Pitta balance'], ARRAY['Sterile equipment', 'Monitoring devices', 'Emergency kit', 'Comfort facilities'], ARRAY['Antiseptic oils', 'Healing oils', 'Herbal preparations']),

('consultation', 'Ayurvedic Consultation', 'Comprehensive Ayurvedic consultation including Prakriti and Vikriti assessment, pulse diagnosis, lifestyle analysis, and personalized treatment recommendations based on traditional Ayurvedic principles.', 60, 800, ARRAY['Bring medical history', 'List current medications', 'Comfortable clothing', 'Arrive early'], ARRAY['None'], ARRAY['Personalized assessment', 'Treatment planning', 'Lifestyle guidance', 'Health optimization'], ARRAY['Consultation room', 'Assessment tools', 'Documentation'], ARRAY['None'])

ON CONFLICT (therapy_type) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  duration_minutes = EXCLUDED.duration_minutes,
  base_price = EXCLUDED.base_price,
  preparation_instructions = EXCLUDED.preparation_instructions,
  contraindications = EXCLUDED.contraindications,
  benefits = EXCLUDED.benefits,
  equipment_needed = EXCLUDED.equipment_needed,
  oils_used = EXCLUDED.oils_used,
  updated_at = CURRENT_TIMESTAMP;

-- Insert sample user profiles for practitioners
INSERT INTO public.user_profiles (id, email, full_name, phone, role, avatar_url) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'dr.sharma@ayursutra.com', 'Dr. Rajesh Sharma', '+91-9876543210', 'practitioner', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
('550e8400-e29b-41d4-a716-446655440002', 'dr.patel@ayursutra.com', 'Dr. Priya Patel', '+91-9876543211', 'practitioner', 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg'),
('550e8400-e29b-41d4-a716-446655440003', 'dr.gupta@ayursutra.com', 'Dr. Amit Gupta', '+91-9876543212', 'practitioner', 'https://thumbs.dreamstime.com/b/mature-indian-doctor-portrait-male-medical-uniform-standing-plain-background-shadow-61211616.jpg'),
('550e8400-e29b-41d4-a716-446655440004', 'dr.singh@ayursutra.com', 'Dr. Kavita Singh', '+91-9876543213', 'practitioner', 'https://png.pngtree.com/png-clipart/20250116/original/pngtree-smiling-indian-female-doctor-wearing-black-scrubs-and-a-stethoscope-radiating-png-image_20081343.png')

ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = EXCLUDED.phone,
  avatar_url = EXCLUDED.avatar_url,
  updated_at = CURRENT_TIMESTAMP;

-- Insert sample practitioners
INSERT INTO public.practitioners (user_id, specialization, experience_years, qualifications, consultation_fee, bio, available_therapies, rating, total_reviews, is_verified) VALUES
('550e8400-e29b-41d4-a716-446655440001', ARRAY['Panchakarma', 'Digestive Disorders', 'Stress Management'], 15, ARRAY['BAMS', 'MD (Panchakarma)', 'Ayurveda Acharya'], 800, 'Dr. Rajesh Sharma is a renowned Ayurvedic practitioner with over 15 years of experience in traditional healing methods. Specializing in Panchakarma therapies and digestive health, he has successfully treated thousands of patients using authentic Ayurvedic principles combined with modern diagnostic techniques.', ARRAY['abhyanga', 'shirodhara', 'virechana', 'basti', 'consultation']::therapy_type[], 4.8, 247, true),

('550e8400-e29b-41d4-a716-446655440002', ARRAY['Women''s Health', 'Skin Disorders', 'Respiratory Issues'], 12, ARRAY['BAMS', 'MS (Ayurveda)', 'Women''s Health Specialist'], 750, 'Dr. Priya Patel specializes in women''s health and dermatological conditions using traditional Ayurvedic methods. Her expertise in Stree Roga (women''s diseases) and Twak Roga (skin diseases) has helped numerous patients achieve natural healing and wellness.', ARRAY['abhyanga', 'shirodhara', 'nasya', 'consultation']::therapy_type[], 4.9, 189, true),

('550e8400-e29b-41d4-a716-446655440003', ARRAY['Panchakarma', 'Neurological Disorders', 'Joint Pain'], 18, ARRAY['BAMS', 'PhD (Ayurveda)', 'Panchakarma Expert'], 900, 'Dr. Amit Gupta is a distinguished Panchakarma specialist with extensive research background in neurological applications of Ayurveda. His innovative approach combines traditional Panchakarma with modern understanding of neurological conditions for optimal patient outcomes.', ARRAY['abhyanga', 'shirodhara', 'virechana', 'basti', 'raktamokshana', 'consultation']::therapy_type[], 4.7, 312, true),

('550e8400-e29b-41d4-a716-446655440004', ARRAY['Herbal Medicine', 'Metabolic Disorders', 'Immunity Building'], 10, ARRAY['BAMS', 'MD (Dravyaguna)', 'Herbal Medicine Expert'], 700, 'Dr. Kavita Singh specializes in Dravyaguna (herbal medicine) and metabolic health management through Ayurvedic principles. Her expertise in medicinal plants and their therapeutic applications helps patients achieve sustainable health improvements.', ARRAY['abhyanga', 'nasya', 'consultation']::therapy_type[], 4.6, 156, true)

ON CONFLICT (user_id) DO UPDATE SET
  specialization = EXCLUDED.specialization,
  experience_years = EXCLUDED.experience_years,
  qualifications = EXCLUDED.qualifications,
  consultation_fee = EXCLUDED.consultation_fee,
  bio = EXCLUDED.bio,
  available_therapies = EXCLUDED.available_therapies,
  rating = EXCLUDED.rating,
  total_reviews = EXCLUDED.total_reviews,
  is_verified = EXCLUDED.is_verified,
  updated_at = CURRENT_TIMESTAMP;

-- Verify the data was inserted
SELECT 'Therapy Definitions Inserted:' as info, COUNT(*) as count FROM public.therapy_definitions;
SELECT 'User Profiles Inserted:' as info, COUNT(*) as count FROM public.user_profiles WHERE role = 'practitioner';
SELECT 'Practitioners Inserted:' as info, COUNT(*) as count FROM public.practitioners WHERE is_verified = true;
