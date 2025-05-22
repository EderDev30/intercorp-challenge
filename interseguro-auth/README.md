# Interseguro Authentication API

A REST API built with Express.js and TypeScript that handles user authentication and JSON Web Token (JWT) generation for the Interseguro microservices ecosystem. Implemented using Hexagonal Architecture.

## Overview

The authentication service is responsible for:

- User authentication (login)
- JWT token generation for authenticated users
- Secure password hashing with bcrypt
- User data management (currently using in-memory storage)

## Architecture

This project follows the Hexagonal Architecture pattern (also known as Ports and Adapters), dividing the code into these layers:

- **Domain Layer**: Contains the core business logic, entities, and port interfaces
- **Application Layer**: Contains application services and use cases
- **Infrastructure Layer**: Contains implementations of the interfaces defined in the domain
- **Interface Layer**: Contains controllers, routes, and the API interface

## Technology Stack

- TypeScript
- Node.js
- Express.js
- JWT (JSON Web Tokens)
- bcrypt (for password hashing)
- Swagger (for API documentation)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd interseguro-auth

# Install dependencies
npm install
```

## Development

```bash
# Run in development mode (with auto-reload)
npm run dev

# Build the project
npm run build

# Run in production mode
npm start
```

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
SECRET_KEY=your_jwt_secret_key
PORT=3000
```

## API Documentation

The API is documented using Swagger. You can access the documentation by visiting `/api/docs` when the server is running.

### API Endpoints

#### POST /api/auth/login

Authenticates a user and returns a JWT token.

**Request Body:**

```json
{
  "email": "test@test.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Project Structure

```
src/
├── domain/            # Domain layer
│   └── auth/
│       ├── entities.ts    # User and token type definitions
│       └── interfaces.ts  # Repository and auth service interfaces
│
├── application/       # Application layer
│   └── auth/
│       └── loginUseCase.ts  # User login business logic
│
├── infrastructure/    # Infrastructure layer
│   └── auth/
│       ├── inMemoryUserRepository.ts  # In-memory user storage implementation
│       └── jwtService.ts              # JWT token generation service
│
├── interface/         # Interface layer
│   ├── auth/
│   │   ├── authController.ts    # Login endpoint controller
│   │   └── authRoutes.ts        # API route definitions
│   └── swagger/
│       └── swaggerConfig.ts     # API documentation configuration
│
└── index.ts           # Application entry point
```

## Test Users

For development and testing purposes, the service comes with a pre-configured test user:

```
Email: test@test.com
Password: 123456
```

## License

ISC
