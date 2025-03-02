# Law Firm Web Application

A modern web application for law firms built with Nuxt.js and Supabase, featuring a secure authentication system, user profiles, and a protected dashboard.

## Features

- **Secure Authentication**
  - Email/Password login with email verification
  - Google OAuth integration
  - Secure session management

- **User Profile Management**
  - Custom user handles (usernames)
  - Profile completion workflow
  - Personal information storage

- **Protected Routes**
  - Middleware-based access control
  - Dashboard protection
  - Authenticated API access

- **Modern UI**
  - Responsive design
  - Dark/light mode support
  - Mobile-friendly interface

## Project Structure

```
├── components/           # Reusable Vue components
│   └── auth/             # Authentication-related components
├── middleware/           # Nuxt middleware
│   └── auth.ts           # Authentication middleware
├── pages/                # Application pages
│   ├── auth/             # Authentication pages
│   │   ├── login.vue
│   │   ├── register.vue
│   │   ├── confirm.vue
│   │   └── complete-registration.vue
│   └── dashboard.vue     # Protected dashboard
└── public/               # Static assets
```

## Authentication Flow

This application implements a secure authentication flow:

1. **Registration**: Users register with email/password or Google OAuth
2. **Email Verification**: Email/password users must verify their email
3. **Profile Completion**: All users complete their profile (first name, last name, user name)
4. **Dashboard Access**: Only authenticated users with complete profiles can access the dashboard

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lawfirmv2
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```
SUPABASE_URL=https://your-project-url.supabase.co
SUPABASE_KEY=your-supabase-anon-key
```

4. Set up the Supabase database:
   - Create a `profiles` table with the following columns:
     - `id` (uuid, primary key)
     - `first_name` (text)
     - `last_name` (text)
     - `email` (text)
     - `user_name` (text)
     - `created_at` (timestamp with timezone)
     - `updated_at` (timestamp with timezone)

5. Set up Row Level Security policies:
```sql
-- Enable row-level security on the table
alter table public.profiles enable row level security;

-- Create policy for inserts
create policy "Allow profile inserts for authenticated users"
  on public.profiles
  for insert
  with check (auth.uid() = id);

-- Create policy for selects
create policy "Allow selecting own profiles"
  on public.profiles
  for select
  using (auth.uid() = id);

-- Create policy for updates
create policy "Allow profile updates for authenticated users"
  on public.profiles
  for update
  using (auth.uid() = id);
```

6. Configure email verification in your Supabase project settings.

7. Configure Google OAuth provider in your Supabase Authentication settings.

### Development

Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

Build the application for production:
```bash
npm run build
# or
yarn build
```

## License

[MIT](LICENSE)
