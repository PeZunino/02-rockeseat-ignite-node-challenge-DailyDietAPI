# DailyDietAPI

![Completed](https://img.shields.io/badge/status-completed-brightgreen)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

## 📜 Description

A daily diet control REST API. It allows you to manage your meals, as well as providing a summary of your diet progress.

Developed to better understand concepts such as query builder, cookies and tests.

## ⚙️ Features

- **User registration and management:**
  - Register users with email and name.
  - Session management via cookies.

- **Meal tracking:**
  - Create, update, delete, and view meals.
  - Mark meals as part of the diet or not.
  - View a summary of meals, including how many are on or off diet, and the best diet streak.

- **Authentication:** A ```sessionId``` is automatically generated when a user is created and is required for meal-related operations.

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

### Prerequisites

- **Node.js (version 16 or above)**
- **npm (Node.js package manager)**
  
1. Clone the repository:

```bash
git clone https://github.com/PeZunino/02-rockeseat-ignite-node-challenge-DailyDietAPI.git
```
2. Navigate into the project directory:

```bash
cd 02-rockeseat-ignite-node-challenge-DailyDietAPI
```
3. Install the dependencies:

```bash
npm install
```
4. Set up the environment variables:
Create a ```.env``` file in the root of the project and add the following variables.
The database is set up using SQLite. The connection string should be: ```sqlite:./database.db```
```bash
DATABASE_URL=sqlite:./database.db
PORT=3333
```
5. Run the application:

```bash
npm run dev
```
6. To run the tests, use:

```bash
npm run test
```

## 🤝 Contributing

If you would like to contribute to this project, please open a Pull Request or submit an Issue with suggestions or problems.

## 📄 License

This project is open source and available under the MIT License.
