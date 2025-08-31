# Blog API

A RESTful API for a blogging platform built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**.
The API supports authentication, blog management, pagination, search, filtering, and sorting.

## Features

- User authentication with JWT (1-hour expiry)
- User profile management
- Blog creation, editing, publishing, and deletion
- Draft and published blog states
- Public access to published blogs
- Pagination, search, filter, and sorting on blog lists
- Read count tracking and reading time calculation
- Input validation with Zod
- Authorization checks for blog ownership

## Tech Stack

- **Node.js** / **Express.js**
- **TypeScript**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Zod** for request validation
- **Jest / Supertest** for testing

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/blog-api.git
   cd blog-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:

   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/blog_api
   JWT_SECRET=super-secret-change-me
   JWT_EXPIRES_IN=1h
   ```

4. Run the application:

   ```bash
   npm run dev
   ```

## API Endpoints

### User Endpoints

| Method | Endpoint       | Description                   | Access        |
| ------ | -------------- | ----------------------------- | ------------- |
| POST   | `/auth/signup` | Create a new user account     | Public        |
| POST   | `/auth/login`  | Authenticate user, return JWT | Public        |
| GET    | `/users/me`    | Get logged-in user profile    | Private (JWT) |
| PUT    | `/users/me`    | Update user profile           | Private (JWT) |
| DELETE | `/users/me`    | Delete user account           | Private (JWT) |

### Blog Endpoints (Public)

| Method | Endpoint     | Description                                                                      | Access |
| ------ | ------------ | -------------------------------------------------------------------------------- | ------ |
| GET    | `/blogs`     | List all **published** blogs with pagination, search, filter, and sort           | Public |
| GET    | `/blogs/:id` | Get a single **published** blog by ID, include author info, increment read count | Public |

### Blog Endpoints (Authenticated)

| Method | Endpoint             | Description                                           | Access         |
| ------ | -------------------- | ----------------------------------------------------- | -------------- |
| POST   | `/blogs`             | Create a new blog (default state: draft)              | Private        |
| GET    | `/blogs/me`          | List blogs of logged-in user with pagination & filter | Private        |
| PUT    | `/blogs/:id`         | Edit a blog (draft or published)                      | Private, owner |
| PATCH  | `/blogs/:id/publish` | Update blog state to **published**                    | Private, owner |
| DELETE | `/blogs/:id`         | Delete a blog                                         | Private, owner |

## Blog Fields

Each blog contains the following attributes:

- `title` (string)
- `description` (string)
- `body` (string)
- `tags` (array of strings)
- `author` (reference to user)
- `state` (draft | published)
- `read_count` (number, default 0)
- `reading_time` (calculated in minutes)
- `timestamp` (date created)

## Reading Time Algorithm

Reading time is calculated by dividing the total word count of the blog body by 200 words per minute and rounding up to the nearest whole number.

## License

This project is licensed under the MIT License.
