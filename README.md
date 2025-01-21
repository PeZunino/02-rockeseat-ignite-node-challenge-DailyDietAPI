# DailyDietAPI

## 📜 Description

A daily diet control API developed with Node.js, Fastify, and SQLite. This API allows users to create, update, delete, and view their meals, as well as providing a summary of their diet progress.

## 💻 Technologies Used
- **Fastify**: A fast and lightweight web framework for Node.js.
- **Knex**: SQL query builder.
- **SQLite3**: SQLite database.
- **Zod**: Schema validation library.
- **Supertest**: HTTP testing framework.
- **Vitest**: Testing framework.

## ⚙️ Features

- **User registration and management**:
  - Register users with email and name.
  - Session management via cookies.

- **Meal tracking**:
  - Create, update, delete, and view meals.
  - Mark meals as part of the diet or not.
  - View a summary of meals, including how many are on or off diet, and the best diet streak.

- **Authentication**:
  - Authentication is done using the `sessionId`, which is stored in a cookie.

## 🌐 Endpoints

### Users
- **POST /users**: Create a new user. A `sessionId` is assigned to the user when created.
- **GET /users**: List all registered users.

### Meals
- **POST /meals**: Create a new meal.
- **GET /meals**: List all meals for the authenticated user.
- **GET /meals/:id**: Retrieve details of a specific meal.
- **PUT /meals/:id**: Update an existing meal.
- **DELETE /meals/:id**: Delete a specific meal.
- **GET /meals/summary**: Get a summary of meals for the user, including how many are on diet, off diet, and the best streak.

## 🛠️ Installation

- **Node.js (version 16 or above)**
- **npm (Node.js package manager)**
- **Environment variables for repository configuration:**
  
To run the application, follow the steps below:

1. Clone the repository:

```bash
git clone https://github.com/PeZunino/DailyDietAPI.git
cd DailyDietAPI
```

2. Install the dependencies:

```bash
npm install
```

3. Set up the environment variables:
Create a .env file in the root of the project and add the following variables

```bash
DATABASE_URL=sqlite:./database.db
PORT=3333
```

4. Run the application:

```bash
npm run dev
```

5.To run the tests, use:

```bash
npm run test
```

## 🤝 Contributing

If you would like to contribute to this project, please open a Pull Request or submit an Issue with suggestions or problems.

## 📄 License

This project is open source and available under the MIT License.
