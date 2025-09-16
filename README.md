# Blog API

A **RESTful API** for a blogging platform built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**.  
This API supports **authentication**, **blog management**, **comments**, **likes**, **bookmarks**, **search/filtering**, **pagination**, and **sorting**.

## Features

- **User Authentication:** JWT-based authentication with 1-hour expiry
- **User Profile:** View, update, and delete profile
- **Blog Management:** Create, edit, publish, draft, delete blogs
- **Comments System:** Users can comment on blogs
- **Likes/Upvotes:** Track blog popularity
- **Bookmarks/Favorites:** Users can save blogs for later reading
- **Search & Filtering:** Keyword search by title, description, body, tags, filter by state and author
- **Pagination & Sorting:** Paginate results and sort by newest, oldest, most read, most liked
- **Input Validation:** Request validation using Zod
- **Authorization:** Only blog owners can edit/delete blogs
- **Read Count Tracking:** Track how many times a blog has been read
- **Reading Time Calculation:** Automatic calculation based on body length

## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Validation:** Zod
- **Testing:** Jest & Supertest

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sifenfisaha/Blog-API.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables in `.env`:

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/blog_api
JWT_SECRET=super-secret-change-me
JWT_EXPIRES_IN=1h
```

4. Start the development server:

```bash
npm run dev
```

## Available Scripts

| Command         | Description                                        |
| --------------- | -------------------------------------------------- |
| `npm run dev`   | Run the server in development mode with hot reload |
| `npm run build` | Compile TypeScript files to JavaScript             |
| `npm start`     | Run the compiled server                            |
| `npm test`      | Run tests using Jest & Supertest                   |

## API Endpoints

### Authentication

| Method | Endpoint       | Description                      | Access |
| ------ | -------------- | -------------------------------- | ------ |
| POST   | `/auth/signup` | Create a new user                | Public |
| POST   | `/auth/login`  | Authenticate user and return JWT | Public |

### User Management

| Method | Endpoint    | Description                | Access  |
| ------ | ----------- | -------------------------- | ------- |
| GET    | `/users/me` | Get logged-in user profile | Private |
| PUT    | `/users/me` | Update profile             | Private |
| DELETE | `/users/me` | Delete account             | Private |

### Blog Management

| Method | Endpoint            | Description                                                   | Access              |
| ------ | ------------------- | ------------------------------------------------------------- | ------------------- |
| GET    | `/blog`             | List all published blogs with pagination, filtering & sorting | Public              |
| GET    | `/blog/:slugOrId`   | Get a single blog by ID or slug                               | Public              |
| POST   | `/blog`             | Create a new blog (default: draft)                            | Private             |
| GET    | `/blog/me`          | List blogs of logged-in user                                  | Private             |
| PUT    | `/blog/:id`         | Edit a blog                                                   | Private, owner only |
| PATCH  | `/blog/:id/publish` | Publish a blog                                                | Private, owner only |
| DELETE | `/blog/:id`         | Delete a blog                                                 | Private, owner only |

### Comments

| Method | Endpoint              | Description              | Access                |
| ------ | --------------------- | ------------------------ | --------------------- |
| POST   | `/comment/:blogId`    | Add a comment to a blog  | Private               |
| GET    | `/comment/:blogId`    | List comments for a blog | Public                |
| DELETE | `/comment/:commentId` | Delete a comment         | Private (owner/admin) |

### Likes/Upvotes

| Method | Endpoint               | Description           | Access  |
| ------ | ---------------------- | --------------------- | ------- |
| POST   | `/like/:blogId/toggle` | Like or unlike a blog | Private |

---

### Bookmarks/Favorites

| Method | Endpoint                   | Description                | Access  |
| ------ | -------------------------- | -------------------------- | ------- |
| POST   | `/bookmark/:blogId/toggle` | Toggle bookmark for a blog | Private |
| GET    | `/bookmark/me`             | Get all bookmarked blogs   | Private |

## Pagination, Sorting & Search

- **Pagination**: `page` & `limit` query parameters
- **Sorting**: `sortBy=newest|oldest|popular|likes`
- **Search**: `query` parameter searches title, description, body, and tags
- **Filter**: `state=draft|published`, `author=userId`

Example:

```
GET /blog/search?query=react&state=published&sortBy=popular&page=1&limit=10
```

## Reading Time Calculation

- Formula: `reading_time = Math.ceil(totalWords / 200)`
- Automatically calculated on blog creation

## Input Validation

- Uses **Zod** for validating request bodies
- Ensures data correctness and prevents invalid submissions

## Authorization & Security

- Only blog owners can edit/delete their blogs
- JWT is required for protected routes
- Passwords are hashed using bcrypt

## Testing

- Unit & integration tests using **Jest** and **Supertest**
- Example:

```bash
npm test
```

## License

This project is licensed under the **MIT License**.

## Contributing

- Fork the repository
- Create a branch (`git checkout -b feature/your-feature`)
- Commit your changes (`git commit -m "feat: your feature"`)
- Push (`git push origin feature/your-feature`)
- Open a pull request

---

## About

A professional, production-ready backend API for a blogging platform built with Node.js, Express, TypeScript, and MongoDB.


