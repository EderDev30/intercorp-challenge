# Interseguro Matrix Microservices

This project contains two microservices:

1. **interseguro-qr**: Performs QR factorization on a matrix and performs statistical analysis
2. **interseguro-operations**: Performs statistical analysis operations on Q and R matrices

Both services are implemented using Hexagonal Architecture, TypeScript, Express.js, and Swagger documentation.

## Architecture

The microservices use Hexagonal Architecture (Ports and Adapters) with clean separation of:

- **Domain Layer**: Core business logic, entities, and ports (interfaces)
- **Application Layer**: Use cases and application services
- **Infrastructure Layer**: External dependencies and implementation details
- **Interface Layer**: Controllers, routes, and API endpoints

## Running with Docker

Both services can be run together using Docker Compose:

```bash
# Build and start both services
docker-compose up --build

# Stop services
docker-compose down
```

### Service URLs:

- **QR Factorization API**: http://localhost:3000
  - Swagger: http://localhost:3000/api/docs
- **Matrix Operations API**: http://localhost:3001
  - Swagger: http://localhost:3001/api/docs

## Services Overview

### interseguro-qr

API that performs QR factorization on matrices and calculates additional metrics. The service accepts rectangular matrices and returns both the decomposed matrices (Q and R) and statistical information.

**Example:**

```bash
curl -X POST http://localhost:3000/api/matrix/qr \
  -H "Content-Type: application/json" \
  -d '{"matrix": [[1, 2], [3, 4], [5, 6]]}'
```

### interseguro-operations

API that performs statistical analysis on Q and R matrices, including maximum/minimum values, averages, sums, and diagonal matrix validation.

**Example:**

```bash
curl -X POST http://localhost:3001/api/matrix/operations \
  -H "Content-Type: application/json" \
  -d '{
    "q": [
      [0.5773, 0.5773],
      [0.5773, -0.5773],
      [0.5773, 0.5773]
    ],
    "r": [
      [1.7321, 1.7321],
      [0, 1.7321]
    ]
  }'
```

## Individual Project README files

For more detailed information about each service, please check their individual README files:

- [interseguro-qr/README.md](./interseguro-qr/README.md)
- [interseguro-operations/README.md](./interseguro-operations/README.md)

## License

ISC
