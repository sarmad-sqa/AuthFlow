# AuthFlow

**Full-Stack Signup Application with Login UI**

AuthFlow is a web application built using React, Node.js, Express.js, and Turso Database. The project currently implements a complete Signup flow with backend and database integration, along with a Login frontend UI.

## 🚀 Features

### Signup
- User registration using React.
- Express.js Signup API integration.
- Turso database connectivity using LibSQL.
- Password hashing using bcrypt.
- Required field validation.
- Terms & Conditions validation.
- Duplicate email handling.
- Success and error notifications.
- Form reset after successful registration.
- Backend error handling.

### Login
- Login page UI built with React.
- Signup and Login page navigation.
- Password visibility toggle.
- Login backend API integration: **Pending**.
- Login authentication and credential verification: **Pending**.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Node.js | Backend runtime |
| Express.js | REST API |
| Turso | Database |
| LibSQL | Database connectivity |
| bcrypt | Password hashing |
| Playwright | End-to-end testing |
| React Testing Library | Component testing |
| GitHub Actions | CI/CD automation |
| Git & GitHub | Version control |

## 📁 Project Structure

```text
authflow/
├── .github/
│   └── workflows/
│       ├── main.yml
│       └── playwright.yml
├── public/
├── scripts/
│   └── start-e2e.js
├── server/
│   ├── db.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
├── src/
│   ├── App.js
│   ├── App.test.js
│   └── Login.js
├── tests/
│   ├── SignUp.spec.js
│   └── example.spec.js
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.js
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sarmad-sqa/authflow.git
cd authflow
```

### 2. Install Frontend Dependencies

```bash
npm ci
```

### 3. Install Backend Dependencies

```bash
npm ci --prefix server
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server` directory.

```env
TURSO_DATABASE_URL=your_turso_database_url
TURSO_AUTH_TOKEN=your_turso_auth_token
```

Never commit environment files or expose database credentials publicly.

## ▶️ Run Locally

### Start Backend

```bash
cd server
npm start
```

Backend: `http://localhost:3000`

### Start Frontend

Open another terminal in the project root:

```powershell
$env:PORT=3001
npm start
```

Frontend: `http://localhost:3001`

## 🧪 Testing

### React Tests

```bash
npm test -- --watchAll=false
```

### Playwright E2E Tests

```bash
npm run test:e2e
```

Configured browsers:
- Chromium
- Firefox
- WebKit

### Production Build

```bash
npm run build
```

## 🔄 CI/CD Pipeline

GitHub Actions automates the project's testing and build processes.

### React CI Pipeline
- Installs dependencies.
- Runs React component tests.
- Generates an optimized production build.
- Deploys the frontend to GitHub Pages.

### Playwright Tests
- Installs frontend and backend dependencies.
- Installs Playwright browsers.
- Uses GitHub Secrets for Turso credentials.
- Executes automated cross-browser tests.
- Uploads HTML test reports as workflow artifacts.

## 🌐 Live Demo

[View AuthFlow](https://sarmad-sqa.github.io/authflow/)

**Note:** The live GitHub Pages deployment hosts the frontend. Signup API functionality requires the Express backend to be running or deployed separately. Login currently provides the frontend UI only.

## 👨‍💻 Author

**Sarmad Sarwar**

Executive SQA Engineer | Software Quality Assurance | Test Automation

- GitHub: [@sarmad-sqa](https://github.com/sarmad-sqa)

---

⭐ Feel free to explore the project and its implementation.
