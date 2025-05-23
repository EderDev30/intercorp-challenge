# Interseguro QR Factorization API

A REST API built with Express.js and TypeScript that performs QR factorization on rectangular matrices and integrates with the matrix operations service. Implemented using Hexagonal Architecture and secured through an external authentication service.

## What is QR Factorization?

QR factorization (also called QR decomposition) is a way to decompose a matrix A into a product A = QR where:

- Q is an orthogonal matrix (its columns are orthonormal vectors)
- R is an upper triangular matrix

This decomposition is useful in many numerical algorithms, such as solving linear systems of equations and the least squares method.

## Features

- QR matrix decomposition using math.js
- Matrix validation and error handling
- Secure endpoints via external auth service integration
- Integration with Matrix Operations service for additional statistics
- Swagger API documentation

## Architecture

This project follows the Hexagonal Architecture pattern with these layers:

- **Domain Layer**: Core business logic, entities, and interfaces
- **Application Layer**: Use cases for QR factorization
- **Infrastructure Layer**: External service integrations (auth and matrix operations)
- **Interface Layer**: Controllers, routes, and middleware

## Technology Stack

- TypeScript
- Node.js
- Express.js
- math.js (for matrix operations)
- Axios (for HTTP clients)
- Swagger (for API documentation)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd interseguro-qr

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

The server runs on port 3001 by default.

## Environment Variables

Create a `.env` file with:

```env
MATRIX_API_URL=http://localhost:3002  # Matrix Operations service URL
AUTH_API_URL=http://localhost:3003    # Auth service URL for token validation
PORT=3001
```

## API Documentation

Access the Swagger documentation at `/api/docs` when the server is running.

### API Endpoints

#### POST /api/matrix/qr

Performs QR factorization on a matrix and fetches additional statistics.

**Authentication Required:**

```
Authorization: Bearer <jwt_token>
```

**Request Body:**

```json
{
  "matrix": [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]
}
```

**Response:**

```json
{
  "q": [
    [0.123, -0.904, 0.408],
    [0.492, -0.301, -0.816],
    [0.862, 0.301, 0.408]
  ],
  "r": [
    [8.124, 9.601, 11.078],
    [0, 0.904, 1.809],
    [0, 0, 0]
  ],
  "operations": {
    "maxValue": 11.078,
    "minValue": -0.904,
    "averageValue": 2.649,
    "totalSum": 31.788,
    "hasDiagonalMatrix": false
  }
}
```

**Error Responses:**

- 400: Invalid matrix input
- 401: Missing or invalid authentication token
- 500: Internal server error

## Project Structure

```
src/
├── domain/                # Domain layer
│   ├── auth/             # Auth domain types
│   │   ├── entities.ts   # User and auth types
│   │   └── interfaces.ts # Auth validator contracts
│   ├── matrix/           # Matrix operations domain
│   │   ├── entities.ts   # Matrix type definitions
│   │   └── interfaces.ts # Matrix operations contracts
│   └── qr/              # QR factorization domain
│       ├── entities.ts   # QR result types
│       ├── errors.ts     # Custom error definitions
│       ├── interfaces.ts # QR service contracts
│       └── validations.ts # Matrix validation rules
│
├── application/          # Application layer
│   ├── auth/            # Auth validation use cases
│   │   └── authValidatorUseCase.ts  # Token validation orchestration
│   └── qr/              # QR factorization use cases
│       └── qrFactorizationUseCase.ts
│
├── infrastructure/       # Infrastructure layer
│   ├── auth/            # External auth service client
│   │   └── httpAuthValidator.ts   # Auth service HTTP client
│   ├── matrix/          # Matrix service client
│   │   └── httpMatrixOperationsApiClient.ts
│   └── qr/              # QR implementations
│       └── mathjsQRService.ts
│
├── interface/           # Interface layer
│   ├── auth/           # Auth middleware
│   │   └── authMiddleware.ts    # Token validation middleware
│   ├── qr/             # QR endpoints
│   │   ├── qrController.ts
│   │   └── qrRoutes.ts
│   └── swagger/        # API documentation
│       └── swaggerConfig.ts
│
└── index.ts            # Application entry point
```

## Service Integration

This service integrates with two other microservices:

1. **Auth Service** (`interseguro-authz`):

   - Validates JWT tokens for protected endpoints
   - Called before processing any matrix operations

2. **Matrix Operations Service** (`interseguro-operations`):
   - Performs statistical analysis on QR decomposition results
   - Called after successful QR factorization

## License

ISC
