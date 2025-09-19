# Next.js Dashboard Application

A full-stack dashboard application built with Next.js, TypeScript, and Tailwind CSS. This project features a complete authentication system, a responsive dashboard layout, and several example modules for managing data like posts and users.

## Features

- **Authentication**: Robust authentication with `next-auth`, supporting both email/password credentials and Google OAuth.
- **Protected Routes**: Secure dashboard and profile pages that require user authentication.
- **Component-Based UI**: A rich set of reusable components for consistency and rapid development.
- **Data Fetching**: A dedicated service layer for fetching data from external APIs.
- **Styling**: A modern UI styled with Tailwind CSS.
- **Animations**: Smooth page transitions and animations with Framer Motion.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15 (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Fetching**: [Axios](https://axios-http.com/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or later)
- [npm](https://www.npmjs.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd test-project
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Environment Variables

This project uses `next-auth` for authentication, which requires environment variables for the OAuth providers.

1.  Create a `.env.local` file in the root of the project.
2.  Add the following variables for Google Authentication:

    ```
    GOOGLE_CLIENT_ID=<your_google_client_id>
    GOOGLE_CLIENT_SECRET=<your_google_client_secret>
    ```

    You can obtain these credentials by setting up an OAuth 2.0 client ID in the [Google API Console](https://console.developers.google.com/).

### Running the Application

-   To run the development server:
    ```bash
    npm run dev
    ```
-   Open [http://localhost:4005](http://localhost:4005) in your browser to see the application.

## Available Scripts

-   `npm run dev`: Starts the development server with Turbopack.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Runs the ESLint linter to check for code quality issues.

## Project Structure

-   `app/`: Contains all routes, including authentication, protected pages, and API endpoints.
-   `components/`: Houses reusable React components.
-e   `modules/`: Contains higher-order components that compose the main features and pages.
-   `services/`: Includes data fetching logic and API service configurations.
-   `lib/`: Provides shared utilities and providers.
-   `types/`: Defines custom TypeScript types.