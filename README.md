# Interseguro Matrix Microservices

This project contains four microservices that work together to provide matrix operations with secure authentication:

1. **interseguro-auth**: Handles user authentication and JWT token generation
2. **interseguro-authz**: Validates JWT tokens and provides authorization
3. **interseguro-qr**: Performs QR factorization on matrices
4. **interseguro-operations**: Performs statistical analysis on Q and R matrices

All services are implemented using Hexagonal Architecture, TypeScript, Express.js, and include Swagger documentation.

## Architecture

The microservices use Hexagonal Architecture (Ports and Adapters) with clean separation of:

- **Domain Layer**: Core business logic, entities, and ports (interfaces)
- **Application Layer**: Use cases and application services
- **Infrastructure Layer**: External dependencies and implementation details
- **Interface Layer**: Controllers, routes, and API endpoints

## Running with Docker

All services can be run together using Docker Compose:

```bash
# Build and start all services
docker-compose up --build

# Stop services
docker-compose down
```

First, create a `.env` file in the root directory with:

```env
# This key should be changed in production
SECRET_KEY=your_jwt_secret_key
```

### Service URLs:

- **Authentication API**: http://localhost:3000
  - Swagger: http://localhost:3000/api/docs
- **QR Factorization API**: http://localhost:3001
  - Swagger: http://localhost:3001/api/docs
- **Matrix Operations API**: http://localhost:3002
  - Swagger: http://localhost:3002/api/docs
- **Authorization API**: http://localhost:3003
  - Swagger: http://localhost:3003/api/docs

## Services Overview

### interseguro-auth

API that handles user authentication and JWT token generation.

**Example:**

```bash
# Login to get a JWT token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "123456"
  }'
```

### interseguro-qr

API that performs QR factorization on matrices and calculates additional metrics. The service accepts rectangular matrices and returns both the decomposed matrices (Q and R) and statistical information.

**Example:**

```bash
# Use the token from the login response
curl -X POST http://localhost:3001/api/matrix/qr \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"matrix": [[1, 2], [3, 4], [5, 6]]}'
```

### interseguro-operations

API that performs statistical analysis on Q and R matrices, including maximum/minimum values, averages, sums, and diagonal matrix validation.

**Example:**

```bash
# Use the token from the login response
curl -X POST http://localhost:3002/api/matrix/operations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "q": [
      [0.5773, 0.5773],
      [0.5773, -0.5773],
      [0.5773, 0.5773]
    ],
    "r": [
      [1.7321, 1.7321],
      [0, 1.7321]
    ]  }'
```

### interseguro-authz

API that handles JWT token validation for all other services in the ecosystem.

**Example:**

```bash
# Token validation (internal use by other services)
curl -X POST http://localhost:3003/api/auth/token/validate \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Authentication Flow

1. User logs in via the Auth service (port 3000) and receives a JWT token
2. User includes the token in requests to QR or Operations services
3. These services validate the token with the Authz service (port 3003)
4. If the token is valid, the requested operation is performed

## Individual Project README files

For more detailed information about each service, please check their individual README files:

- [interseguro-auth/README.md](./interseguro-auth/README.md)
- [interseguro-authz/README.md](./interseguro-authz/README.md)
- [interseguro-qr/README.md](./interseguro-qr/README.md)
- [interseguro-operations/README.md](./interseguro-operations/README.md)

## License

ISC
