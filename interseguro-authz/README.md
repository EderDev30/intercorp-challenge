# Interseguro Authorization API

A REST API built with Express.js and TypeScript that handles JWT token validation for the Interseguro microservices ecosystem. Implemented using Hexagonal Architecture.

## Overview

The authorization service is responsible for:

- JWT token validation
- Token verification for protected endpoints
- Centralized authorization management for the microservices ecosystem

This service works in conjunction with the Authentication service to provide a complete auth solution:

- Authentication service (`interseguro-auth`) handles user login and token generation
- Authorization service (`interseguro-authz`) handles token validation and authorization

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
- Swagger (for API documentation)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd interseguro-authz

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

The server will start on port 3003 by default. You can change this by setting the `PORT` environment variable.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
SECRET_KEY=your_jwt_secret_key
PORT=3003
```

Note: The SECRET_KEY must match the one used in the authentication service.

## API Documentation

The API is documented using Swagger. You can access the documentation by visiting `/api/docs` when the server is running.

### API Endpoints

#### POST /api/auth/token/validate

Validates a JWT token and returns the user id if valid.

**Request Header:**

```
Authorization: Bearer <token>
```

**Response (Success):**

```json
{
  "userId": "1"
}
```

**Response (Invalid Token):**

```json
{
  "error": "Invalid token"
}
```

## Project Structure

```
src/
├── domain/            # Domain layer
│   └── auth/
│       ├── entities.ts    # User and token type definitions
│       └── interfaces.ts  # Auth service interfaces
│
├── application/       # Application layer
│   └── auth/
│       └── validateTokenUseCase.ts  # Token validation logic
│
├── infrastructure/    # Infrastructure layer
│   └── auth/
│       └── jwtService.ts    # JWT token validation service
│
├── interface/         # Interface layer
│   ├── auth/
│   │   ├── authController.ts    # Token validation endpoint controller
│   │   └── authRoutes.ts        # API route definitions
│   └── swagger/
│       └── swaggerConfig.ts     # API documentation configuration
│
└── index.ts           # Application entry point
```

## License

ISC
