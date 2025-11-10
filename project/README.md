# ReviewBoost Web Application

A comprehensive platform for freelancers to earn verified, paid reviews on freelancing platforms through a rigorous AI-powered vetting and matching process.

## Features

### For Freelancers
- **Profile Creation & Vetting**: Complete skill assessments and credential verification
- **Dashboard**: Track vetting status and review request progress
- **Review Requests**: Submit paid requests for verified reviews on multiple platforms
- **Resource Recommendations**: Receive personalized improvement resources if vetting isn't passed
- **Real-time Chat Support**: Access instant help via floating chat overlay

### For Admins
- **Vetting Management**: Review and approve/reject freelancer profiles
- **Request Processing**: Manage review requests and issue reviews
- **Analytics Dashboard**: Monitor platform metrics and user activity
- **Feedback System**: Provide detailed notes to freelancers

### Platform Features
- Secure authentication with email/password
- Responsive design for mobile and desktop
- Real-time status updates
- Contact form for inquiries
- Comprehensive About Us page explaining mission and values

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React

## Database Schema

### Tables
1. **profiles** - User profiles (freelancers and admins)
2. **freelancer_profiles** - Extended freelancer information
3. **review_requests** - Review request submissions with payment tracking
4. **contact_submissions** - Contact form submissions
5. **chat_messages** - Chat overlay messages
6. **resources** - Educational resources for skill improvement

All tables include Row Level Security (RLS) policies for data protection.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Environment Setup

1. Create a `.env` file in the root directory:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Database Setup

The database schema is already created and includes:
- User profiles with role-based access
- Freelancer skill tracking and status management
- Review request workflow with payment integration
- Contact and chat message storage
- Resource management for learning materials

### User Types
- **Freelancer**: Can create profile, request reviews, track progress
- **Admin**: Can vet profiles, manage requests, provide feedback

## User Flows

### Freelancer Journey
1. Sign up → Create profile with skills and credentials
2. Profile submitted for vetting (AI + admin review)
3. Receive approval/rejection notification
4. If approved: Submit review requests with payment
5. Track review issuance on dashboard
6. If rejected: Access personalized improvement resources

### Admin Workflow
1. Review pending freelancer profiles
2. Assess credentials and skills
3. Approve/reject with detailed notes
4. Process review requests
5. Issue reviews on target platforms
6. Mark requests as completed

## Key Pages

- **Home**: Hero section, value proposition, testimonials, how it works
- **For Freelancers**: Detailed explanation of process and benefits
- **Dashboard**: Personalized freelancer or admin dashboard
- **Profile Setup**: Complete freelancer profile form
- **Review Request**: Submit and pay for review requests
- **Admin Dashboard**: Manage profiles and requests
- **About Us**: Mission, values, and commitment
- **Contact**: Form and contact information
- **Login/Signup**: Authentication pages

## Design System

### Colors
- Primary: Teal (#14B8A6)
- Secondary: Emerald (#10B981)
- Accent: Cyan
- Neutrals: Gray scale

### Typography
- Headings: Bold sans-serif
- Body: Clean sans-serif for readability
- Responsive font scaling

### Components
All components follow consistent design patterns with hover states, transitions, and accessibility features.

## Security

- Row Level Security (RLS) enabled on all tables
- Authentication required for sensitive operations
- Payment status tracking
- Admin-only access to management features
- Secure credential storage

## Support

- **Live Chat**: Floating chat icon (bottom right)
- **Email**: support@reviewboost.com
- **Contact Form**: Available on Contact page
- **Response Time**: 24-48 hours

## License

Copyright © 2025 ReviewBoost. All rights reserved.
