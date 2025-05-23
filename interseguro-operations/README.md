# Interseguro Matrix Operations API

A REST API built with Express.js and TypeScript that performs statistical operations on QR factorization matrices, secured through an external authentication service.

## Overview

This API performs statistical analysis on Q and R matrices received from the QR factorization service. It calculates:

1. Maximum value across both Q and R matrices
2. Minimum value across both Q and R matrices
3. Average value of all elements
4. Total sum of all elements
5. Diagonal matrix detection (checks if Q or R is diagonal)

All endpoints are secured through integration with the authorization service.

## Architecture

This project follows the Hexagonal Architecture pattern with these layers:

- **Domain Layer**: Core business logic and interfaces
- **Application Layer**: Use cases for matrix operations
- **Infrastructure Layer**: Services implementation and external integrations
- **Interface Layer**: Controllers, routes, and middleware

## Technology Stack

- TypeScript
- Node.js
- Express.js
- Axios (for HTTP client)
- Swagger (for API documentation)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd interseguro-operations

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

The server runs on port 3002 by default.

## Environment Variables

Create a `.env` file with:

```env
AUTH_API_URL=http://localhost:3003    # Auth service URL for token validation
PORT=3002
```

## API Documentation

Access the Swagger documentation at `/api/docs` when the server is running.

### API Endpoints

#### POST /api/matrix/operations

Performs statistical operations on Q and R matrices.

**Authentication Required:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "q": [
    [0.5773, 0.5773],
    [0.5773, -0.5773],
    [0.5773, 0.5773]
  ],
  "r": [
    [1.7321, 1.7321],
    [0, 1.7321]
  ]
}
```

**Response:**

```json
{
  "maxValue": 1.7321,
  "minValue": -0.5773,
  "averageValue": 0.866,
  "totalSum": 6.9284,
  "hasDiagonalMatrix": false
}
```

## Project Structure

```
src/
├── domain/                # Domain layer
│   ├── auth/             # Auth domain types
│   │   ├── entities.ts   # User and token types
│   │   └── interfaces.ts # Auth validator contracts
│   └── matrix/           # Matrix operations domain
│       ├── entities.ts   # Matrix and result types
│       └── interfaces.ts # Matrix operations contracts
│
├── application/          # Application layer
│   ├── auth/            # Auth validation use cases
│   │   └── authValidatorUseCase.ts  # Token validation orchestration
│   └── matrix/          # Matrix operations use cases
│       └── matrixOperationsUseCase.ts
│
├── infrastructure/       # Infrastructure layer
│   ├── auth/            # External auth service client
│   │   └── httpAuthValidator.ts   # Auth service HTTP client
│   └── matrix/          # Matrix operations implementation
│       └── matrixService.ts
│
├── interface/           # Interface layer
│   ├── auth/           # Auth middleware
│   │   └── authMiddleware.ts    # Token validation middleware
│   ├── matrix/         # Matrix operations endpoints
│   │   ├── matrixController.ts
│   │   └── matrixRoutes.ts
│   └── swagger/        # API documentation
│       └── swaggerConfig.ts
│
└── index.ts            # Application entry point
```

## Service Integration

This service integrates with the authorization service (`interseguro-authz`):

- All endpoints are protected by JWT token validation
- Token validation is performed by making HTTP calls to the auth service
- Invalid tokens result in 401 Unauthorized responses

## License

ISC
