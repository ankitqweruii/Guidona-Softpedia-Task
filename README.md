# Branch Directory API

A RESTful API built with Node.js and Express.js that provides branch directory information with support for pagination, search, and sorting.

## Features

- RESTful API endpoints
- SQLite database for data storage
- Pagination support
- Search by various fields
- Sorting by any column
- Comprehensive API documentation with Swagger

## Requirements

- Node.js (v14.x or higher)
- npm (v6.x or higher)

## Installation

1. Clone the repository:

```bash
git clone "https://github.com/ankitqweruii/Guidona-Softpedia-Task.git"
cd guidona-softpedia
```

2. Install dependencies:

```bash
npm install
```

3. Initialize the database:

```bash
npm run init-db
```

## Running the Application

### Development mode:

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

The server will start on port 3000 by default (or the port specified in the `PORT` environment variable).

## API Documentation

Swagger documentation is available at: http://localhost:3000/api-docs

## API Endpoints

### Get Branches

```
GET /api/branches
```

#### Query Parameters

| Parameter   | Type   | Required | Description                                               |
|-------------|--------|----------|-----------------------------------------------------------|
| searchBy    | string | No       | Field to search by (e.g., branchCode, branchName, branchCity) |
| searchValue | string | No       | Text to search in the selected field                      |
| sortBy      | string | No       | Column name to sort by (e.g., latitude, branchState)      |
| sortOrder   | string | No       | asc or desc (default: asc)                               |
| page        | number | No       | Page number (default: 1)                                 |
| limit       | number | No       | Rows per page (default: 10)                              |

#### Example Requests

1. Get all branches (first page with 10 items):

```
GET /api/branches
```

2. Search branches by city:

```
GET /api/branches?searchBy=branchCity&searchValue=New
```

3. Sort branches by state in descending order:

```
GET /api/branches?sortBy=branchState&sortOrder=desc
```

4. Get the second page with 5 items per page:

```
GET /api/branches?page=2&limit=5
```

5. Combined search and sorting:

```
GET /api/branches?searchBy=branchName&searchValue=Downtown&sortBy=branchCity&page=1&limit=10
```

## Project Structure

```
branch-api/
├── data/
│   └── branches.db
├── routes/
│   └── branchRoutes.js
├── controllers/
│   └── branchController.js
├── utils/
│   ├── db.js
│   └── paginator.js
├── app.js
├── initDb.js
├── package.json
└── README.md
```

## License

MIT