# Blog Application

A full-stack blog management application built with Next.js, TypeScript, and Tailwind CSS. This project provides a comprehensive platform for creating, managing, and viewing blog posts with user authentication, dashboard, and admin features.

## Features

### Core Functionality

- **User Authentication**: Secure authentication system using NextAuth.js with support for Google OAuth and email/password credentials
- **Protected Routes**: Comprehensive middleware-based route protection ensuring all pages require authentication except signin and auth APIs
- **Role-Based Access Control**: Different user roles and permissions system

### Dashboard Analytics

- **Interactive Dashboard**: Real-time analytics with user and post statistics
- **Data Visualization**: Charts showing posts distribution by user using Chart.js with responsive design
- **Quick Access Cards**: Clickable summary cards linking directly to posts and users management
- **Recent Activity**: Table displaying recent posts with user attribution

### Content Management

- **Blog Post Management**: View and manage blog posts with pagination support
- **Post Details**: Individual post viewing with full content display
- **Pagination**: Customizable pagination for large datasets (10, 20, 50 items per page)
- **Data Fetching**: Efficient API integration with custom hooks for data management

### User Management

- **User Directory**: Comprehensive user listing with detailed profile information
- **User Details Modal**: Click-to-view detailed user information including contact details, address, and company info
- **Table Interface**: Sortable and filterable table views for better data navigation

### User Experience

- **Responsive Design**: Fully responsive layout adapting to mobile, tablet, and desktop screens
- **Dark/Light Theme Support**: Built-in theme system with CSS variables
- **Animations**: Smooth page transitions and component animations using Framer Motion
- **Loading States**: Elegant loading spinners and error handling throughout the application
- **Error Simulation**: Built-in error testing functionality for development

### Technical Features

- **Modern UI Components**: Reusable component library with consistent design patterns
- **Custom Hooks**: React hooks for data fetching, authentication state management
- **Error Boundaries**: Comprehensive error handling and user feedback
- **Service Layer**: Modular service architecture for API interactions
- **Type Safety**: Full TypeScript implementation with custom type definitions

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15 (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Chart.js](https://www.chartjs.org/) with [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Deployment

This application is deployed on Vercel and can be accessed at: [https://blog-application-livid.vercel.app/](https://blog-application-livid.vercel.app/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or later)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/talukdermahmud/blog-application.git
   ```
2. Navigate to the project directory:
   ```bash
   cd blog-application
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Variables

This project uses `next-auth` for authentication, which requires environment variables for the OAuth providers.

1. Create a `.env.local` file in the root of the project.
2. Add the following variables for Google Authentication:

   ```
   GOOGLE_CLIENT_ID=<your_google_client_id>
   GOOGLE_CLIENT_SECRET=<your_google_client_secret>
   ```

   You can obtain these credentials by setting up an OAuth 2.0 client ID in the [Google API Console](https://console.developers.google.com/).

   For other OAuth providers or additional configurations, refer to the NextAuth.js documentation.

### Running the Application

- To run the development server:
  ```bash
  npm run dev
  ```
- Open [http://localhost:4005](http://localhost:4005) in your browser to see the application.

## Available Scripts

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs the ESLint linter to check for code quality issues.

## Project Structure

```
blog-application/
├── app/                          # Next.js App Router directory
│   ├── api/
│   │   └── auth/[...nextauth]/   # NextAuth.js API route
│   ├── favicon.ico               # Favicon file
│   ├── globals.css               # Global CSS styles
│   ├── layout.tsx                # Root layout component
│   ├── page.tsx                  # Home page (redirects to signin/dashboard)
│   ├── (auth)/                   # Route group for authentication pages
│   │   └── signin/
│   │       └── page.tsx          # Sign in page
│   └── (protected)/              # Route group for protected pages
│       ├── dashboard/
│       │   └── page.tsx          # Dashboard page
│       ├── posts/
│       │   ├── page.tsx          # Posts listing page
│       │   └── [id]/
│       │       └── page.tsx      # Individual post detail page
│       ├── profile/
│       │   └── page.tsx          # User profile page
│       └── users/
│           └── page.tsx          # Users management page
├── components/                   # Reusable React components
│   ├── Card.tsx                  # Post card component
│   ├── ConditionalLayout.tsx     # Layout wrapper component
│   ├── DashboardCard.tsx         # Dashboard metric card
│   ├── Error.tsx                 # Error display component
│   ├── LoadingSpinner.tsx        # Loading spinner component
│   ├── Modal.tsx                 # Modal dialog component
│   ├── Pagination.tsx            # Pagination controls
│   ├── Table.tsx                 # Data table component
│   └── LayoutWrapper/            # Layout components
│       ├── index.tsx             # Layout wrapper export
│       ├── Sidebar.tsx           # Sidebar navigation
│       └── Topbar.tsx            # Top navigation bar
├── hooks/                        # Custom React hooks
│   └── useFetch.tsx              # Data fetching hook
├── lib/                          # Utility libraries and providers
│   ├── AuthProvider.tsx          # Authentication provider
│   └── utils.ts                  # Utility functions
├── modules/                      # Feature modules (page containers)
│   ├── Dashboard/                # Dashboard module
│   │   └── index.tsx             # Dashboard component
│   ├── Posts/                    # Posts management module
│   │   ├── index.tsx             # Posts list component
│   │   └── Details.tsx           # Post detail component
│   ├── Profile/                  # Profile module
│   │   └── index.tsx             # Profile component
│   └── Users/                    # Users management module
│       └── index.tsx             # Users component
├── public/                       # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── services/                     # API service layer
│   └── dataServices.ts           # Data fetching services
├── types/                        # TypeScript type definitions
│   ├── next-auth.d.ts            # NextAuth type extensions
│   └── types.ts                  # Application type definitions
├── .gitignore                    # Git ignore rules
├── eslint.config.mjs             # ESLint configuration
├── middleware.ts                 # Next.js middleware (authentication)
├── next.config.ts                # Next.js configuration
├── package.json                  # NPM package configuration
├── package-lock.json             # NPM lock file
├── postcss.config.mjs            # PostCSS configuration
├── README.md                     # Project documentation
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

### Directory Explanations

- **`app/`**: Next.js 15 App Router directory containing all page routes, API routes, and layout files. Uses route groups `(auth)` and `(protected)` for logical organization.
- **`components/`**: Reusable UI components used throughout the application, including layout components, data display components, and interactive elements.
- **`hooks/`**: Custom React hooks abstracted for reusability, including data fetching logic and state management utilities.
- **`lib/`**: Core utilities, providers, and helper functions including authentication provider and utility functions.
- **`modules/`**: Feature-specific modules that combine components into complete page experiences, each containing their own logic and state management.
- **`public/`**: Static assets served directly from the public URL, including favicon and SVG icons.
- **`services/`**: API integration layer with centralized data fetching functions for external APIs.
