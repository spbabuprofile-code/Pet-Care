/*
  # V-Care Pet Polyclinic Database Schema

  ## Overview
  Complete database schema for V-Care Pet Polyclinic platform including:
  - User authentication and management
  - Pet profiles and medical records
  - Clinic and doctor management
  - Appointment booking system
  - E-commerce (products and orders)
  - Reviews and ratings
  - Wellness plans

  ## New Tables
  
  ### 1. Users (extends auth.users)
  - `user_profiles` - Extended user information
    - id (uuid, references auth.users)
    - full_name (text)
    - phone (text)
    - created_at (timestamp)
    - updated_at (timestamp)

  ### 2. Pets
  - `pets` - Pet profiles
    - id (uuid, primary key)
    - user_id (uuid, references user_profiles)
    - name (text)
    - type (text: dog/cat/puppy/kitten)
    - breed (text)
    - gender (text)
    - date_of_birth (date)
    - photo_url (text)
    - medical_history (text)
    - allergies (text)
    - weight (decimal)
    - created_at (timestamp)
    - updated_at (timestamp)

  ### 3. Clinics
  - `clinics` - Clinic locations
    - id (uuid, primary key)
    - name (text)
    - city (text)
    - address (text)
    - pincode (text)
    - latitude (decimal)
    - longitude (decimal)
    - phone (text)
    - email (text)
    - operating_hours (jsonb)
    - services_available (text[])
    - is_24x7 (boolean)
    - amenities (text[])
    - images (text[])
    - created_at (timestamp)

  ### 4. Doctors
  - `doctors` - Veterinarian profiles
    - id (uuid, primary key)
    - clinic_id (uuid, references clinics)
    - name (text)
    - specialization (text)
    - qualification (text)
    - experience_years (integer)
    - photo_url (text)
    - bio (text)
    - available_days (text[])
    - consultation_fee (decimal)
    - created_at (timestamp)

  ### 5. Appointments
  - `appointments` - Booking system
    - id (uuid, primary key)
    - user_id (uuid, references user_profiles)
    - pet_id (uuid, references pets)
    - clinic_id (uuid, references clinics)
    - doctor_id (uuid, references doctors)
    - service_type (text)
    - appointment_date (date)
    - appointment_time (time)
    - status (text: pending/confirmed/completed/cancelled)
    - notes (text)
    - total_amount (decimal)
    - created_at (timestamp)
    - updated_at (timestamp)

  ### 6. Products
  - `products` - Pet food and supplies
    - id (uuid, primary key)
    - name (text)
    - brand (text)
    - category (text)
    - description (text)
    - price (decimal)
    - stock_quantity (integer)
    - images (text[])
    - pet_type (text)
    - life_stage (text)
    - weight_options (jsonb)
    - ingredients (text)
    - nutritional_info (jsonb)
    - is_featured (boolean)
    - created_at (timestamp)

  ### 7. Orders
  - `orders` - Customer orders
    - id (uuid, primary key)
    - user_id (uuid, references user_profiles)
    - total_amount (decimal)
    - delivery_address (jsonb)
    - delivery_slot (text)
    - payment_status (text)
    - payment_method (text)
    - order_status (text: pending/processing/shipped/delivered/cancelled)
    - created_at (timestamp)
    - updated_at (timestamp)

  ### 8. Order Items
  - `order_items` - Order line items
    - id (uuid, primary key)
    - order_id (uuid, references orders)
    - product_id (uuid, references products)
    - quantity (integer)
    - price (decimal)
    - subtotal (decimal)

  ### 9. Reviews
  - `reviews` - Ratings and reviews
    - id (uuid, primary key)
    - user_id (uuid, references user_profiles)
    - entity_type (text: clinic/doctor/product)
    - entity_id (uuid)
    - rating (integer 1-5)
    - review_text (text)
    - photos (text[])
    - is_verified (boolean)
    - helpful_count (integer)
    - created_at (timestamp)

  ### 10. Medical Records
  - `medical_records` - Pet health records
    - id (uuid, primary key)
    - pet_id (uuid, references pets)
    - appointment_id (uuid, references appointments)
    - record_type (text: vaccination/prescription/lab_report/diagnosis)
    - title (text)
    - description (text)
    - document_url (text)
    - record_date (date)
    - created_at (timestamp)

  ### 11. Wellness Plans
  - `wellness_plans` - Membership plans
    - id (uuid, primary key)
    - user_id (uuid, references user_profiles)
    - pet_id (uuid, references pets)
    - plan_type (text: basic/standard/premium)
    - start_date (date)
    - end_date (date)
    - status (text: active/expired/cancelled)
    - benefits_used (jsonb)
    - created_at (timestamp)

  ### 12. Blog Posts
  - `blog_posts` - Content management
    - id (uuid, primary key)
    - title (text)
    - slug (text, unique)
    - excerpt (text)
    - content (text)
    - featured_image (text)
    - category (text)
    - tags (text[])
    - author (text)
    - reading_time (integer)
    - is_published (boolean)
    - published_at (timestamp)
    - created_at (timestamp)

  ### 13. Addresses
  - `addresses` - User delivery addresses
    - id (uuid, primary key)
    - user_id (uuid, references user_profiles)
    - label (text)
    - full_address (text)
    - city (text)
    - state (text)
    - pincode (text)
    - phone (text)
    - is_default (boolean)
    - created_at (timestamp)

  ## Security
  - Enable RLS on all tables
  - Policies for authenticated users to manage their own data
  - Public read access for clinics, doctors, products, and blog posts
  - Restricted write access for appointments, orders, and reviews
*/

