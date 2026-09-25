# Cibilize Backend Setup Guide

## Overview

This guide will help you set up the modernized Cibilize backend with PostgreSQL, Google OAuth, and enhanced security features.

## Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Neon PostgreSQL account
- Google Cloud Console account (for OAuth)
- OpenAI API account

## 1. Database Setup (Neon PostgreSQL)

### Create Neon Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project
3. Create a database named `cibilize`
4. Copy the connection string from the dashboard

### Database Features

- ✅ UUID primary keys with auto-generation
- ✅ Enhanced user table with Google OAuth support
- ✅ Automatic timestamps with triggers
- ✅ Optimized indexes for performance
- ✅ Session management table
- ✅ Data integrity constraints

## 2. Google OAuth Setup

### Create Google OAuth Application

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:8000/api/auth/google/callback` (development)
   - `https://yourdomain.com/api/auth/google/callback` (production)
7. Copy Client ID and Client Secret

## 3. Environment Configuration

### Create .env file

```bash
cp env.template .env
```

### Fill in the required values:

#### Database Configuration

```env
DATABASE_URL=postgresql://username:password@hostname:port/database?sslmode=require
```

#### JWT Secrets (Generate secure random strings)

```bash
# Generate JWT secrets
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

```env
JWT_SECRET=your-generated-secret
JWT_REFRESH_SECRET=your-generated-refresh-secret
SESSION_SECRET=your-generated-session-secret
```

#### Google OAuth

```env
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback
```

#### OpenAI API

```env
OPENAI_API_KEY=your-openai-api-key
```

## 4. Installation

### Install Dependencies

```bash
pnpm install
```

### Start Development Server

```bash
pnpm run dev
```

### Start Production Server

```bash
pnpm start
```

## 5. API Endpoints

### Authentication Endpoints

- `POST /api/auth/register` - Register with email/password
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user profile

### Expense Endpoints

- `GET /api/expenses` - Get user expenses (with pagination & filters)
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/stats` - Get expense statistics
- `POST /api/expenses/upload` - Upload PDF bank statement

### Other Endpoints

- `GET /health` - Health check
- `POST /api/openai/predict` - Credit score prediction

## 6. Security Features

### Enhanced Security

- ✅ Helmet.js for security headers
- ✅ Rate limiting (15 min windows)
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ Password strength validation
- ✅ Brute force protection
- ✅ SQL injection prevention
- ✅ XSS protection

### Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%\*?&)
- No common passwords
- No more than 2 consecutive identical characters

### Rate Limits

- General API: 100 requests per 15 minutes
- Authentication: 5 attempts per 15 minutes
- File uploads: 10 uploads per hour

## 7. Database Schema

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  google_id VARCHAR(255) UNIQUE,
  profile_picture TEXT,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  auth_provider VARCHAR(20) DEFAULT 'local',
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true
);
```

### Expenses Table

```sql
CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 8. Development vs Production

### Development

- Detailed error messages
- CORS allows localhost origins
- Session cookies not secure
- Detailed logging

### Production

- Generic error messages
- Strict CORS policy
- Secure session cookies
- Minimal logging
- Trust proxy enabled

## 9. Migration from MySQL

The new system automatically handles:

- ✅ UUID generation instead of auto-increment IDs
- ✅ PostgreSQL-specific syntax
- ✅ Enhanced data types and constraints
- ✅ Automatic timestamp management
- ✅ Improved indexing strategy

## 10. Testing

### Health Check

```bash
curl http://localhost:8000/health
```

### Test Registration

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass123!","username":"testuser"}'
```

### Test Google OAuth

Navigate to: `http://localhost:8000/api/auth/google`

## 11. Troubleshooting

### Common Issues

1. **Database Connection Failed**: Check DATABASE_URL format and network access
2. **Google OAuth Error**: Verify redirect URIs match exactly
3. **JWT Errors**: Ensure secrets are properly set and not expired
4. **Rate Limit Errors**: Wait for rate limit window to reset
5. **File Upload Errors**: Check file size (max 10MB) and type (PDF only)

### Logs

Check server logs for detailed error information in development mode.

## 12. Next Steps

After setup:

1. Update frontend to use new API endpoints
2. Test all authentication flows
3. Verify expense CRUD operations
4. Test file upload functionality
5. Configure production environment
6. Set up monitoring and logging
7. Implement backup strategy

## Support

For issues or questions, check the server logs and ensure all environment variables are correctly configured.
