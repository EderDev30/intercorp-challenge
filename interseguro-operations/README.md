# Interseguro Matrix Operations API

A REST API built with Express.js and TypeScript that consumes QR factorization results and performs additional matrix operations, implemented using Hexagonal Architecture.

## Overview

This API consumes the results of QR factorization from the [Interseguro QR Factorization API](../interseguro-qr) and performs additional matrix operations:

1. Calculates the maximum value across both Q and R matrices
2. Calculates the minimum value across both Q and R matrices
3. Calculates the average value of all elements in both matrices
4. Calculates the total sum of all elements in both matrices
5. Determines if either Q or R is a diagonal matrix (all non-diagonal elements are zero)

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

The server will start on port 3001 by default. You can change this by setting the `PORT` environment variable.

## API Documentation

The API is documented using Swagger. You can access the documentation by visiting `/api/docs` when the server is running.

### API Endpoints

#### POST /api/matrix/operations

Processes a QR factorization result provided in the request body.

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
  "minValue": 0,
  "averageValue": 0.866,
  "totalSum": 6.9284,
  "hasDiagonalMatrix": false
}
```

## Environment Variables

- `PORT`: The port on which the server will run (default: 3001)

## Project Structure

```
src/
├── domain/            # Domain layer
│   └── matrix/
│       ├── entities.ts    # Domain entities
│       └── interfaces.ts  # Domain interfaces (ports)
│
├── application/       # Application layer
│   └── matrix/
│       └── matrixOperationsUseCase.ts  # Use case
│
├── infrastructure/    # Infrastructure layer
│   └── matrix/
│       └── matrixService.ts       # Matrix operations service
│
├── interface/         # Interface layer
│   ├── matrix/
│   │   ├── matrixController.ts    # API controller
│   │   └── matrixRoutes.ts        # API routes
│   └── swagger/
│       └── swaggerConfig.ts       # Swagger configuration
│
└── index.ts           # Application entry point
```

## License

ISC