-- User Profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Pets
CREATE TABLE IF NOT EXISTS pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('dog', 'cat', 'puppy', 'kitten')),
  breed text,
  gender text CHECK (gender IN ('male', 'female')),
  date_of_birth date,
  photo_url text,
  medical_history text DEFAULT '',
  allergies text DEFAULT '',
  weight decimal(5,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pets"
  ON pets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pets"
  ON pets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pets"
  ON pets FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own pets"
  ON pets FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Clinics (public read)
CREATE TABLE IF NOT EXISTS clinics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text NOT NULL,
  address text NOT NULL,
  pincode text NOT NULL,
  latitude decimal(10,8),
  longitude decimal(11,8),
  phone text NOT NULL,
  email text,
  operating_hours jsonb DEFAULT '{}',
  services_available text[] DEFAULT '{}',
  is_24x7 boolean DEFAULT false,
  amenities text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view clinics"
  ON clinics FOR SELECT
  TO public
  USING (true);

-- Doctors (public read)
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id uuid REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  specialization text NOT NULL,
  qualification text NOT NULL,
  experience_years integer DEFAULT 0,
  photo_url text,
  bio text DEFAULT '',
  available_days text[] DEFAULT '{}',
  consultation_fee decimal(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view doctors"
  ON doctors FOR SELECT
  TO public
  USING (true);

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  pet_id uuid REFERENCES pets(id) ON DELETE CASCADE NOT NULL,
  clinic_id uuid REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  doctor_id uuid REFERENCES doctors(id) ON DELETE SET NULL,
  service_type text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes text DEFAULT '',
  total_amount decimal(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Products (public read)
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  category text NOT NULL,
  description text DEFAULT '',
  price decimal(10,2) NOT NULL,
  stock_quantity integer DEFAULT 0,
  images text[] DEFAULT '{}',
  pet_type text CHECK (pet_type IN ('dog', 'cat', 'both')),
  life_stage text CHECK (life_stage IN ('puppy', 'adult', 'senior', 'all')),
  weight_options jsonb DEFAULT '[]',
  ingredients text DEFAULT '',
  nutritional_info jsonb DEFAULT '{}',
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  delivery_address jsonb NOT NULL,
  delivery_slot text,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method text,
  order_status text DEFAULT 'pending' CHECK (order_status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  price decimal(10,2) NOT NULL,
  subtotal decimal(10,2) NOT NULL
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Reviews (public read, authenticated write)
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  entity_type text NOT NULL CHECK (entity_type IN ('clinic', 'doctor', 'product')),
  entity_id uuid NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text DEFAULT '',
  photos text[] DEFAULT '{}',
  is_verified boolean DEFAULT false,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Medical Records
CREATE TABLE IF NOT EXISTS medical_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id uuid REFERENCES pets(id) ON DELETE CASCADE NOT NULL,
  appointment_id uuid REFERENCES appointments(id) ON DELETE SET NULL,
  record_type text NOT NULL CHECK (record_type IN ('vaccination', 'prescription', 'lab_report', 'diagnosis', 'surgery')),
  title text NOT NULL,
  description text DEFAULT '',
  document_url text,
  record_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own pet medical records"
  ON medical_records FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM pets
      WHERE pets.id = medical_records.pet_id
      AND pets.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create pet medical records"
  ON medical_records FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM pets
      WHERE pets.id = medical_records.pet_id
      AND pets.user_id = auth.uid()
    )
  );

-- Wellness Plans
CREATE TABLE IF NOT EXISTS wellness_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  pet_id uuid REFERENCES pets(id) ON DELETE CASCADE NOT NULL,
  plan_type text NOT NULL CHECK (plan_type IN ('basic', 'standard', 'premium')),
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  benefits_used jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE wellness_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own wellness plans"
  ON wellness_plans FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create wellness plans"
  ON wellness_plans FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Blog Posts (public read)
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  featured_image text,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  author text NOT NULL,
  reading_time integer DEFAULT 5,
  is_published boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (is_published = true);

-- Addresses
CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  label text NOT NULL,
  full_address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  phone text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own addresses"
  ON addresses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses"
  ON addresses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
  ON addresses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
  ON addresses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_pets_user_id ON pets(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_doctors_clinic_id ON doctors(clinic_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_entity ON reviews(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_pet_id ON medical_records(pet_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_pet_type ON products(pet_type);