# Interseguro QR Factorization API

A REST API built with Express.js and TypeScript that performs QR factorization on rectangular matrices and gets additional operations, implemented using Hexagonal Architecture.

## What is QR Factorization?

QR factorization (also called QR decomposition) is a way to decompose a matrix A into a product A = QR where:

- Q is an orthogonal matrix (its columns are orthonormal vectors)
- R is an upper triangular matrix

This decomposition is useful in many numerical algorithms, such as solving linear systems of equations and the least squares method.

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
- math.js (for matrix operations)
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

The server will start on port 3000 by default. You can change this by setting the `PORT` environment variable.

## API Documentation

The API is documented using Swagger. You can access the documentation by visiting `/api/docs` when the server is running.

### API Endpoints

#### POST /api/matrix/qr

Performs QR factorization on a matrix provided in the request body.

**Request Body:**

```json
{
  "matrix": [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
  ]
}
```

**Response:**

```json
{
  "q": [
    [...],
    [...],
    [...],
    [...]
  ],
  "r": [
    [...],
    [...],
    [...]
  ]
}
```

## Example

```bash
curl -X POST http://localhost:3000/api/matrix/qr \
  -H "Content-Type: application/json" \
  -d '{"matrix": [[1, 2], [3, 4], [5, 6]]}'
```

## Project Structure

```
src/
├── domain/            # Domain layer
│   ├── matrix/
│   │   ├── entities.ts    # Domain entities and types
│   │   └── interfaces.ts  # Domain interfaces (ports)
│   └── qr/
│       ├── entities.ts    # Domain entities and types
│       ├── errors.ts      # Custom domain errors
│       ├── interfaces.ts  # Domain interfaces (ports)
│       └── validations.ts # Domain validation rules
│
├── application/       # Application layer
│   └── qr/
│       └── qrFactorizationUseCase.ts  # QR factorization use case
│
├── infrastructure/    # Infrastructure layer
│   ├── matrix/
│   │   └── httpMatrixOperationsApiClient.ts  # HTTP client for matrix operations
│   └── qr/
│       └── mathjsQRService.ts     # QR factorization use case implementation using mathjs
│
├── interface/         # Interface layer
│   ├── qr/
│   │   ├── qrController.ts    # API controller
│   │   └── qrRoutes.ts        # API routes
│   └── swagger/
│       └── swaggerConfig.ts   # Swagger configuration
│
└── index.ts           # Application entry point
```

## License

ISC
