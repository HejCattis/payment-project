# Payment Project

This repository contains the frontend and backend implementation of a scalable payment solution with flexible payment gateway integration, designed to address the growing need for secure and efficient payment systems in e-commerce. The solution integrates multiple payment gateways, including Stripe, to provide a versatile and adaptable payment process.

**Note:** This is a school project and does not have an official license. 

## Table of Contents

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Scripts](#scripts)
6. [Dependencies](#dependencies)
7. [Development](#development)
8. [Contributing](#contributing)
9. [License](#license)

## Introduction

This project demonstrates the integration of a payment gateway in an e-commerce application. The frontend is built with React and TypeScript, leveraging Stripe for payment processing. The backend is implemented using Node.js, TypeScript, and Express, with Prisma ORM for database management.

## Project Structure

The project is divided into two main parts:

- **Frontend (`payment-project-frontend`):** Contains the React application for handling user interactions and payment processing.
- **Backend (`payment-project-backend`):** Contains the Express server for handling API requests and payment gateway integrations.

## Installation

### Prerequisites

- Yarn (version 1.22 or higher)

### Clone the Repository

```bash
git clone https://github.com/HejCattis/payment-project.git
cd payment-project
```

### Install Frontend Dependencies

```bash
cd payment-project-frontend
yarn install
```

### Install Backend Dependencies

```bash
cd payment-project-backend
yarn install
```

## Usage

### Start Frontend

```bash
cd payment-project-frontend
yarn dev
```

### Start Backend

```bash
cd payment-project-backend
yarn dev
```

### Generate Clients

Before starting the backend, generate clients to the `lib` directory:

```bash
cd payment-project-backend
yarn generate-client
```

## Scripts

### Frontend

- `dev`: Start the development server using Vite.
- `build`: Build the project for production.
- `lint`: Run ESLint to check for linting errors.
- `preview`: Preview the production build.

### Backend

- `dev`: Start the development server using nodemon.
- `build`: Generate TSOA routes and build the project using TypeScript.
- `start_js`: Start the built project.
- `spec`: Generate OpenAPI specification using TSOA.
- `routes`: Generate routes using TSOA.
- `generate-client`: Generate the client from the OpenAPI specification.
- `copy-client-tmp`: Copy the generated client to the `lib` directory.

## Dependencies

### Frontend

- `@stripe/react-stripe-js`: React components for Stripe integration.
- `@stripe/stripe-js`: Stripe.js library for client-side integration.
- `date-fns`: Date utility library.
- `react`: React library.
- `react-dom`: React DOM bindings.
- `react-router-dom`: React Router library.

### Backend

- `@stripe/stripe-js`: Stripe.js library for server-side integration.
- `dotenv`: Environment variable management.
- `express`: Web framework for Node.js.
- `stripe`: Stripe API library.
- `swagger-ui-express`: Middleware for serving Swagger UI.
- `tsoa`: TypeScript OpenAPI tooling.

## Development

### Frontend

The frontend is built using React and TypeScript. It leverages the Stripe.js library for handling payment processing. The development server is powered by Vite for fast builds and hot module replacement.

### Backend

The backend is built using Node.js, Express, and TypeScript. It utilizes TSOA for OpenAPI specification and route generation, and Prisma ORM for database management. The development server uses nodemon for automatic restarts upon file changes.

### Environment Variables

Create a `.env` file in the `payment-project-backend` and `payment-project-frontend` directory to manage your environment variables. Example:

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
DATABASE_URL=your_database_url
```

### Database Setup

This project uses Prisma ORM with PostgreSQL. Ensure your database is set up and the `DATABASE_URL` environment variable is configured in your `.env` file.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project does not have an official license. If you wish to use, modify, or distribute the code, please contact the author for permission.